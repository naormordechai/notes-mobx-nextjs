import nextConnect from 'next-connect';
import middleware from '../database';
import { NextApiRequest, NextApiResponse } from 'next';
import { INote } from '../../../interfaces/note';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const note: INote = req.body;
        note.createdDate = new Date();
        const addedNote = await (req as any).db.collection('notes').insertOne(note);
        const result = addedNote.ops[0];
        res.status(201).json(result);
    } catch (err) {
        res.status(201).json(false);
    }
});


export default handler;