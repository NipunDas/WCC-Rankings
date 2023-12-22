import { google } from "googleapis";
import path from "path";
import * as url from "url";
import { authenticate } from "@google-cloud/local-auth";
import webscraper from "./webscrape.js";

const spreadsheet_id = "1GFo7S0OJUK92RX4D-_0enm7umfCWVYT3TKrtb4YNUI4";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const sheets = google.sheets("v4");
await webscraper.openBrowser();

const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.keys.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

google.options({ auth });

const events = [
    "333",
    "222",
    "444",
    "555",
    "666",
    "777",
    "333bf",
    "333fm",
    "333oh",
    "clock",
    "minx",
    "pyram",
    "skewb",
    "sq1",
    "444bf",
    "555bf",
    "333mbf"
];

const singleRecords = [];
const averageRecords = [];

async function uploadEventRanks(eventId, useAverage) {
    const ranks = await webscraper.getRegionTop100(eventId, useAverage);

    // Updating the rankings page
    sheets.spreadsheets.values
        .batchUpdate({
            spreadsheetId: spreadsheet_id,
            requestBody: {
                valueInputOption: "RAW",
                data: [
                    {
                        range: `${eventId}!${
                            useAverage === "0" ? "A1:E" : "F1:J"
                        }${ranks.length}`,
                        majorDimension: "ROWS",
                        values: ranks
                    }
                ]
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });

    // Updating the records page
    if (useAverage === "0") {
        singleRecords.push(ranks[0]);
    } else {
        averageRecords.push(ranks[0]);
    }
}

function uploadRecords(useAverage) {
    sheets.spreadsheets.values
        .batchUpdate({
            spreadsheetId: spreadsheet_id,
            requestBody: {
                valueInputOption: "RAW",
                data: [
                    {
                        range: "Records!".concat(
                            useAverage === "0"
                                ? `A1:E${singleRecords.length}`
                                : `F1:J${averageRecords.length}`
                        ),
                        majorDimension: "ROWS",
                        values:
                            useAverage === "0" ? singleRecords : averageRecords
                    }
                ]
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

for (let i = 0; i < events.length; i++) {
    await uploadEventRanks(events[i], "0");

    if (events[i] != "333mbf") {
        await uploadEventRanks(events[i], "1");
    }
}

// Uploading records for both single and average
uploadRecords("0");
uploadRecords("1");

await webscraper.closeBrowser();
