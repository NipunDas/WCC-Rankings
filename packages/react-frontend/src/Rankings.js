import React from "react";
import Table from "./Table.js";
import {Link, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "@cubing/icons";

const events = ["333", "222", "444", "555", "666", "777", "333bf", "333fm",
    "333oh", "clock", "minx", "pyram", "skewb", "sq1", "444bf", "555bf", "333mbf"];


function Rankings() {
    let params = useParams();
    const useAverage = params.average;

    function getButton(eventId) {
        return (
            <Link to={"/rankings/".concat(eventId).concat("/").concat(useAverage)}>
                    <Button>
                        <i className={"cubing-icon event-".concat(eventId)}></i>
                    </Button>
            </Link>
        );
    }

    return (
        <div className="container">
            <h1>West Coast Cubing Rankings</h1>
            {
                events.map((event) => getButton(event))
            }
            <Table />
        </div>
    );
}

export default Rankings;