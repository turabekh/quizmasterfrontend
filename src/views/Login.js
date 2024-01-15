import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Link, Snackbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import AuthService from '../services/AuthService';

const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      AuthService.login(values.email, values.password)
        .then(() => {
          // Login successful
          handleOpenSnackbar('Login successful', 'success');
          window.location.href = "/dashboard"
        })
        .catch(error => {
          // Login failed
          if (error?.response?.data?.non_field_errors && error.response.data.non_field_errors[0].includes('locked')) {
            handleOpenSnackbar('Your account is locked. Please contact the administrator or try again in 3 hours', 'error');
          }
          else {
            handleOpenSnackbar('Login failed. Please try again.', 'error');
          }
        });
    }
  });

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "100px" }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit" margin="normal">
          Login
        </Button>
        <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
            Don't have an account yet?{' '}
            <Link component={RouterLink} to="/register" color="primary">
              Sign up
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
            Forgot password?{' '}
            <Link component={RouterLink} to="/forgot-password" color="primary">
              Reset password
            </Link>
          </Typography>
        </div>
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

export default Login;
