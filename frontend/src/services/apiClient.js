import axios from 'axios';

// Crea un'istanza di axios con una configurazione di base
const apiClient = axios.create({
    // L'URL base di tutte le nostre richieste API
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor per aggiungere automaticamente il token alle richieste
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor per gestire le risposte e gli errori di autenticazione
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Token non valido o scaduto
            localStorage.removeItem('token');
            // Reindirizza al login se non siamo già nella pagina di login
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;