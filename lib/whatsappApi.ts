const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

// Ensure the auth data is stored in a persistent location
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: path.join(__dirname, '.wwebjs_auth')
  })
});

client.on('qr', (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

client.on('authenticated', (session: any) => {
  console.log('WhatsApp client is authenticated!', session);
});

client.on('auth_failure', (msg: any) => {
  console.error('Authentication failure', msg);
});

client.on('disconnected', (reason: any) => {
  console.log('WhatsApp client is disconnected!', reason);
  client.initialize(); // Reinitialize the client in case of disconnection
});

client.initialize();

async function sendOtp(whatsapp: any, otp: any) {
  const chatId = `${whatsapp}@c.us`;
  await client.sendMessage(chatId, `Your OTP code to login is: *${otp}* \nPlease do not share this code with anyone.`);
}

module.exports = { sendOtp };

