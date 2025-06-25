import axios from 'axios';

// Crea un'istanza di axios con una configurazione di base
const apiClient = axios.create({
    // L'URL base di tutte le nostre richieste API
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;