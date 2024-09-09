// pages/api/member/update.js
const { updateMember } = require('../../../lib/googleSheet');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  if (!req.session.authenticated) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const { memberId, name, region, phone } = req.body;
  const updatedMember = await updateMember(memberId, { name, region, phone });
  if (!updatedMember) {
    res.status(404).json({ error: 'Member not found' });
    return;
  }

  res.status(200).json({ member: updatedMember });
}

