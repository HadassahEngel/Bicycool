import "./LoginStart.css";
import React from "react";

import { Link } from "react-router-dom";

function LoginStart() {
    return (
        <div>
            ‏
            <div className="container">
                <h1 className="loginsh1">נצא לדרך?</h1>

                <Link
                    to="/loginGuide"
                    className="guide"
                    style={{ textDecoration: "none" }}
                >
                    מדריך
                </Link>
                <Link
                    to="/loginBicycleRider"
                    className="bicycle_rider"
                    style={{ textDecoration: "none" }}
                >
                    רוכב
                </Link>
            </div>
        </div>
    );
}
export default LoginStart;
