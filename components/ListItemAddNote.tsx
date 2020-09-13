import React from 'react';
import { IItem } from '../interfaces/item';
import { SingleItemAddNote } from './SingleItemAddNote';
import styles from './ListItemAddNote.module.css';


interface Props {
    items: IItem[];
    onRemoveItem: (id: string) => void;
    onIsCompletedClicked: (id: string) => void;
}

export const ListItemAddNote = ({ items, onRemoveItem, onIsCompletedClicked }: Props) => {
    return (
        <>
            {items && items.length > 0 ? items.map(item => (
                <SingleItemAddNote
                    key={item._id}
                    item={item}
                    removeItem={onRemoveItem}
                    handlerIsCompletedItem={onIsCompletedClicked}
                />
            )) : <p className={styles.noItemsText}>There is no items yet!</p>}
        </>
    )
}
