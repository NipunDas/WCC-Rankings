import React, {useState, useEffect} from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import api_id from "./config.js";

const base_url = "https://sheets.googleapis.com"
const spreadsheet_id = "1GFo7S0OJUK92RX4D-_0enm7umfCWVYT3TKrtb4YNUI4";

function MyApp() {

    const [rankings, setRankings] = useState("");

    function getSpreadsheet() {
        const promise = fetch(`${base_url}/v4/spreadsheets/${spreadsheet_id}/values/Sheet1!A1?key=${api_id}`);
        return promise;
    }

    function testPush() {

    }

    useEffect(() => {
        getSpreadsheet()
            .then((res) => res.json())
            .then((json) => {
                setRankings(json.values[0]);
            });
    }, []);

    return (
        <div className="container">
            <h1>{rankings}</h1>
            <button>Click Me!</button>
        </div>
    );
}

// Creating the container
const container = document.getElementById("root");

// Creating a root
const root = ReactDOMClient.createRoot(container);

// Initial render: rendering an element to the root
root.render(<MyApp />);