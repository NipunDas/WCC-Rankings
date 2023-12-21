import React, { useState } from "react";
import RankingTable from "./Table.js";
import { useParams, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
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

function getEventName(eventId) {
    switch(eventId) {
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
            return "3x3 blindfolded";
        case "333fm":
            return "3x3 fewest moves";
        case "333oh":
            return "3x3 one-handed";
        case "clock":
            return "clock";
        case "minx":
            return "megaminx";
        case "pyram":
            return "pyraminx";
        case "skewb":
            return "skewb";
        case "sq1":
            return "square-1"
        case "444bf":
            return "4x4 blindfolded";
        case "555bf":
            return "5x5 blindfolded";
        case "333mbf":
            return "3x3 multiple blindfolded";
        default:
            return "unknown";
    }
}

function Rankings() {
    let params = useParams();
    const navigate = useNavigate();
    const [useAverage, setUseAverage] = useState(params.average);
    const [event, setEvent] = useState(params.event);

    const handleEventChange = (newEvent) => {
        setEvent(newEvent);
        if (newEvent === "333mbf") {
            setUseAverage("0");
            navigate("/rankings/333mbf/0");
        } else {
            navigate("/rankings/".concat(newEvent).concat("/").concat(useAverage));
        }
    };

    const handleAverageChange = (newAverage) => {
        setUseAverage(newAverage);
        navigate("/rankings/".concat(event).concat("/").concat(newAverage));
    };

    function getEventButton(eventId) {
        return (
            <ToggleButton
                id={`tbg-btn-${eventId}`}
                value={eventId}
                variant="outline-secondary"
                className="me-1"
                data-tooltip-id={`${eventId}-tooltip`}
                data-tooltip-content={getEventName(eventId)}
                data-tooltip-place="top"
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
            {events.map((event) => <Tooltip id={`${event}-tooltip`}></Tooltip>)}
            <Row className="mb-3">
                <Col>
                    <ToggleButtonGroup
                        type="radio"
                        name="eventToggle"
                        onChange={handleEventChange}
                        value={event}
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
                        value={useAverage}
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
                            disabled={event === "333mbf"}
                        >
                            Average
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <RankingTable event={event} useAverage={useAverage} />
        </Container>
    );
}

export default Rankings;
