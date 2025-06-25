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

const authService = {
    register,
    login,
};

export default authService;