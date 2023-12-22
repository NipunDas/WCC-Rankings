import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Rankings from "./Rankings.js";
import Records from "./Records.js";

function MyApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to={"/rankings/333/0"} />}
                />
                <Route
                    path="/rankings"
                    element={<Navigate replace to={"/rankings/333/0"} />}
                />
                <Route
                    path="/rankings/:event/:average"
                    element={<Rankings />}
                />
                <Route path="/records" element={<Records />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyApp;
