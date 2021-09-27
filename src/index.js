import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Router } from "./routes";
import "./assets/scss/main.scss";

ReactDOM.render(<Router />, document.getElementById("root"));

reportWebVitals();
