import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const api_base_url = "https://sheets.googleapis.com";
const spreadsheet_id = "1GFo7S0OJUK92RX4D-_0enm7umfCWVYT3TKrtb4YNUI4";
const API_KEY = process.env.REACT_APP_API_KEY;

function getSpreadsheet(eventId, useAverage) {
    const range = `${eventId}!${useAverage==="0"?"A1:E100":"F1:J100"}`;
    const promise = fetch(`${api_base_url}/v4/spreadsheets/${spreadsheet_id}/values/${range}?key=${API_KEY}`);
    return promise;
}

function TableHeader() {
    return (
        <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>State</th>
                </tr>
        </thead>
    );
}

function TableBody() {
    const [rows, setRows] = useState([]);
    let params = useParams();

    useEffect(() => {
        let eventId = params.event;
        let useAverage = params.average;
        if (!eventId) {
            eventId = "333";
        }
        if (!useAverage || eventId === "333mbf") {
            useAverage= "0";
        }
        getSpreadsheet(eventId, useAverage)
        .then((res) => res.json())
        .then((json) => json.values)
        .then((ranks) => {
            setRows(ranks.map((row, index) => {
                return (
                    <tr key={index}>
                        <td>{row[0]}</td>
                        <td>
                            <a href={row[4]} target="_blank" rel="noreferrer">{row[1]}</a>
                        </td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                    </tr>
                );
            }));
        }).catch((error) => { console.log(error); });
    }, [params.event, params.average]);

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function Table() {
    return (
        <table>
            <TableHeader />
            <TableBody/>
        </table>
    );
}

export default Table;