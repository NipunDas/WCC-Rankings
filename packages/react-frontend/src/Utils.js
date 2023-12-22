const API_URL = "https://sheets.googleapis.com";
const SPREADSHEET_ID = "1GFo7S0OJUK92RX4D-_0enm7umfCWVYT3TKrtb4YNUI4";
const API_KEY = process.env.REACT_APP_API_KEY;

function getSpreadsheet(range) {
    const promise = fetch(
        `${API_URL}/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`
    );
    return promise;
}

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

function getEventName(eventId) {
    switch (eventId) {
        case "333":
            return "3x3";
        case "222":
            return "2x2";
        case "444":
            return "4x4";
        case "555":
            return "5x5";
        case "666":
            return "6x6";
        case "777":
            return "7x7";
        case "333bf":
            return "3x3 Blindfolded";
        case "333fm":
            return "3x3 Fewest Moves";
        case "333oh":
            return "3x3 One-Handed";
        case "clock":
            return "Clock";
        case "minx":
            return "Megaminx";
        case "pyram":
            return "Pyraminx";
        case "skewb":
            return "Skewb";
        case "sq1":
            return "Square-1";
        case "444bf":
            return "4x4 Blindfolded";
        case "555bf":
            return "5x5 Blindfolded";
        case "333mbf":
            return "3x3 Multiple-Blindfolded";
        default:
            return "unknown";
    }
}

const exports = {
    getSpreadsheet,
    events,
    getEventName
};

export default exports;
