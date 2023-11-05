import React, {useState, useEffect} from "react";
import api_id from "./config.js";
import Table from "./Table.js";

const api_base_url = "https://sheets.googleapis.com";
const spreadsheet_id = "1GFo7S0OJUK92RX4D-_0enm7umfCWVYT3TKrtb4YNUI4";
const range = "333!A1:D100";

function MyApp() {

    const [rankings, setRankings] = useState([]);

    function getSpreadsheet() {
        const promise = fetch(`${api_base_url}/v4/spreadsheets/${spreadsheet_id}/values/${range}?key=${api_id}`);
        return promise;
    }

    useEffect(() => {
        getSpreadsheet()
            .then((res) => res.json())
            .then((json) => { setRankings(json.values); })
            .catch((error) => { console.log(error); });
    }, []);

    return (
        <div className="container">
            <h1>West Coast Cubing Rankings</h1>
            <Table rankingData={rankings}/>
        </div>
    );
}

export default MyApp;