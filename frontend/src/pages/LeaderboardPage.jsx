import React from 'react';
import { Stack, Typography } from '@mui/material';
import Leaderboard from '../components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <Stack spacing={2} textAlign="center">
      <Typography variant="h4" fontWeight={800}>
        Top Community Contributors
      </Typography>
      <Typography color="text.secondary">
        Track momentum across the network and highlight residents who consistently
        step up.
      </Typography>
      <Leaderboard />
    </Stack>
  );
}

