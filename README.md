# Community Knowledge Bridge

A platform that connects community members to share knowledge, post challenges, and earn recognition through a gamified point system.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Challenge Management**: Post, view, edit, and delete challenges
- **Skills Matching**: AI-powered matching of challenges with skilled users
- **Gamification**: Point-based reward system with leaderboards
- **Recognition System**: Award points for various activities
- **Real-time Notifications**: Toast notifications for achievements

## 🏗️ Architecture

### Backend (Flask)
- **Framework**: Flask with SQLAlchemy ORM
- **Database**: SQLite (development)
- **Authentication**: Password hashing with Werkzeug
- **API**: RESTful endpoints with JSON responses

### Frontend (React)
- **Framework**: React 19 with Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **State Management**: Context API
- **HTTP Client**: Axios

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd community-knowledge-bridge
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🎯 Point System

| Action | Points Awarded |
|--------|----------------|
| User Registration | 40 points |
| Login | 20 points |
| Post Challenge | 100 points |
| Manual Awards | Variable |

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login

### Challenges
- `POST /api/challenges` - Submit new challenge
- `GET /api/challenges/mine?user_id={id}` - Get user's challenges
- `PUT /api/challenges/{id}` - Update challenge
- `DELETE /api/challenges/{id}` - Delete challenge

### Matching & Recognition
- `POST /api/match` - Find skill matches for challenges
- `POST /api/award` - Award points to users
- `GET /api/leaderboard` - Get user rankings

## 🗂️ Project Structure

```
community-knowledge-bridge/
├── backend/
│   ├── agents/                 # Business logic agents
│   │   ├── challenge_intake_agent.py
│   │   ├── skills_matching_agent.py
│   │   ├── recognition_agent.py
│   │   └── leaderboard_agent.py
│   ├── models/                 # Database models
│   │   ├── user.py
│   │   └── challenge.py
│   ├── utils/                  # Utilities
│   │   └── db.py
│   ├── app.py                  # Main Flask application
│   ├── config.py               # Configuration
│   └── requirements.txt        # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/             # Page components
    │   ├── context/           # React context
    │   ├── hooks/             # Custom hooks
    │   └── api.js             # API client
    ├── package.json           # Node dependencies
    └── vite.config.js         # Vite configuration
```

## 🔧 Configuration

### Backend Configuration
- Database: SQLite (default) - `community.db`
- Debug mode: Enabled in development
- CORS: Enabled for frontend communication

### Frontend Configuration
- Development server: Vite
- Proxy: Configured to backend on port 5000
- Material-UI theme: Custom theme configuration

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest tests/

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend production
cd backend
gunicorn app:app
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production database
2. Use gunicorn or similar WSGI server
3. Configure reverse proxy (nginx recommended)

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve static files from `dist/` directory
3. Configure routing for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**: Check if virtual environment is activated and dependencies are installed
2. **Frontend build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. **Database errors**: Delete `community.db` to reset database (development only)
4. **CORS issues**: Ensure backend CORS is properly configured

### Support

For issues and questions, please create an issue in the GitHub repository.

## 🔮 Future Enhancements

- [ ] Real-time chat system
- [ ] File upload for challenges
- [ ] Advanced skill matching algorithms
- [ ] Mobile application
- [ ] Integration with external APIs
- [ ] Advanced analytics dashboard