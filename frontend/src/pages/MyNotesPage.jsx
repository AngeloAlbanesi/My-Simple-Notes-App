import React, { useState, useEffect } from 'react';
import noteService from '../services/note.service';
import NoteList from '../components/NoteList';
import { useAuth } from '../hooks/useAuth';

const MyNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

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
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <p className="text-gray-500">Caricamento note...</p>;
        }
        if (error) {
            return <p className="text-red-500">{error}</p>;
        }
        if (notes.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Nessuna nota trovata</h3>
                    <p className="text-gray-600 mb-6">Inizia a creare la tua prima nota per organizzare i tuoi pensieri!</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
                        Crea la prima nota
                    </button>
                </div>
            );
        }
        return <NoteList notes={notes} />;
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

                <div className="bg-white rounded-lg shadow-sm p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MyNotesPage;