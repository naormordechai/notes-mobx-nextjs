import React from 'react';
import { IItem } from '../interfaces/item';
import { SingleItemAddNote } from './SingleItemAddNote';

interface Props {
    items: IItem[];
    onRemoveItem: (id: string) => void;
    onIsCompletedClicked: (id: string) => void;
}

export const ListItemAddNote = ({ items, onRemoveItem, onIsCompletedClicked }: Props) => {
    return (
        <>
            {items.map(item => (
                <SingleItemAddNote
                    key={item._id}
                    item={item}
                    removeItem={onRemoveItem}
                    handlerIsCompletedItem={onIsCompletedClicked}
                />
            ))}
        </>
    )
}
