from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
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
CORS(app)

# Create DB tables
Base.metadata.create_all(bind=engine)

@app.route("/")
def home():
    return "Welcome to Community Knowledge Bridge!"

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    required = ["name", "username", "email", "phone", "skills", "password"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    db = SessionLocal()
    user = User(
        name=data["name"],
        username=data["username"],
        email=data["email"],
        phone=data["phone"],
        skills=data.get("skills", ""),
        password=generate_password_hash(data["password"]),
        points=40,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()
    return jsonify({"msg": "User registered!", "user_id": user.id, "awarded_points": user.points})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400
    db = SessionLocal()
    user = db.query(User).filter(User.username == username).first()
    if not user or not check_password_hash(user.password, password):
        db.close()
        return jsonify({"error": "Invalid username or password."}), 401
    user_payload = {
        "id": user.id,
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "skills": user.skills,
        "points": user.points,
    }
    db.close()
    return jsonify({"msg": "Login successful.", "awarded_points": 20, "user": user_payload})

@app.route("/api/challenges", methods=["POST"])
def submit_challenge():
    data = request.json
    result = challenge_intake_agent.handle_challenge(data)
    return jsonify(result)

@app.route("/api/challenges/mine", methods=["GET"])
def my_challenges():
    user_id = request.args.get("user_id", type=int)
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    db = SessionLocal()
    challenges = (
        db.query(models.challenge.Challenge)
        .filter(models.challenge.Challenge.creator_id == user_id)
        .all()
    )
    payload = [
        {
            "id": challenge.id,
            "description": challenge.description,
            "status": challenge.status,
            "matched_user_id": challenge.matched_user_id,
        }
        for challenge in challenges
    ]
    db.close()
    return jsonify(payload)

@app.route("/api/challenges/<int:challenge_id>", methods=["PUT"])
def update_challenge(challenge_id):
    data = request.json or {}
    description = data.get("description")
    if description is None:
        return jsonify({"error": "description is required"}), 400
    db = SessionLocal()
    challenge = db.query(models.challenge.Challenge).filter(models.challenge.Challenge.id == challenge_id).first()
    if not challenge:
        db.close()
        return jsonify({"error": "Challenge not found"}), 404
    challenge.description = description
    db.commit()
    db.refresh(challenge)
    db.close()
    return jsonify({"msg": "Challenge updated", "challenge": {
        "id": challenge.id,
        "description": challenge.description,
        "status": challenge.status,
        "matched_user_id": challenge.matched_user_id,
    }})

@app.route("/api/challenges/<int:challenge_id>", methods=["DELETE"])
def delete_challenge(challenge_id):
    db = SessionLocal()
    challenge = db.query(models.challenge.Challenge).filter(models.challenge.Challenge.id == challenge_id).first()
    if not challenge:
        db.close()
        return jsonify({"error": "Challenge not found"}), 404
    db.delete(challenge)
    db.commit()
    db.close()
    return jsonify({"msg": "Challenge deleted"})

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

