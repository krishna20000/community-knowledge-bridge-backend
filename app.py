from flask import Flask, request, jsonify
from utils.db import SessionLocal, engine, Base
from agents import (
    challenge_intake_agent,
    skills_matching_agent,
    recognition_agent,
    leaderboard_agent
)
from models.user import User
import models.challenge

app = Flask(__name__)

# Create DB tables
Base.metadata.create_all(bind=engine)

@app.route("/")
def home():
    return "Welcome to Community Knowledge Bridge!"

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    db = SessionLocal()
    user = User(username=data['username'], skills=data.get('skills', ''))
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()
    return jsonify({"msg": "User registered!", "user_id": user.id})

@app.route("/api/challenges", methods=["POST"])
def submit_challenge():
    data = request.json
    result = challenge_intake_agent.handle_challenge(data)
    return jsonify(result)

@app.route("/api/match", methods=["POST"])
def match_skill():
    challenge_id = request.json['challenge_id']
    result = skills_matching_agent.find_match(challenge_id)
    return jsonify(result)

@app.route("/api/award", methods=["POST"])
def award():
    user_id = request.json["user_id"]
    points = int(request.json["points"])
    result = recognition_agent.award_points(user_id, points)
    return jsonify(result)

@app.route("/api/leaderboard")
def leaderboard():
    result = leaderboard_agent.get_leaderboard()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

