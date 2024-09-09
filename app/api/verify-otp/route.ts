import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Verify OTP API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { otp } = req.body;

  if (req.session.otp === otp) {
    req.session.authenticated = true;
    res.status(200).json({ message: "Authenticated" });
  } else {
    res.status(401).json({ error: "Invalid OTP" });
  }
}
