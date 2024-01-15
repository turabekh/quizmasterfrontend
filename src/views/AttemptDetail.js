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
} from '@mui/material';
import SchoolService from '../services/SchoolService';
import { useParams } from 'react-router-dom';



const AttemptDetail = () => {
  const [attemptDetail, setAttemptDetail] = useState(null);
  const { attemptID } = useParams();

  useEffect(() => {
    // Fetch attempt detail data
    const fetchAttemptDetail = async () => {
      try {
        const detail = await SchoolService.getAttemptDetail(attemptID);
        setAttemptDetail(detail);
      } catch (error) {
        console.error('Error fetching attempt detail:', error);
      }
    };

    fetchAttemptDetail();
  }, [attemptID]);

  // Function to format a date string to a readable format
  const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom>
        Quiz Attempt Detail
      </Typography>
      {attemptDetail && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz Title</TableCell>
                <TableCell>Attempt Time</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{attemptDetail.quiz.title}</TableCell>
                <TableCell>{formatDateString(attemptDetail.attempt_time)}</TableCell>
                <TableCell>{attemptDetail.score}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Selected Answers
      </Typography>
      {attemptDetail && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Selected Answer</TableCell>
                <TableCell>Correct Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attemptDetail.student_answers.map((answer) => (
                <TableRow
                  key={answer.id}
                >
                  <TableCell>{answer.question_text}</TableCell>
                  <TableCell
                    style={{
                      backgroundColor: answer.is_correct ? '#b3ffb3' : '#ffb3b3',
                    }}
                  >{answer.text}</TableCell>
                  <TableCell
                    style={{
                      backgroundColor: answer.is_correct ? '#b3ffb3' : '#ffb3b3',
                    }}
                  >{answer.is_correct ? 'Correct' : 'Incorrect'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AttemptDetail;
