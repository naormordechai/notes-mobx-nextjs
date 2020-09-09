import nextConnect from 'next-connect';
import middleware from '../database';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const notes = await (req as any).db.collection('notes').find().toArray();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

export default handler;