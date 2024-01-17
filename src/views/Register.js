import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Typography, Link, Snackbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

// const groups = [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }, { id: 3, name: 'Group 3' }];

const Register = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await AuthService.getStudentGroups();
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      groupNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      groupNumber: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      AuthService.register(values.email, values.firstName, values.lastName, values.password, values.groupNumber)
        .then(() => {
          // Registration successful
          handleOpenSnackbar('Registration successful. Please login', 'success');
          navigate('/login');
        })
        .catch((error) => {
          // Registration failed
          if (error?.response?.data?.email) {
            error?.response?.data?.email.forEach((message) => {
              handleOpenSnackbar(message, 'error');
            });
          } else if (error?.response?.data?.first_name) {
            error?.response?.data?.first_name.forEach((message) => {
              handleOpenSnackbar(message, 'error');
            });
          } else if (error?.response?.data?.last_name) {
            error?.response?.data?.last_name.forEach((message) => {
              handleOpenSnackbar(message, 'error');
            });
          } else if (error?.response?.data?.password) {
            error?.response?.data?.password.forEach((message) => {
              handleOpenSnackbar(message, 'error');
            });
          } else if (error?.response?.data?.group) {
            error?.response?.data?.group.forEach((message) => {
              handleOpenSnackbar(message, 'error');
            });
          } else {
            handleOpenSnackbar('Registration failed. Please try again.', 'error');
          }
        });
    },
  });

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '100px' }}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
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
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          margin="normal"
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="group-number-label">Group Number</InputLabel>
          <Select
            labelId="group-number-label"
            id="groupNumber"
            name="groupNumber"
            value={formik.values.groupNumber}
            label="Group Number"
            onChange={formik.handleChange}
            error={formik.touched.groupNumber && Boolean(formik.errors.groupNumber)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          Register
        </Button>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" color="primary">
            Login
          </Link>
        </Typography>
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

export default Register;
