from sqlalchemy import Column, Integer, String
from utils.db import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    phone = Column(String)
    skills = Column(String)  # Comma-separated!
    password = Column(String)
    points = Column(Integer, default=0)
