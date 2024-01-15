import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Link, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import AuthService from '../services/AuthService';
import { Link as RouterLink } from 'react-router-dom';

const ForgotPassword = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleOpenSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values) => {
            //Forgot password logic
            AuthService.forgotPassword(values.email)
                .then(() => {
                    // Forgot password successful
                    handleOpenSnackbar('Password reset email sent', 'success');
                })
                .catch(error => {
                    // Forgot password failed
                    handleOpenSnackbar('Error sending password reset email', 'error');
                });
        }
    });

    return (
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "100px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Forgot Password
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
                <Button color="primary" variant="contained" fullWidth type="submit" margin="normal">
                    Submit
                </Button>
                <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
                    Remember your password?{' '}
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

export default ForgotPassword;
