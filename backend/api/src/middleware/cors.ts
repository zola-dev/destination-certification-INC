import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse } from 'next';
 export async function cors(req: NextApiRequest, res: NextApiResponse) {
  try {
      await NextCors(req, res, {
      origin: "https://www.shebs-braids.area36000.com",
      methods: ["PUT", "GET", "POST", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["secretHeader", "authorization", "content-type", "Origin", "Accept", "API-Key"],
      maxAge: 86400,
      optionsSuccessStatus: 200,
    });
  } catch (error) {
    console.error('Error setting CORS headers:', error);
  }
}
