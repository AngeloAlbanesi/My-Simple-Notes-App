import apiClient from './apiClient';

// Funzione per ottenere tutte le note dell'utente autenticato
const getAllNotes = () => {
    return apiClient.get('/notes');
};

// Funzione per creare una nuova nota
const createNote = (title, content) => {
    return apiClient.post('/notes', { title, content });
};

// Funzione per aggiornare una nota esistente
const updateNote = (id, title, content) => {
    return apiClient.put(`/notes/${id}`, { title, content });
};

const noteService = {
    getAllNotes,
    createNote,
    updateNote,
};

export default noteService;