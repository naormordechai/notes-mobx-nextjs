import React from 'react';
import { INote } from '../interfaces/note';
import { SingleNote } from './SingleNote';

interface Props {
    notes: INote[] | undefined;
    onDeleteNote: (id: string) => void;
    updateItemIsCompleted: (noteId: string, itemId: string) => void;
}

export const ListNote = ({ notes, onDeleteNote, updateItemIsCompleted }: Props) => {
    return (
        <>
            {notes!.map((note) => (
                <SingleNote
                    key={note._id}
                    note={note}
                    onDeleteNote={onDeleteNote}
                    noteId={note._id}
                    updateItemIsCompleted={updateItemIsCompleted}
                />
            ))}
        </>
    )
}