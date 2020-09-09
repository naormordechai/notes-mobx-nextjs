import React from 'react';
import { IItem } from '../interfaces/item';
import { observer } from 'mobx-react-lite';

import styles from './SingleItem.module.css';

interface Props {
    item: IItem;
    updateItemIsCompleted: (noteId: string, itemId: string) => void;
    noteId: string;
}

export const SingleItem = observer(({ item, noteId , updateItemIsCompleted}: Props) => {
    return (
        <div className={styles.singleItemBox}>
            <input type="checkbox" checked={item.isCompleted} onChange={() => updateItemIsCompleted(noteId, item._id)}/>
            <p>{item.name}</p>
        </div>
    )
})