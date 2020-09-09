import nextConnect from 'next-connect';
import middleware from '../../database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { INote } from '../../../../interfaces/note';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const note = req.body;
        note._id = new ObjectId(note._id)
        await (req as any).db.collection('notes').update({ _id: note._id }, { $set: { ...note, updatedDate: new Date() } })
        res.status(200).json(true);
    } catch (err) {
        console.log(err);
        res.status(201).json(false);
    }
});


export default handler;