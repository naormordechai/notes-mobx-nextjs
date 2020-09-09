import { IItem } from './item';

export interface INote {
    _id: string;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    items: IItem[];
}