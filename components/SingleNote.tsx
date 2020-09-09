import React from 'react'
import { INote } from '../interfaces/note'
import { ListItem } from './ListItem';
import styles from './SingleNote.module.css';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

interface Props {
    note: INote;
    onDeleteNote: (id: string) => void;
    noteId: string;
    updateItemIsCompleted: (noteId: string, itemId: string) => void;
}

export const SingleNote = observer(({ note, onDeleteNote, noteId, updateItemIsCompleted }: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>{note.name}</h2>
                <span className={styles.deleteNoteBtn} onClick={() => onDeleteNote(note._id)}>X</span>
            </div>
            <div className={styles.datesBox}>
                <span>Created: {moment(note.createdDate).format('MM/DD/YYYY')}</span>
                <span>Updated: {moment(note.updatedDate).format('MM/DD/YYYY')}</span>
            </div>
            <ListItem
                items={note.items}
                noteId={noteId}
                updateItemIsCompleted={updateItemIsCompleted}
            />
        </div>
    )
})