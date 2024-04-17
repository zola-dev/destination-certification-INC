import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { cors } from '../../middleware/cors';
dotenv.config({ path: '../../../../.env' });
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req,res);
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log("login: ",body);
      const ToDos = await prisma.toDo.findMany();
      if(body.authKey){
      const user = await prisma.user.findUnique({
        where: {
          queryAuth: body.authKey,
        },
        select: {
          userId: true,
          userName: true,
          email:true,
          profileImg:true,
          role:true,
        },
      });
        const response = {
          users:{
          userId:user?.userId,
          userName:user?.userName,
          email:user?.email,
          profileImg:user?.profileImg,
          role:user?.role
          },
          toDo:ToDos,
          message:{txt:`Welcome back ${user?.userName}!`,profileImg:user?.profileImg},
          token:'',
        };
        let token=jwt.sign(response, process.env.ACCESS_TOKEN || '', {
          expiresIn: '2min',
        });
        response.token=token;
        res.status(200).json(response);
      }else{
            ///logic for login with credentials
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: `Method should be POST, and not ${req.method}` });
  }
}