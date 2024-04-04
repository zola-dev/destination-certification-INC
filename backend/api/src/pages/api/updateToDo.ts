import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../../middleware/cors';
import  auth  from '../../middleware/auth';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse,  next: NextApiHandler) {
  await cors(req,res);
  auth(req, res, next); 
  if (req.method === 'PATCH') {
    try {
      const body = req.body;
      console.log("update: ",body);
      const ToDos = await prisma.toDo.update({
        where: {
          id: body.id,
        },
        data: {
          completed: body.update,
        },
      });
        res.status(200).json({message:`{id=${body.id}\nupdate=${body.update}}`});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: `Method should be PATCH, and not ${req.method}`});
  }
}