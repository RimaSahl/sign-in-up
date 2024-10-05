import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Application!
            </Typography>
            <Typography variant="h5" gutterBottom>
                We're glad to have you here.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};

export default Welcome;