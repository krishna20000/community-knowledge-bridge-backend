import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuth from '../hooks/useAuth.js';

const linkStyles = ({ isActive }) => ({
  color: isActive ? '#ffd600' : '#fff',
  fontWeight: isActive ? 800 : 600,
  textTransform: 'none',
});

export default function AppLayout() {
  const { isAuthenticated, logout } = useAuth();
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const guestLinks = [
    { label: 'Home', to: '/' },
    { label: 'Register', to: '/register' },
    { label: 'Login', to: '/login' },
  ];

  const memberLinks = [
    { label: 'Home', to: '/' },
    { label: 'Challenges', to: '/challenges' },
    { label: 'My Problems', to: '/my-challenges' },
    { label: 'Matchmaking', to: '/match' },
    { label: 'Recognition', to: '/recognition' },
    { label: 'Leaderboard', to: '/leaderboard' },
  ];

  const links = isAuthenticated ? memberLinks : guestLinks;

  const handleLogout = () => {
    logout();
    setToast({ open: true, message: 'Logged out successfully.', severity: 'info' });
  };

  const handleToastClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #512da8 20%, #ffd600 80%)',
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ background: 'rgba(81, 45, 168, 0.6)', backdropFilter: 'blur(6px)' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={800}>
            Community Knowledge Bridge
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={linkStyles}
              >
                {link.label}
              </Button>
            ))}
            {isAuthenticated && (
              <>
                <IconButton color="inherit" disableRipple sx={{ ml: 1 }}>
                  <AccountCircleIcon />
                </IconButton>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
                sx={{ ml: 1, textTransform: 'none', fontWeight: 700 }}
              >
                Logout
              </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 5,
            boxShadow: '0 12px 36px rgba(55, 0, 83, 0.25)',
            p: { xs: 2, md: 4 },
            minHeight: '60vh',
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert severity={toast.severity} onClose={handleToastClose} sx={{ width: '100%' }}>
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

