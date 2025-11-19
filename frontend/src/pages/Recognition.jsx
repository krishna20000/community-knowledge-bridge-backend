import React from 'react';
import { Stack, Typography } from '@mui/material';
import AwardPoints from '../components/AwardPoints';

export default function Recognition() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={800}>
        Recognize Impact
      </Typography>
      <Typography color="text.secondary">
        Celebrate completed work by awarding points that feed into the public
        leaderboard.
      </Typography>
      <AwardPoints />
    </Stack>
  );
}

