import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .matches(/[a-zA-Z]/, 'Must contain at least one letter')
                .matches(/[0-9]/, 'Must contain at least one number')
                .matches(/[\W_]/, 'Must contain at least one special character')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3001/auth/signup', values);
                console.log('Signed up:', response.data);
                localStorage.setItem('token', response.data.token);
                // Redirect to the Welcome page
                navigate('/welcome');

            } catch (err) {
                setError('Signup failed. Please try again.');
                console.error(err);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Signup</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formik.values.name || null}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email || null}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formik.values.password || null}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Signup
                </Button>
                {error && <p style={{color :'red'}}>{error}</p>}
            </form>
        </Container>
    );
};

export default Signup;