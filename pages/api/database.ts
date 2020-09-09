import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';


const client = new MongoClient('mongodb+srv://naor:naormor315@cluster0.v850o.mongodb.net/todos?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req:any, res:Response, next: Function) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('todos');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;