from sqlalchemy.orm import Session
from utils.db import SessionLocal
from models.user import User

def get_leaderboard():
    db: Session = SessionLocal()
    users = db.query(User).order_by(User.points.desc()).limit(10).all()
    leaderboard = [
        {"username": user.username, "points": user.points} for user in users
    ]
    db.close()
    return leaderboard
