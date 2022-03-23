import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    response.status(200).json({
      message: 'post',
    });
  }

  if (request.method === 'GET') {
    const data = [{
      title: 'New branch',
      date: new Date(),
      content: "You've created new branch fix-notifications from master",
    }];

    response.status(200).json(data);
  }
}
