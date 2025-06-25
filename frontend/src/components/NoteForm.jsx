import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSave, noteToEdit, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // useEffect si attiva quando la prop 'noteToEdit' cambia.
    // Se riceviamo una nota da modificare, popoliamo i campi del form.
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
        } else {
            // Se non c'è una nota da modificare (siamo in modalità creazione),
            // i campi sono vuoti.
            setTitle('');
            setContent('');
        }
    }, [noteToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Il titolo è obbligatorio.');
            return;
        }
        // La funzione onSave ora gestirà sia la creazione che la modifica.
        // Passiamo l'ID se stiamo modificando, altrimenti sarà undefined.
        await onSave({ id: noteToEdit?.id, title, content });

        // Pulisce i campi solo se non stiamo modificando
        if (!noteToEdit) {
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {noteToEdit ? 'Modifica Nota' : 'Crea una Nuova Nota'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Titolo della nota"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Scrivi qui il contenuto..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-28"
                    />
                </div>
                <div className="flex justify-end items-center gap-4">
                    {noteToEdit && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Annulla
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        {noteToEdit ? 'Salva Modifiche' : 'Salva Nota'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;