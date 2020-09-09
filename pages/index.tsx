import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { DataStore } from "../stores/DataStore";
import { useEffect } from "react";
import { ListNote } from '../components/ListNote';
import Link from "next/link";
import styles from './index.module.css'

type Props = {
  dataStore?: DataStore;
};

const IndexPage = inject("dataStore")(
  observer((props: Props) => {

    const dataStore = props.dataStore!;
    useEffect(() => {
      dataStore.fetchData();
    }, [])

    const deleteNoteHandler = (id: string) => {
      dataStore.deleteOneNote(id);
    }

    const onUpdatedItemIsCompleted = (noteId: string, itemId: string) => {
      dataStore.updateOneNote(noteId, itemId);
    }

    return (
      <>
        <Link href="/add-note">
          <a>Add note</a>
        </Link>
        <main className={styles.container}>
          {dataStore.notes ? <ListNote
            notes={dataStore.notes}
            onDeleteNote={deleteNoteHandler}
            updateItemIsCompleted={onUpdatedItemIsCompleted}
          /> : 'Loading...'}
        </main>
      </>
    );
  })
);
export default IndexPage;