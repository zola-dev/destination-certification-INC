import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env' });
export default function auth(req: NextApiRequest, res: NextApiResponse,  next: NextApiHandler)  {  
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
if (!token) {
    res.status(401).json({ message: "You are unauthorized to access this page from Next.js" });
    return false;
}
jwt.verify(token, process.env.ACCESS_TOKEN || '', (err, decodedToken) => {
    if (err) {
        res.status(401).json({ message: "JWT verification failed" });
    } else {
        console.log("pass Token:");
    }
});        
}
