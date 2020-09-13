import { useState, useRef, FormEvent } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IItem } from "../interfaces/item";
import { IAddNote } from "../interfaces/add-note";
import { useRouter } from 'next/router';
import styles from './add-note.module.css';
import { DataStore } from "../stores/DataStore";
import { inject } from "mobx-react";
import { ListItemAddNote } from "../components/ListItemAddNote";
import { Header } from "../components/Header";
import Link from "next/link";

interface Props {
    dataStore: DataStore
}


const AddNote = inject('dataStore')(({ dataStore }: Props) => {
    const [note, setNote] = useState<IAddNote>({
        name: '',
        items: [],
    });
    const router = useRouter()
    const refItemName = useRef<HTMLInputElement>(null);
    const refItemIsCompleted = useRef<HTMLInputElement>(null);

    const handlerChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const key = ev.target.name;
        const { value } = ev.target;
        setNote(note => ({ ...note, [key]: value }))
    }

    const onAddNote = async (ev: FormEvent) => {
        ev.preventDefault();
        await dataStore.addOneNote(note);
        router.push('/');
    }

    const onAddNewItem = () => {
        const items: IItem[] = [...note.items];
        const item: IItem = {
            _id: uuidv4(),
            isCompleted: refItemIsCompleted.current!.checked,
            name: refItemName.current!.value
        }
        items.push(item);
        const key = refItemName.current!.name;
        setNote(state => ({ ...state, [key]: items }));
        // initialize values
        refItemName.current!.value = '';
        refItemIsCompleted.current!.checked = false;
    }

    const handlerIsCompletedItem = (id: string) => {
        const requetedIndex = note.items.findIndex(item => item._id === id);
        const items = [...note.items];
        items[requetedIndex].isCompleted = !items[requetedIndex].isCompleted;
        setNote(note => ({ ...note, items }));
    };

    const removeItem = (id: string) => {
        const items = note.items.filter(item => item._id !== id);
        setNote(note => ({ ...note, items }));
    };


    return (
        <>
            <Header>
                <Link href="/">
                    <a>Notes</a>
                </Link>
            </Header>
            <h1 className={styles.addNoteTitle}>Add note</h1>
            <form onSubmit={onAddNote} className={styles.addNoteForm}>
                <div className={styles.formControl}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" onChange={handlerChange} autoComplete="off" />
                </div>
                <div className={styles.rowAddItem}>
                    <label htmlFor="items">Items</label>
                    <input type="checkbox" ref={refItemIsCompleted} />
                    <input type="text" ref={refItemName} name="items" autoComplete="off" />
                    <div onClick={onAddNewItem} className={styles.addItemBtn}>+</div>
                </div>
                <div className={styles.listItemContainer}>
                    <ListItemAddNote
                        items={note.items}
                        onRemoveItem={removeItem}
                        onIsCompletedClicked={handlerIsCompletedItem} />
                </div>
                <button type="submit" className={styles.addNoteBtn}>Add Note</button>
            </form>
        </>
    )
});

export default AddNote;