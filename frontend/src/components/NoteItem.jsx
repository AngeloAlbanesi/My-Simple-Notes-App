import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => { // <-- Aggiungi la prop onDelete
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 my-2 w-full max-w-2xl">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
                    <p className="text-gray-600 mt-2">{note.content}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    {/* Pulsante di modifica */}
                    <button
                        onClick={() => onEdit(note)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-200"
                    >
                        Modifica
                    </button>
                    {/* Pulsante di eliminazione */}
                    <button
                        onClick={() => onDelete(note.id)} // Passa solo l'ID della nota
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-200"
                    >
                        Elimina
                    </button>
                </div>
            </div>
            <div className="text-right text-xs text-gray-400 mt-4">
                Aggiornato il: {new Date(note.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default NoteItem;