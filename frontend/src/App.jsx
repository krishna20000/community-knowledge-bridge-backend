import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Challenges from './pages/Challenges';
import Match from './pages/Match';
import Recognition from './pages/Recognition';
import LeaderboardPage from './pages/LeaderboardPage';
import Login from './pages/Login';
import MyChallenges from './pages/MyChallenges';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="challenges"
          element={(
            <PrivateRoute>
              <Challenges />
            </PrivateRoute>
          )}
        />
        <Route
          path="match"
          element={(
            <PrivateRoute>
              <Match />
            </PrivateRoute>
          )}
        />
        <Route
          path="recognition"
          element={(
            <PrivateRoute>
              <Recognition />
            </PrivateRoute>
          )}
        />
        <Route
          path="leaderboard"
          element={(
            <PrivateRoute>
              <LeaderboardPage />
            </PrivateRoute>
          )}
        />
        <Route
          path="my-challenges"
          element={(
            <PrivateRoute>
              <MyChallenges />
            </PrivateRoute>
          )}
        />
      </Route>
    </Routes>
  );
}

export default App;
