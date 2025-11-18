# Community Knowledge Bridge

Empowering local communities through AI-powered skill matching and challenge-solving.

## Run Locally
pip install -r requirements.txt
python app.py

### Example API Usage

- Register user:
  POST /api/register
{ "username": "alice", "skills": "python,water" }


- Submit challenge:
POST /api/challenges
{ "description": "fix water system", "creator_id": 1 }


- Match challenge:
POST /api/match
{ "challenge_id": 1 }


- Award points:
POST /api/award
{ "user_id": 2, "points": 10 }


- Get leaderboard:
GET /api/leaderboard

## Directory Structure
- models/: Database models
- agents/: Agents logic (matching, recognition, leaderboard)
- utils/: Utilities (database setup)
