from sqlalchemy import Column, Integer, String
from utils.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    skills = Column(String)  # Comma-separated!
    points = Column(Integer, default=0)
