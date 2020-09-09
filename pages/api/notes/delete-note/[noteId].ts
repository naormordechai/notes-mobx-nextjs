import nextConnect from 'next-connect';
import middleware from '../../database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const noteId = req.query.noteId as string;
        await (req as any).db.collection('notes').remove({ _id: new ObjectId(noteId) })
        res.status(200).json(true);
    } catch (err) {
        res.status(201).json(false);
    }
});


export default handler;