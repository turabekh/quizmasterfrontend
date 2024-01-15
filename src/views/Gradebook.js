import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolService from '../services/SchoolService'; // Import the service

const Gradebook = () => {
  const [gradesData, setGradesData] = useState([]);

  useEffect(() => {
    // Fetch grades data
    const fetchGrades = async () => {
      try {
        const grades = await SchoolService.getGrades();
        setGradesData(grades);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, []);

  // Function to format a date string to a readable format
  const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom>
        Gradebook
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz Title</TableCell>
              <TableCell>Attempt Time</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>View Answers</TableCell> {/* New column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {gradesData.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.quiz.title}</TableCell>
                <TableCell>{formatDateString(grade.attempt_time)}</TableCell>
                <TableCell>{grade.score}</TableCell>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/attempt/${grade.id}`} 
                    color="primary"
                  >
                    View Answers
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Gradebook;
