import React from 'react';

const NoteItem = ({ note }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 my-2 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
            <p className="text-gray-600 mt-2">{note.content}</p>
            <div className="text-right text-xs text-gray-400 mt-4">
                {/* Formattiamo la data per una migliore leggibilità */}
                Aggiornato il: {new Date(note.updatedAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default NoteItem;