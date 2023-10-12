import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";

function MyApp() {
    return (
        <div className="container">
            <h1>Hello, React!</h1>
        </div>
    );
}

// Creating the container
const container = document.getElementById("root");

// Creating a root
const root = ReactDOMClient.createRoot(container);

// Initial render: rendering an element to the root
root.render(<MyApp />);