import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ valid: false, message: 'Invalid URL' });
  }

  try {
    const response = await axios.head(url);
    const contentType = response.headers['content-type'];

    if (contentType && (contentType.includes('image/webp') || contentType.includes('image/png') || contentType.includes('image/gif'))) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(400).json({ valid: false, message: 'URL does not point to a valid image' });
    }
  } catch (error) {
    return res.status(400).json({ valid: false, message: 'URL does not point to a valid image' });
  }
}
