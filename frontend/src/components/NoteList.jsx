import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes }) => {
    return (
        <div className="w-full flex flex-col items-center">
            {notes.map((note) => (
                <NoteItem key={note.id} note={note} />
            ))}
        </div>
    );
};

export default NoteList;