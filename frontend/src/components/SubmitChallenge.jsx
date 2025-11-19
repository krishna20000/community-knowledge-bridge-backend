import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { submitChallenge, getMyChallenges, updateChallenge, deleteChallenge } from '../api';
import useAuth from '../hooks/useAuth.js';

export default function SubmitChallenge() {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [myChallenges, setMyChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const { user, isAuthenticated } = useAuth();

  const loadChallenges = async () => {
    if (!isAuthenticated) {
      setMyChallenges([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await getMyChallenges(user.id);
      setMyChallenges(data);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setError("Please log in to submit a challenge.");
      return;
    }
    const text = (editId ? editDescription : description).trim();
    if (!text) {
      setError("Describe the challenge before submitting.");
      return;
    }
    try {
      if (editId) {
        await updateChallenge(editId, { description: text });
        setToast({ open: true, message: 'Challenge updated.', severity: 'success' });
        setEditId(null);
        setEditDescription('');
      } else {
        await submitChallenge({ description: text, creator_id: user.id });
        setToast({ open: true, message: 'Challenge posted successfully! +100 points awarded.', severity: 'success' });
        setDescription("");
      }
      setError("");
      loadChallenges();
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.error || 'Unable to submit challenge.',
        severity: 'error',
      });
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditDescription(item.description);
  };

  const handleDelete = async (id) => {
    try {
      await deleteChallenge(id);
      setToast({ open: true, message: 'Challenge deleted.', severity: 'info' });
      loadChallenges();
    } catch {
      setToast({ open: true, message: 'Unable to delete challenge.', severity: 'error' });
    }
  };

  const handleToastClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Stack spacing={3}>
      <Card variant="outlined" sx={{ my: 2, borderRadius: 3, boxShadow: 2, borderColor: "secondary.main" }}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ mb: 2 }}>
            <EmojiEvents sx={{ color: "#ffd600", fontSize: 40 }} />
            <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
              Submit your problem
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={2} sx={{ mb: 1, pl: { xs: 0, md: 6 } }}>
            <TextField
              label={editId ? "Update your challenge" : "Describe the challenge"}
              value={editId ? editDescription : description}
              onChange={e => (editId ? setEditDescription(e.target.value) : setDescription(e.target.value))}
              variant="outlined"
              fullWidth
              multiline
              minRows={2}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#ffd600", color: "#512da8", fontWeight: 700, minWidth: 140 }}
              onClick={handleSubmit}
              disabled={!isAuthenticated}
            >
              {editId ? 'Update' : 'Submit'}
            </Button>
            {editId && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  setEditId(null);
                  setEditDescription('');
                }}
              >
                Cancel
              </Button>
            )}
          </Stack>
          {!isAuthenticated && (
            <Alert severity="info" sx={{ mb: 1 }}>
              Please log in to submit a challenge.
            </Alert>
          )}
          {error && <Alert severity="warning" sx={{ mb: 1 }}>{error}</Alert>}
          <Snackbar
            open={toast.open}
            autoHideDuration={4000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity={toast.severity} onClose={handleToastClose} sx={{ width: '100%' }}>
              {toast.message}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>

      {isAuthenticated && (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={700}>My Problems</Typography>
            {loading ? (
              <Stack alignItems="center" py={2}>
                <CircularProgress />
              </Stack>
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
                  {myChallenges.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">No problems submitted yet.</TableCell>
                    </TableRow>
                  ) : (
                    myChallenges.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={item.status || 'in review'}
                            color={
                              item.status === 'matched'
                                ? 'success'
                                : item.status === 'rejected'
                                  ? 'error'
                                  : 'warning'
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {item.matched_user_id ? `Volunteer #${item.matched_user_id}` : 'Pending'}
                        </TableCell>
                      <TableCell align="center">
                        <Button size="small" onClick={() => handleEdit(item)}>Edit</Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}
