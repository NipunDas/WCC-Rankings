import React, { useState } from "react";
import RankingTable from "./RankingsTable.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Utils from "./Utils.js";
import "@cubing/icons";

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
            navigate(
                "/rankings/".concat(newEvent).concat("/").concat(useAverage)
            );
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
                key={`tbg-btn-${eventId}`}
                value={eventId}
                variant="outline-secondary"
                className="me-1"
                data-tooltip-id={`${eventId}-tooltip`}
                data-tooltip-content={Utils.getEventName(eventId)}
                data-tooltip-place="top"
            >
                <i className={"cubing-icon event-".concat(eventId)}></i>
            </ToggleButton>
        );
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <Link to="/records">
                        <Button variant="primary" className="float-end">
                            Records
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mb-3">
                <h1 style={{ textAlign: "center" }}>
                    West Coast Cubing Rankings
                </h1>
            </Row>
            {Utils.events.map((event) => (
                <Tooltip
                    id={`${event}-tooltip`}
                    key={`${event}-tooltip`}
                ></Tooltip>
            ))}
            <Row className="mb-3">
                <Col>
                    <ToggleButtonGroup
                        type="radio"
                        name="eventToggle"
                        onChange={handleEventChange}
                        value={event}
                    >
                        {Utils.events.map((event) => getEventButton(event))}
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
