import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./css/styles.css";

console.log("index.js is loaded");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
