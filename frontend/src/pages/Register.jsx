import React from 'react';
import { Stack, Typography } from '@mui/material';
import RegisterUser from '../components/RegisterUser';

export default function Register() {
  return (
    <Stack spacing={2} textAlign="center">
      <Typography variant="h4" fontWeight={800}>
        Register a Community Member
      </Typography>
      <Typography color="text.secondary">
        Capture local skills so the matchmaking agent can find the best volunteer
        for upcoming challenges.
      </Typography>
      <RegisterUser />
    </Stack>
  );
}

