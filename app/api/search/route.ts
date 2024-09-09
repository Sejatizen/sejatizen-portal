// Search API
// import { NextApiRequest, NextApiResponse } from 'next';
// import  { getMemberByPhone } from '../../../lib/googleSheet';

export async function POST(req: Request, res: Response) {
  // try {
  //   const { searchParams } = new URL(req.url as string);
  //   const phone = searchParams.get('phone');

  //   if (!phone) {
  //     return res.status(400).json({ error: 'Phone number is required' });
  //   }

  //   const member = await getMemberByPhone(phone);

  //   if (!member) {
  //     return res.status(404).json({ error: 'Member not found' });
  //   }

  //   return res.status(200).json({ memberId: member[1] });
  // } catch (error) {
  //   console.error('Search Error:', error);
  //   return res.status(500).json({ error: 'Internal server error' });
  // }

  const phone = await req.json()

  if (!phone) {
    return new Response("Member not found", {
      status: 404,
    })
  }

  console.log(phone)

  return Response.json({ phone })

}

// export const methods = {
//   GET,
// };

