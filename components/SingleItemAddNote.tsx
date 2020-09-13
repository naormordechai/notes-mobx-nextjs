import React from 'react';
import { IItem } from '../interfaces/item';

import styles from './SingleItemAddNote.module.css';

interface Props {
    item: IItem;
    handlerIsCompletedItem: (id: string) => void;
    removeItem: (id: string) => void;
}

export const SingleItemAddNote = ({ item, handlerIsCompletedItem, removeItem }: Props) => {
    return (
        <div className={styles.singleItemRow}>
            <div>
                <input type="checkbox" checked={item.isCompleted} onChange={() => handlerIsCompletedItem(item._id)} />
                <span>{item.name}</span>
            </div>
            <button onClick={() => removeItem(item._id)}>X</button>
        </div>
    )
}
