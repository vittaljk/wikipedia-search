import { NextApiRequest, NextApiResponse } from 'next';
import Axios from 'axios';

const BASE_URL =
  'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&formatversion=2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query, limit = 100, offset = 0 } = req.query;

  try {
    const response = await Axios.get(
      `${BASE_URL}&srsearch=${query}&srlimit=${limit}&sroffset=${offset}`,
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
}
