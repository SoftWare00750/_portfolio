import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "./animations.css";
import "./responsive.css";
import "./mobile-nav.css";  // CRITICAL: This must load LAST

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
    );