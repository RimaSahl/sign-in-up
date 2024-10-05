export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false; // No token means invalid
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const exp = payload.exp * 1000; // Convert exp to milliseconds
    return Date.now() < exp; // Check if token is still valid
};