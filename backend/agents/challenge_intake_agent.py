from sqlalchemy.orm import Session
from utils.db import SessionLocal
from models.challenge import Challenge
from models.user import User

def handle_challenge(data):
    db: Session = SessionLocal()
    description = data["description"]
    creator_id = data["creator_id"]
    challenge = Challenge(description=description, creator_id=creator_id)
    db.add(challenge)
    
    # Award 100 points for posting challenge
    user = db.query(User).filter(User.id == creator_id).first()
    if user:
        user.points += 100
    
    db.commit()
    db.refresh(challenge)
    db.close()
    return {
        "msg": "Challenge successfully posted!", 
        "challenge_id": challenge.id,
        "toast": "🎁 Congratulations! You earned 100 bonus points for posting a challenge!"
    }
