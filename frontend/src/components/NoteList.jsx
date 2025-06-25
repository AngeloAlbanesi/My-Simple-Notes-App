import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit }) => {
    return (
        <div className="w-full flex flex-col items-center">
            {notes.map((note) => (
                <NoteItem key={note.id} note={note} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default NoteList;