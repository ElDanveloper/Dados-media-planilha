const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SPREADSHEET_ID = '1lqkkuYp0MSA2gdeXvTkSh-W5Z6DmBZFdv6Cxu0CIfNg'; // Replace with your actual spreadsheet ID

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
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

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
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

async function calculateSituationAndWriteResults(auth) {
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'engenharia_de_software!A4:H27', // excel columns
    });

    const rows = res.data.values;

    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }

    const updatedRows = [];

    rows.forEach((row) => {
        const [registration, student, absences, p1, p2, p3] = row.map((value, index) => (index === 1 ? value.toString() : Number(value)));
        const average = Math.round(((p1 + p2 + p3) / 3 )/ 10);
        let situation = '';
        let naf = 0;
      
        if (absences / 60 > 0.25) {
          situation = 'Reprovado por Falta';
        } else if (average < 5) {
          situation = 'Reprovado por Nota';
        } else if (average < 7) {
          situation = 'Exame Final';
          naf = (7 - average);
        } else {
          situation = 'Aprovado';
          naf = 0
        }
      
        const updatedRow = [situation, naf];
        updatedRows.push(updatedRow);
      
        console.log(`Student: ${student}, Situation: ${situation}, NAF: ${naf}`);
      });
      

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: 'engenharia_de_software!G4', // Adjust the range accordingly
      valueInputOption: 'RAW',
      resource: {
        values: updatedRows,
      },
    });

    console.log('Results written to the spreadsheet.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

authorize().then(calculateSituationAndWriteResults).catch(console.error);
