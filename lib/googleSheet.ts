
// GSheet API config
import fileSystem from 'fs'
import path from 'path';
import {authenticate} from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const fs = fileSystem.promises

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

console.log("Loading credentials...");

async function authorize() {
  console.log("Authorizing...");
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    console.log("Using saved credentials.");
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}



// Data System function
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const RANGE = 'SejatizenDB!A3:N';

async function getMemberId() {
  const auth = new GoogleAuth({
    scopes: SCOPES
  })

  const service = google.sheets({version: 'v4'}, auth)
  try {
    const res = await 
  } catch (error) {
    
  }
}

async function getMemberByPhone(phone) {
  const auth = await authorize();
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    return null;
  }

  return rows.find(row => row[7] === phone);
}

async function getMemberByWhatsapp(whatsapp) {
  const auth = await authorize();
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    return null;
  }

  return rows.find(row => row[7] === whatsapp);
}

async function updateMember(memberId, data) {
  const auth = await authorize();
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    return null;
  }

  const index = rows.findIndex(row => row[1] === memberId);
  if (index === -1) {
    return null;
  }

  const updatedRow = [
    rows[index][0],
    memberId,
    data.name || rows[index][2],
    ...rows[index].slice(3, 5),
    data.region || rows[index][5],
    data.phone || rows[index][6],
    ...rows[index].slice(7, 8)
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `SejatizenDB!A${index + 1}:N${index + 1}`,
    valueInputOption: 'RAW',
    resource: {
      values: [updatedRow],
    },
  });

  return updatedRow;
}

module.exports = {
  getMemberByPhone,
  getMemberByWhatsapp,
  updateMember,
};


