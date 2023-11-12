import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Rankings from "./Rankings.js";

function MyApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rankings/:event?/:average?" element={<Rankings/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyApp;