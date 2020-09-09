import React from 'react';
import { IItem } from '../interfaces/item';
import { SingleItem } from './SingleItem';

interface Props {
    items: IItem[];
    noteId: string;
    updateItemIsCompleted: (noteId: string, itemId: string) => void;
}

export const ListItem = ({ items, noteId, updateItemIsCompleted }: Props) => {
    return (
        <>
            {items.map(item => (
                <SingleItem
                    key={item._id}
                    item={item}
                    noteId={noteId}
                    updateItemIsCompleted={updateItemIsCompleted}
                />
            ))}
        </>
    )
}
