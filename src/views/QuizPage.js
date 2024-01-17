import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import SchoolService from '../services/SchoolService';
import QuizQuestion from '../components/QuizQuestion';

const QuizPage = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsData = await SchoolService.fetchQuestionsByQuizId(quizId);
        // Initialize selectedAnswers with empty values for each question
        const initialSelectedAnswers = {};
        questionsData.forEach((question) => {
          initialSelectedAnswers[question.id] = null;
        });
        setSelectedAnswers(initialSelectedAnswers);
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    const allQuestionsAnswered = Object.values(selectedAnswers).every(
      (answerId) => answerId !== null
    );

    if (allQuestionsAnswered) {
      // Create the format [{'question_id': x, 'answer_id': y}, ...]
      const quizResponses = [];
      for (const questionId in selectedAnswers) {
        const answerId = selectedAnswers[questionId];
        if (answerId !== null) {
          quizResponses.push({ question_id: questionId, answer_id: answerId });
        }
      }

      // Call the handleQuizSubmit function from SchoolService
      setLoading(true);
      SchoolService.handleQuizSubmit(quizId, quizResponses)
        .then((response) => {
          // Handle the response, e.g., show a success message
          handleOpenSnackbar('Quiz Submitted!', 'success');
          setLoading(false);
          setTimeout(() => {
            navigate('/gradebook', { replace: true });
          }, 500)
        
        })
        .catch((error) => {
          // Handle any errors, e.g., show an error message
          if (error?.response?.data?.message === 'You have reached the maximum number of attempts for this quiz.') {
            handleOpenSnackbar('You have reached the maximum number of attempts for this quiz.', 'error');
          }
          else {
            handleOpenSnackbar('Error submitting quiz.', 'error');
          }
          setLoading(false);
        });
    } else {
      // Show confirmation dialog if not all questions are answered
      setConfirmationOpen(true);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleSubmitAnyway = () => {
    // Submit the quiz even if not all questions are answered
    // Call the handleSubmitQuiz function to submit the quiz
    const quizResponses = [];
    for (const questionId in selectedAnswers) {
      const answerId = selectedAnswers[questionId];
      if (answerId !== null) {
        quizResponses.push({ question_id: questionId, answer_id: answerId });
      }
    }

    // Call the handleQuizSubmit function from SchoolService
    SchoolService.handleQuizSubmit(quizId, quizResponses)
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log('Quiz Submitted:', response);
        handleOpenSnackbar('Quiz Submitted!', 'success');
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
        if (error?.response?.data?.message === 'You have reached the maximum number of attempts for this quiz.') {
          handleOpenSnackbar('You have reached the maximum number of attempts for this quiz.', 'error');
        }
      });
    setConfirmationOpen(false); // Close the confirmation dialog
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }} p={3}>
        Quiz
      </Typography>
      {questions.map((question) => (
        <QuizQuestion
          key={question.id}
          question={question}
          selectedAnswer={selectedAnswers[question.id]}
          onAnswerSelect={(answerId) => handleAnswerSelect(question.id, answerId)}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '16px' }}
        onClick={handleSubmitQuiz}
        disabled={loading}
        fullWidth
      >
        Submit Quiz
      </Button>
      <Dialog
        open={isConfirmationOpen}
        onClose={handleConfirmationClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You have not answered all the questions. Are you sure you want to submit the quiz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAnyway} color="primary">
            Submit Anyway
          </Button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
};

export default QuizPage;
