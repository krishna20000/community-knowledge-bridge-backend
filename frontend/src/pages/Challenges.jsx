import React from 'react';
import { Stack, Typography } from '@mui/material';
import SubmitChallenge from '../components/SubmitChallenge';

export default function Challenges() {
  return (
    <Stack spacing={2} textAlign="center">
      <Typography variant="h4" fontWeight={800}>
        Submit your problem
      </Typography>
      <Typography color="text.secondary">
        Document pressing local needs so residents with the right skills can step
        in quickly.
      </Typography>
      <SubmitChallenge />
    </Stack>
  );
}

