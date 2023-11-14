import React from "react";
import MyApp from "./MyApp.js";
import ReactDOMClient from "react-dom/client";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// Creating the container
const container = document.getElementById("root");

// Creating a root
const root = ReactDOMClient.createRoot(container);

// Initial render: rendering an element to the root
root.render(<MyApp />);