import axios, { AxiosResponse } from 'axios';
import { INote } from '../interfaces/note';
import { IAddNote } from '../interfaces/add-note';

export const loadNotes = async () => {
    const result: AxiosResponse = await axios.get('http://localhost:3000/api/notes');
    return result.data;
}

export const updateNote = async (data: any) => {
    return await axios.post('http://localhost:3000/api/notes/update-note', data);
}

export const addNote = async (note: IAddNote) => {
    return await axios.post('http://localhost:3000/api/notes/add-note', note);
};

export const deleteNote = async (noteId: string) => {
    return await axios.delete(`http://localhost:3000/api/notes/delete-note/${noteId}`);
};