import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./animations.css";
import "./responsive.css";
import "./theme.css";   // ← dark / light mode theme system

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
    );