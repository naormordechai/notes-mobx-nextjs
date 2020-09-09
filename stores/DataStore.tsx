import { observable, action } from "mobx";
import { useStaticRendering } from "mobx-react";
import { INote } from "../interfaces/note";
import { loadNotes, deleteNote, addNote, updateNote } from '../services/note-service';
import { IAddNote } from "../interfaces/add-note";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

export class DataStore {
    @observable notes: INote[] | undefined;

    @action
    async fetchData() {
        this.notes = await loadNotes();
    }

    @action
    async deleteOneNote(id: string) {
        try {
            const { data } = await deleteNote(id);
            if (data) {
                this.notes = this.notes!.filter(note => note._id !== id);
            }
        } catch (err) {
            console.log(err);
        }
    }

    @action
    async addOneNote(newNote: IAddNote) {
        try {
            const { data } = await addNote(newNote);
            this.notes!.push(data);
        } catch (err) {
            console.log(err);
        }
    }

    @action
    async updateOneNote(noteId: string, itemId: string) {
        try {
            const noteIndex = this.notes!.findIndex(n => n._id === noteId);
            const itemIndex = this.notes![noteIndex].items.findIndex(item => item._id === itemId)
            this.notes![noteIndex].items[itemIndex].isCompleted = !this.notes![noteIndex].items[itemIndex].isCompleted;
            await updateNote(this.notes![noteIndex]);
        } catch (err) {
            console.log(err);
        }
    }
}
