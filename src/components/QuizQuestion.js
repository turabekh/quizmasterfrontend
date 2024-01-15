import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import FeedbackForm from "../components/FeedbackForm";
import SchoolService from "../services/SchoolService";

const QuizQuestion = ({ question, selectedAnswer, onAnswerSelect }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Function to handle opening and closing the feedback form dialog
  const handleFeedbackOpen = () => {
    setFeedbackOpen(true);
  };

  const handleAnswerChange = (event) => {
    onAnswerSelect(event.target.value);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  const handleFeedbackSubmit = (feedbackText, question) => {
    if (!feedbackText) {
      handleOpenSnackbar('Feedback cannot be blank', 'error');
      return;
    }
    SchoolService.postQuestionFeedback(question.id, feedbackText)
      .then((response) => {
        handleOpenSnackbar('Feedback submitted', 'success');
      })
      .catch((error) => {
        handleOpenSnackbar('Error submitting feedback', 'error');
      });
  };


  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }} elevation={2}>
      <CardContent style={{ userSelect: 'none' }}>
        <Typography variant="h6" gutterBottom p={2}>
          {question.text}
        </Typography>
        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              value={answer.id.toString()}
              control={<Radio />}
              label={answer.text}
            />
          ))}
        </RadioGroup>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleFeedbackOpen}
        >
          Provide Feedback
        </Button>
        <FeedbackForm
          open={feedbackOpen}
          onClose={handleFeedbackClose}
          onSubmit={handleFeedbackSubmit}
          question={question}
        />
      </CardContent>
      {/* Snackbar for displaying success and error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default QuizQuestion;
