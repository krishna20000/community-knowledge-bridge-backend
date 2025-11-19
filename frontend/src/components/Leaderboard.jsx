import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { EmojiEvents, Star } from '@mui/icons-material';
import { getLeaderboard } from '../api';

const rewards = [
  { label: 'Login bonus', value: '+20 points' },
  { label: 'New registration', value: '+40 points' },
  { label: 'Submit a challenge', value: '+100 points' },
];

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getLeaderboard().then(res => setEntries(res.data)).catch(() => {});
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 4, alignItems: 'stretch' }}>
      <Grid item xs={12} md={8}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 4, backgroundColor: "#ede7f6", height: '100%' }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
            <EmojiEvents sx={{ color: "#ffd600", fontSize: 40 }} />
            <Typography variant="h5" color="primary" fontWeight={700}>Leaderboard</Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 700, color: "#ffd600" }}>Rank</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Username</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, idx) => (
                <TableRow key={entry.username} sx={{ bgcolor: idx === 0 ? "#fffde7" : "inherit" }}>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>{idx + 1}</TableCell>
                  <TableCell align="center">{entry.username}</TableCell>
                  <TableCell align="center">{entry.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            borderRadius: 2,
            background: '#fff8d6',
            border: '2px dashed #ffd600',
            position: { md: 'sticky' },
            top: { md: 24 },
            width: '100%',
            maxWidth: 360,
          }}
        >
          <Typography variant="h6" color="primary" fontWeight={700} sx={{ mb: 2 }}>
            Points Guide
          </Typography>
          <List>
            {rewards.map((reward) => (
              <ListItem key={reward.label} disableGutters>
                <ListItemIcon>
                  <Star sx={{ color: '#ffd600' }} />
                </ListItemIcon>
                <ListItemText
                  primary={reward.label}
                  secondary={reward.value}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
