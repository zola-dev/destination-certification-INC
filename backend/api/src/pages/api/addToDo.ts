import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../../middleware/cors';
import  auth  from '../../middleware/auth';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse,  next: NextApiHandler) {
  await cors(req,res);
  let token=auth(req, res, next); 
  console.log("token: ",token);
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log("addToDO: ",body);
      const updatedToDo = await prisma.toDo.create({
          data: {
            name: body.name,
            completed: body.completed,
          },
      });
        res.status(200).json({message:`{id:${updatedToDo.id}\nname:${body.name}}\ncompleted:${body.completed}`,insertId:updatedToDo.id });   
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }  else if (req.method === 'GET') {
    const allToDos = await prisma.toDo.findMany();
    res.status(200).json(allToDos);
  }
  else {
    res.status(405).json({ error: `Method should be POST, and not ${req.method}` });
  }
}