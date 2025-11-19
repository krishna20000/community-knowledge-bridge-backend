from sqlalchemy.orm import Session
from utils.db import SessionLocal
from models.challenge import Challenge
from models.user import User

from transformers import AutoTokenizer, AutoModel
import torch

# Load model and tokenizer ONCE at module level
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def get_embedding(text):
    # Convert text to embedding
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
        # Use mean pooling on last hidden state
        embeddings = outputs.last_hidden_state.mean(dim=1)
    return embeddings

def cosine_similarity(a, b):
    a = a / a.norm(dim=1, keepdim=True)
    b = b / b.norm(dim=1, keepdim=True)
    return torch.mm(a, b.t()).item()

def find_match(challenge_id):
    db: Session = SessionLocal()
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    if not challenge:
        db.close()
        return {"error": "Challenge not found!"}

    challenge_emb = get_embedding(challenge.description)
    users = db.query(User).all()
    best_match = None
    best_score = -1
    for user in users:
        skills_text = user.skills or ""
        user_emb = get_embedding(skills_text)
        score = cosine_similarity(challenge_emb, user_emb)
        if score > best_score:
            best_match = user
            best_score = score
    if best_match:
        challenge.matched_user_id = best_match.id
        db.commit()
        match_percent = max(0, min(100, round(best_score * 100)))
        matched_profile = {
            "id": best_match.id,
            "name": best_match.username,
            "phone": best_match.phone,
            "skills": best_match.skills,
            "points": best_match.points,
        }
        msg = f"Challenge matched to {best_match.username}"
        payload = {
            "msg": msg,
            "matched_user": best_match.username,
            "match_percent": match_percent,
            "matched_profile": matched_profile,
        }
    else:
        payload = {"msg": "No suitable match found.", "matched_user": None, "match_percent": 0, "matched_profile": None}
    db.close()
    return payload
