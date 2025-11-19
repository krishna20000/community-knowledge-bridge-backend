import axios from 'axios';
const BASE_URL = "http://127.0.0.1:5000/api"; // Change this for production!

export const registerUser = (data) => axios.post(`${BASE_URL}/register`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);
export const submitChallenge = (data) => axios.post(`${BASE_URL}/challenges`, data);
export const matchChallenge = (data) => axios.post(`${BASE_URL}/match`, data);
export const awardPoints = (data) => axios.post(`${BASE_URL}/award`, data);
export const getLeaderboard = () => axios.get(`${BASE_URL}/leaderboard`);
export const getMyChallenges = (userId, params = {}) =>
  axios.get(`${BASE_URL}/challenges/mine`, { params: { user_id: userId, ...params } });
export const updateChallenge = (id, data) => axios.put(`${BASE_URL}/challenges/${id}`, data);
export const deleteChallenge = (id) => axios.delete(`${BASE_URL}/challenges/${id}`);
