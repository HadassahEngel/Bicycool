import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./images/reportWebVitals";
import "./fonts/FbReformaNarrow-Bold.otf";
import "./fonts/FbReformaNarrow-Light.otf";
import "./fonts/FbReformaNarrow-Medium.otf";
import "./fonts/FbReformaNarrow-Regular.otf";
import "./fonts/Raleway-Regular.ttf";
import "./fonts/gadi-almog-regular-aaa.otf";
import "./fonts/VarelaRound-Regular.ttf"
import { BrowserRouter } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
