import React from "react";

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

function TableBody(props) {
    const rows = props.rankingData.map((row, index) => {
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
        }
    );

    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function Table(props) {
    return (
        <table>
            <TableHeader />
            <TableBody rankingData={props.rankingData}/>
        </table>
    );
}
export default Table;