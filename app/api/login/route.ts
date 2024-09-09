import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Login API
// const { getMemberByWhatsapp } = require('../../../lib/googleSheet');
// const { sendOTP } = require('../../../lib/whatsappApi');

export async function POST(req: Request) {
  // if (req.method !== 'POST') {
  //   res.status(405).end();
  //   return;
  // }

  const id = await req.json()
  // console.log(memberId)
  // const member = await getMemberByWhatsapp(memberId);
  if (!id) {
    return new Response("Member not found", {
      status: 404,
    })
  }

  console.log(id)

  // const otp = Math.floor(1000 + Math.random() * 9000).toString();
  // await sendOTP(member[7], otp);

  // Save OTP in session or database for verification later
  // Here we simply use session for demo purposes
  // req.session.otp = otp;
  // req.session.memberId = member[1];

  return Response.json({ id })

  // res.status(200).json({ message: 'OTP sent' });
}

