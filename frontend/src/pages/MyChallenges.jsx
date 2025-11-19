import React, { useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
} from '@mui/material';
import useAuth from '../hooks/useAuth.js';
import { getMyChallenges } from '../api';

const statusColor = (status) => {
  switch (status) {
    case 'matched':
      return 'success';
    case 'in-progress':
      return 'warning';
    case 'completed':
      return 'primary';
    default:
      return 'default';
  }
};

export default function MyChallenges() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchChallenges = async () => {
      if (!user?.id) {
        if (active) {
          setRows([]);
          setError('');
          setLoading(false);
        }
        return;
      }
      if (active) setLoading(true);
      try {
        const { data } = await getMyChallenges(user.id);
        if (active) {
          setRows(data);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.error || 'Unable to load challenges.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchChallenges();

    return () => {
      active = false;
    };
  }, [user?.id]);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={800} textAlign="center">
        My Submitted Problems
      </Typography>
      <Typography color="text.secondary" textAlign="center">
        Track each request you posted and see whether it has been matched, is in progress,
        or already completed.
      </Typography>
      {loading ? (
        <Stack alignItems="center" py={4}>
          <CircularProgress />
        </Stack>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 4 }}>
          {error ? (
            <Typography color="error" align="center" sx={{ py: 3 }}>
              {error}
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Matched Volunteer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No submissions yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="center">
                        <Chip label={row.status || 'open'} color={statusColor(row.status)} />
                      </TableCell>
                      <TableCell align="center">
                        {row.matched_user_id ? `Volunteer #${row.matched_user_id}` : 'Pending'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      )}
    </Stack>
  );
}

