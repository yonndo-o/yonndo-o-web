import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyJWT } from '@/lib/server/jwt';

const SECRET = process.env.JWT_SECRET!;
const SALT = process.env.JWT_SALT!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ valid: false });

  const decoded = verifyJWT(token, SECRET, SALT);
  if (!decoded) return res.status(401).json({ valid: false });

  return res.status(200).json({ valid: true, role: (decoded as any).role });
}
