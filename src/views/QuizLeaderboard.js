import React, { useEffect, useState } from 'react';
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import SchoolService from '../services/SchoolService';

const QuizLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    const fetchLeaderboardData = async () => {
      try {
        const data = await SchoolService.getQuizLeaderboard();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }} p={3}>
        Quiz Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz Title</TableCell>
              <TableCell>Highest Score</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell>Student First Name</TableCell>
              <TableCell>Student Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.highest_score}</TableCell>
                <TableCell>{item.student_email}</TableCell>
                <TableCell>{item.student_first_name}</TableCell>
                <TableCell>{item.student_last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuizLeaderboard;
