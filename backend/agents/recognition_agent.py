from sqlalchemy.orm import Session
from utils.db import SessionLocal
from models.user import User

def award_points(user_id, points):
    db: Session = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    total_points = 0
    if user:
        user.points += points
        db.commit()
        total_points = user.points  # fetch value before closing
    db.close()
    return {
        "msg": "Points awarded.", 
        "total_points": total_points,
        "toast": f"🎆 Amazing! You received {points} bonus points!"
    }
