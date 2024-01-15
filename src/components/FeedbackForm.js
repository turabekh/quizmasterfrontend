import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';

const FeedbackForm = ({ open, onClose, onSubmit, question }) => {
  const [feedback, setFeedback] = useState('');

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(feedback, question);
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Provide Feedback</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          label="Feedback"
          value={feedback}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackForm;
