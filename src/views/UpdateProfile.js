import React from 'react';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar messages
import AuthService from '../services/AuthService';

const UpdateProfile = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleOpenSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const [initialValues, setInitialValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        // Add other fields as necessary
    });

    // Assuming you have a method to fetch the current user's profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await AuthService.getCurrentUserProfile();
                setInitialValues({
                    email: userProfile.email,
                    firstName: userProfile.first_name,
                    lastName: userProfile.last_name,
                    // Set other fields
                });
            } catch (error) {
                handleOpenSnackbar('Error fetching user profile', 'error');
            }
        };

        fetchUserProfile();
    }, []);

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true, // Reinitialize form when initialValues change
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            // Add other field validations
        }),
        onSubmit: (values) => {
            // Update profile logic
            AuthService.updateUserProfile(values)
                .then(() => {
                    // Update successful
                    handleOpenSnackbar('Profile updated successfully', 'success');
                })
                .catch(error => {
                    // Handle errors
                    handleOpenSnackbar('Error updating profile', 'error');
                });
        }
    });

    return (
        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "100px" }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Profile
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
                    disabled
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
                {/* Add other input fields here */}
                <Button color="primary" variant="contained" fullWidth type="submit" margin="normal">
                    Update
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

export default UpdateProfile;
