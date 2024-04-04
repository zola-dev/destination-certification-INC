import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../../middleware/cors';
import  auth  from '../../middleware/auth';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse,  next: NextApiHandler) {
  await cors(req,res);
  auth(req, res, next); 
  if (req.method === 'DELETE') {
    try {
      const body = req.body;
      console.log("delete: ",body);
      await prisma.toDo.delete({
        where: {
          id: body.id,
        }
      });
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Allow', 'DELETE'); 
        res.status(200).json({message:`{id=${body.id}`});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: `Method should be DELETE, and not ${req.method}`});
  }
}