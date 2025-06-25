import apiClient from './apiClient';

// Funzione per ottenere tutte le note dell'utente autenticato
// Grazie all'interceptor di apiClient, il token verrà aggiunto automaticamente.
const getAllNotes = () => {
    return apiClient.get('/notes');
};

// In futuro aggiungeremo qui le altre funzioni (create, update, delete)

const noteService = {
    getAllNotes,
};

export default noteService;