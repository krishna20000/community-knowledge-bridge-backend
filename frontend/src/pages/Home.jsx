import React from 'react';
import { Typography, Stack, Button, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  return (
    <Stack spacing={4}>
      <Stack spacing={3} textAlign="center">
        <Typography variant="h3" color="primary" fontWeight={800}>
          Bridge local talent with real community needs.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create challenges, match them with neighborhood skill-holders, and
          celebrate impact through a transparent recognition system.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            component={NavLink}
            to="/register"
            variant="contained"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            Join the Network
          </Button>
          <Button
            component={NavLink}
            to="/challenges"
            variant="outlined"
            color="secondary"
            sx={{ fontWeight: 700 }}
          >
            Post a Challenge
          </Button>
        </Stack>
      </Stack>

      <Box textAlign="center">
        <Typography variant="h5" color="primary" fontWeight={800} mb={2}>
          Community Momentum
        </Typography>
        <Leaderboard />
      </Box>
    </Stack>
  );
}

