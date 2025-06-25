import React, { useState, useEffect, useCallback } from 'react';
import noteService from '../services/note.service';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import { useAuth } from '../hooks/useAuth';

const MyNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const { user } = useAuth();

    const fetchNotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await noteService.getAllNotes();
            setNotes(response.data);
        } catch (err) {
            setError('Impossibile caricare le note.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    // Funzione unificata per salvare (creare o aggiornare)
    const handleSaveNote = async (noteData) => {
        try {
            if (noteData.id) {
                // Se c'è un ID, stiamo aggiornando
                await noteService.updateNote(noteData.id, noteData.title, noteData.content);
            } else {
                // Altrimenti, stiamo creando
                await noteService.createNote(noteData.title, noteData.content);
            }
            setNoteToEdit(null); // Resetta lo stato di modifica
            fetchNotes(); // Ricarica le note
        } catch (err) {
            alert('Errore nel salvataggio della nota.');
            console.error(err);
        }
    };

    // Funzione per avviare la modifica
    const handleEditNote = (note) => {
        setNoteToEdit(note);
        window.scrollTo(0, 0); // Scorre la pagina in alto per mostrare il form
    };

    // Funzione per annullare la modifica
    const handleCancelEdit = () => {
        setNoteToEdit(null);
    };

    const renderContent = () => {
        if (isLoading) return <p className="text-gray-500">Caricamento note...</p>;
        if (error) return <p className="text-red-500">{error}</p>;
        if (notes.length === 0 && !noteToEdit) {
            // Mostra il messaggio "Nessuna nota" solo se non stiamo modificando
            return (
                <div className="text-center py-12">
                    {/* ... JSX del messaggio "Nessuna nota" ... */}
                </div>
            );
        }
        // Passiamo la funzione handleEditNote a NoteList e quindi a NoteItem
        return <NoteList notes={notes} onEdit={handleEditNote} />;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Ciao, {user?.username || 'Utente'}!
                    </h1>
                    <p className="text-lg text-gray-600">Ecco le tue note.</p>
                </div>

                <NoteForm
                    onSave={handleSaveNote}
                    noteToEdit={noteToEdit}
                    onCancelEdit={handleCancelEdit}
                />

                <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Le tue Note Salvate</h2>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MyNotesPage;