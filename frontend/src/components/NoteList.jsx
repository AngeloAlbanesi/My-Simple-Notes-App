import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
    return (
        <div className="w-full flex flex-col items-center">
            {notes.map((note) => (
                <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default NoteList;