import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import SchoolService from '../services/SchoolService'; // Import the service

const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes when the component mounts
    const fetchQuizzes = async () => {
      try {
        const quizzesList = await SchoolService.fetchQuizzesList();
        setQuizzes(quizzesList);
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      <Paper elevation={3} p={2}>
        <Typography variant="h4" component="h1" p={3} gutterBottom style={{textAlign: "center"}}>
          Quizzes
        </Typography>
        <List>
          {quizzes.map((quiz) => (
            <ListItem key={quiz.id}>
              <ListItemText primary={quiz.title} />
              <Button
                variant="contained"
                color="primary"
                href={`/quiz/${quiz.id}`}
                disabled={!quiz?.is_active}
              >
                Take Quiz
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default QuizzesList;
