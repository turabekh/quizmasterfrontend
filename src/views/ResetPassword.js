import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import AuthService from '../services/AuthService';


const ResetPassword = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const { token, uidb64 } = useParams(); // Retrieve the reset token from the URL
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: (values) => {
      // Reset password logic
      AuthService.resetPassword(token, uidb64, values.password)
        .then(() => {
          // Reset password successful
          handleOpenSnackbar('Password reset successful', 'success');
          window.location.href = '/login';
        })
        .catch(error => {
          if (error?.response?.data?.new_password) {
            error?.response?.data?.new_password.forEach((message) => {
              handleOpenSnackbar(message, 'error');
            });
          } else {
            handleOpenSnackbar('Error resetting password', 'error');
          }
          // Handle errors (e.g., show an error message)
        });
    }
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "100px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reset Password
        </Typography>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="New Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit" margin="normal">
          Reset Password
        </Button>
      </form>
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

export default ResetPassword;
