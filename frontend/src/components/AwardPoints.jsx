import React, { useState } from 'react';
import { Card, CardContent, Stack, Typography, TextField, Button } from '@mui/material';
import { Whatshot } from '@mui/icons-material';
import { awardPoints } from '../api';

export default function AwardPoints() {
  const [userId, setUserId] = useState("");
  const [points, setPoints] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await awardPoints({ user_id: userId, points: parseInt(points) });
      setResponse(`Points Awarded! Total: ${data.total_points}`);
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  return (
    <Card variant="outlined" sx={{ my: 2, borderRadius: 4, borderColor: "secondary.main", boxShadow: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2 }}>
          <Whatshot sx={{ color: "#ffd600", fontSize: 40 }} />
          <Typography variant="h5" color="primary">Award Points</Typography>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={2}>
          <TextField label="User ID" value={userId} onChange={e => setUserId(e.target.value)} variant="outlined" fullWidth />
          <TextField label="Points" type="number" value={points} onChange={e => setPoints(e.target.value)} variant="outlined" fullWidth />
          <Button variant="contained" sx={{ bgcolor: "#ffd600", color: "#512da8", fontWeight: 700, minWidth: 140 }} onClick={handleSubmit}>Award</Button>
        </Stack>
        {response && <Typography sx={{ mt: 2, color: "green" }}>{response}</Typography>}
      </CardContent>
    </Card>
  );
}
