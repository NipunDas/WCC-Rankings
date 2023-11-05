import {google} from "googleapis";
import path from "path";
import * as url from "url";
import {authenticate} from "@google-cloud/local-auth";
import webscraper from "./webscrape.js";

const spreadsheet_id = "1GFo7S0OJUK92RX4D-_0enm7umfCWVYT3TKrtb4YNUI4";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const sheets = google.sheets('v4');

const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets'
    ]
});

google.options({auth});

const rankings = await webscraper.getRegionTop100("333", "0");

sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheet_id,
    range: "333!A1",
    valueInputOption: 'USER_ENTERED',
    requestBody: {
        values: rankings
    }
}).then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.log(error);
});

const rankings2 = await webscraper.getRegionTop100("333", "1");

sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheet_id,
    range: "333!E1",
    valueInputOption: 'USER_ENTERED',
    requestBody: {
        values: rankings2
    }
}).then((res) => {
    console.log(res.data);
}).catch((error) => {
    console.log(error);
});

await webscraper.closeBrowser();