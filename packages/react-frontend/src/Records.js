import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Utils from "./Utils.js";

function Records() {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const range = "Records!A1:J17";

        Utils.getSpreadsheet(range)
            .then((res) => res.json())
            .then((json) => json.values)
            .then((values) => {
                setRecords(values);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function createRecordTable(event, i) {
        const tableEntries = [];

        // pushing single row
        tableEntries.push(
            <tr key={`${event}-0`}>
                <td>Single</td>
                <td>
                    <a href={records[i][4]} target="_blank" rel="noreferrer">
                        {records[i][1]}
                    </a>
                </td>
                <td>{records[i][2]}</td>
                <td>{records[i][3]}</td>
            </tr>
        );

        // pushing average row if it applies
        if (event !== "333mbf") {
            tableEntries.push(
                <tr key={`${event}-1`}>
                    <td>Average</td>
                    <td>
                        <a
                            href={records[i][9]}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {records[i][6]}
                        </a>
                    </td>
                    <td>{records[i][7]}</td>
                    <td>{records[i][8]}</td>
                </tr>
            );
        }

        return (
            <div key={event}>
                <h3>{Utils.getEventName(event)}</h3>
                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>Type</th>
                            <th style={{ width: "40%" }}>Name</th>
                            <th style={{ width: "20%" }}>Result</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>{tableEntries}</tbody>
                </Table>
            </div>
        );
    }

    if (records === null) {
        return <Spinner animation="border" variant="primary" />;
    } else {
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Link to="/rankings/333/0">
                            <Button variant="primary" className="float-end">
                                Rankings
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <h1 style={{ textAlign: "center" }}>
                        West Coast Cubing Records
                    </h1>
                </Row>
                {Utils.events.map((event, i) => createRecordTable(event, i))}
            </Container>
        );
    }
}

export default Records;
