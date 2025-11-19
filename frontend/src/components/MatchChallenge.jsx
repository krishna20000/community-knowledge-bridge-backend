import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Stars } from '@mui/icons-material';
import { matchChallenge, getMyChallenges } from '../api';
import useAuth from '../hooks/useAuth.js';

export default function MatchChallenge() {
  const [challengeId, setChallengeId] = useState('');
  const [response, setResponse] = useState('');
  const [myChallenges, setMyChallenges] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [matchPercent, setMatchPercent] = useState(0);

  const handleSubmit = async () => {
    if (!challengeId) return;
    setLoading(true);
    try {
      const { data } = await matchChallenge({ challenge_id: challengeId });
      setResponse(data.msg);
      setMatchPercent(data.match_percent || 0);
      setMatchedProfile(data.matched_profile);
    } catch (error) {
      setResponse("Error: " + error.message);
      setMatchedProfile(null);
      setMatchPercent(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setMyChallenges([]);
      return;
    }
    setFetching(true);
    getMyChallenges(user.id)
      .then(({ data }) => {
        setMyChallenges(data);
      })
      .catch(() => {
        setMyChallenges([]);
      })
      .finally(() => setFetching(false));
  }, [isAuthenticated, user?.id]);

  const openChallenges = useMemo(
    () => myChallenges.filter((item) => (item.status || 'in review') !== 'matched'),
    [myChallenges],
  );

  return (
    <Stack spacing={3}>
      <Card variant="outlined" sx={{ my: 2, borderRadius: 4, boxShadow: 2, borderColor: "secondary.main" }}>
        <CardContent>
          <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2 }}>
            <Stars sx={{ color: "#ffd600", fontSize: 40 }} />
            <Typography variant="h5" color="primary">Match Challenge</Typography>
          </Stack>
          {!isAuthenticated && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Please log in to pick one of your submitted problems.
            </Alert>
          )}
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <TextField
              select
              label={fetching ? "Loading your problems..." : "Select one of your problems"}
              value={challengeId}
              onChange={(e) => setChallengeId(e.target.value)}
              variant="outlined"
              fullWidth
              disabled={!isAuthenticated || fetching || openChallenges.length === 0}
            >
              {openChallenges.map((challenge) => (
                <MenuItem key={challenge.id} value={challenge.id}>
                  #{challenge.id} — {challenge.description.slice(0, 50)}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              sx={{ bgcolor: "#ffd600", color: "#512da8", fontWeight: 700, minWidth: 140 }}
              onClick={handleSubmit}
              disabled={!challengeId || fetching || loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#512da8' }} /> : 'Match'}
            </Button>
          </Stack>
        {response && (
          <Alert sx={{ mt: 2 }} severity={response.startsWith('Error') ? 'error' : 'success'}>
            {response}
          </Alert>
        )}
        </CardContent>
      </Card>

      {matchedProfile && (
        <Card variant="outlined" sx={{ borderRadius: 4, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, pl: 2 }}>
              Matched Volunteer
            </Typography>
            <Table sx={{ pl: 8 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Match %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{matchedProfile.id}</TableCell>
                  <TableCell>{matchedProfile.name}</TableCell>
                  <TableCell>{matchedProfile.phone || 'N/A'}</TableCell>
                  <TableCell>{matchedProfile.skills}</TableCell>
                  <TableCell>{matchedProfile.points}</TableCell>
                  <TableCell>{matchPercent}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
