from sqlalchemy import Column, Integer, String, ForeignKey
from utils.db import Base

class Challenge(Base):
    __tablename__ = "challenges"
    id = Column(Integer, primary_key=True)
    description = Column(String)
    creator_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="open")
    matched_user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
