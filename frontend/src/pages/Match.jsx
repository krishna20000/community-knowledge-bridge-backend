import React from 'react';
import { Stack, Typography } from '@mui/material';
import MatchChallenge from '../components/MatchChallenge';

export default function Match() {
  return (
    <Stack spacing={2} textAlign="center">
      <Typography variant="h4" fontWeight={800}>
        Match Challenges with Local Talent
      </Typography>
      <Typography color="text.secondary">
        Use the AI-powered matcher to connect each challenge to the most relevant
        volunteer based on their skills.
      </Typography>
      <MatchChallenge />
    </Stack>
  );
}

