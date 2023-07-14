import type { NextApiRequest, NextApiResponse } from 'next'
import { getRequestID } from '../../lib'


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestId = getRequestID();
  console.log(`${requestId}: /api/requestId called `)
  res.status(200).json({ requestId })
}
