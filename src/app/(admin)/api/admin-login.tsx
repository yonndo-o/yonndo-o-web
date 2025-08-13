import type { NextApiRequest, NextApiResponse } from 'next';
import { createJWT } from '@/lib/server/jwt-core';

const SECRET = process.env.JWT_SECRET!;
const SALT = process.env.JWT_SALT!;
const ADMIN_ACCOUNT = process.env.ADMIN_ACCOUNT!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { account, password } = req.body;

  if (account === ADMIN_ACCOUNT && password === ADMIN_PASSWORD) {
    const token = createJWT({ role: 'admin' }, SECRET, SALT, 604800); // 7 days

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
}
