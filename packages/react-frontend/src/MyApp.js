import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Rankings from "./Rankings.js";

function MyApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route></Route>
                <Route path="/rankings/:event/:average" element={<Rankings/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default MyApp;