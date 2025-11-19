import React, { useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { loginUser } from '../api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await loginUser({ username: username.trim(), password });
      login(data.user);
      const awarded = data.awarded_points ?? 20;
      setToast({ open: true, message: `Logged in successfully! +${awarded} points awarded.`, severity: 'success' });
      setTimeout(() => navigate('/challenges'), 600);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Stack spacing={3} textAlign="center" alignItems="center">
      <Typography variant="h4" fontWeight={800}>
        Welcome back!
      </Typography>
      <Typography color="text.secondary" maxWidth={460}>
        Sign in to continue coordinating community challenges with your saved profile.
      </Typography>
      <Stack spacing={2} width="100%" maxWidth={420}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Alert severity="warning">{error}</Alert>}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          sx={{ fontWeight: 700 }}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Continue'}
        </Button>
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </MuiAlert>
        </Snackbar>
      </Stack>
    </Stack>
  );
}

