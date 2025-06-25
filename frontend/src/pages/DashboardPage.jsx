import React, { useState, useEffect } from 'react';
import noteService from '../services/note.service';
import NoteList from '../components/NoteList';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Prendiamo l'utente dal context per un saluto

    // useEffect si attiva una sola volta al montaggio del componente
    useEffect(() => {
        const fetchNotes = async () => {
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
        };

        fetchNotes();
    }, []); // L'array vuoto [] assicura che l'effetto venga eseguito solo una volta

    // Funzione per renderizzare il contenuto in base allo stato
    const renderContent = () => {
        if (isLoading) {
            return <p className="text-gray-500">Caricamento note...</p>;
        }
        if (error) {
            return <p className="text-red-500">{error}</p>;
        }
        if (notes.length === 0) {
            return <p className="text-gray-500">Nessuna nota trovata. Inizia a crearne una!</p>;
        }
        return <NoteList notes={notes} />;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Ciao, {user?.username || 'Utente'}!
                </h1>
                <p className="text-lg text-gray-600 mb-8">Ecco le tue note.</p>

                <div className="mt-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
