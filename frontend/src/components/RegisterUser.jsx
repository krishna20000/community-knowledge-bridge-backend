import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const createInitialForm = () => ({
    name: '',
    username: '',
    email: '',
    phone: '',
    skills: '',
    password: '',
});

export default function RegisterUser() {
  const [form, setForm] = useState(createInitialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await registerUser(form);
      setForm(createInitialForm());
      const awarded = data.awarded_points ?? 40;
      setToast({ open: true, message: `Registered successfully! +${awarded} points awarded.`, severity: 'success' });
      setTimeout(() => navigate('/'), 800);
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.error || 'Registration failed. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleToastClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Card variant="outlined" sx={{ my: 2, borderRadius: 4, boxShadow: 2 }}>
      <CardContent sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
        <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2 }}>
          <AccountCircle color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" color="secondary" sx={{ pl: 1 }}>
            Register User
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              Full Name
            </Typography>
            <TextField placeholder="Enter full name" value={form.name} onChange={handleChange('name')} fullWidth />
          </Stack>

          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              Username
            </Typography>
            <TextField placeholder="Pick a username" value={form.username} onChange={handleChange('username')} fullWidth helperText="This name is used for display, e.g., on the leaderboard." />
          </Stack>

          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              Password
            </Typography>
            <TextField
              placeholder="Create a password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange('password')}
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
          </Stack>

          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              Phone Number
            </Typography>
            <TextField placeholder="Enter phone number" value={form.phone} onChange={handleChange('phone')} fullWidth />
          </Stack>

          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              Email ID
            </Typography>
            <TextField placeholder="Enter email address" type="email" value={form.email} onChange={handleChange('email')} fullWidth />
          </Stack>

          <Stack spacing={1} alignItems="flex-start">
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              Skills
            </Typography>
            <TextField placeholder="List skills separated by commas" value={form.skills} onChange={handleChange('skills')} fullWidth />
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontWeight: 700, minWidth: 180 }}>
            Register
          </Button>
        </Stack>
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
