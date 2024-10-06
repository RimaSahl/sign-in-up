import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Link, useNavigate   } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [error, setError] = useState('');

    const navigate = useNavigate ();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3001/auth/login', values);
                localStorage.setItem('token', response.data.token);

                navigate('/welcome');
            } catch (err) {
                setError(`Login failed. ${err.response.data.message}`);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={formik.handleSubmit}>
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
                    defaultValue= ''
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Login
                </Button>
                {error && <p style={{color :'red'}}>{error}</p>}
            </form>
            <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    Sign Up
                </Link>
            </Typography>
        </Container>
    );
};

export default Login;