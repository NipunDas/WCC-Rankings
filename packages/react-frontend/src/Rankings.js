import React from "react";
import RankingTable from "./Table.js";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "@cubing/icons";

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

function Rankings() {
    let params = useParams();
    const navigate = useNavigate();
    const useAverage = params.average || "0";
    const event = params.event || "333";

    const handleEventChange = (val) => {
        navigate("/rankings/".concat(val).concat("/").concat(useAverage));
    };

    const handleAverageChange = (val) => {
        navigate("/rankings/".concat(event).concat("/").concat(val));
    };

    function getEventButton(eventId) {
        return (
            <ToggleButton
                id={`tbg-btn-${eventId}`}
                value={eventId}
                variant="outline-secondary"
                className="me-1"
            >
                <i className={"cubing-icon event-".concat(eventId)}></i>
            </ToggleButton>
        );
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <h1 style={{ textAlign: "center" }}>
                    West Coast Cubing Rankings
                </h1>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ToggleButtonGroup
                        type="radio"
                        name="eventToggle"
                        onChange={handleEventChange}
                        defaultValue={event}
                    >
                        {events.map((event) => getEventButton(event))}
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ToggleButtonGroup
                        type="radio"
                        name="useAverageToggle"
                        onChange={handleAverageChange}
                        defaultValue={useAverage}
                    >
                        <ToggleButton
                            id="tbg-btn-0"
                            value={"0"}
                            variant="outline-primary"
                        >
                            Single
                        </ToggleButton>
                        <ToggleButton
                            id="tbg-btn-1"
                            value={"1"}
                            variant="outline-primary"
                        >
                            Average
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <RankingTable />
        </Container>
    );
}

export default Rankings;
