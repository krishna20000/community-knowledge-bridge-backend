from sqlalchemy.orm import Session
from utils.db import SessionLocal
from models.challenge import Challenge

def handle_challenge(data):
    db: Session = SessionLocal()
    description = data["description"]
    creator_id = data["creator_id"]
    challenge = Challenge(description=description, creator_id=creator_id)
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    db.close()
    return {"msg": "Challenge submitted!", "challenge_id": challenge.id}
