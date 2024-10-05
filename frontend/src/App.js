import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import AuthCheck from './AuthCheck';

const App = () => {
    return (
        <Router>
            <AuthCheck>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/welcome" element={<Welcome />} />
                </Routes>
            </AuthCheck>
        </Router>
    );
};

export default App;