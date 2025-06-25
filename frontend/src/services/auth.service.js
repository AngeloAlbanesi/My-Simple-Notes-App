import apiClient from './apiClient';

// Funzione per registrare un nuovo utente
const register = (username, password) => {
    return apiClient.post('/users/register', {
        username,
        password,
    });
};

// Funzione per effettuare il login
const login = (username, password) => {
    return apiClient.post('/users/login', {
        username,
        password,
    });
};

// Funzione per validare il token con il backend
const validateToken = (token) => {
    return apiClient.get('/users/validate', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const authService = {
    register,
    login,
    validateToken,
};

export default authService;