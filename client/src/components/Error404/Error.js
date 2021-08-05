import React from "react";
import { Link } from "react-router-dom";
import a from "../../images/error-back.jpeg";
import "./Error.css"

function Error() {
    return (
        <div
            className="image"
            style={{
                backgroundImage: `url(${a})`,
            }}
        >
            <div className="error-all-p">
                <p className="error-p1">אופססס.... פנצ'ר</p>
                <p className="error-p3">הגעת לדף שאינו קיים</p>
                <Link className="error-link" to="/">חזרה לדף הבית</Link>{" "}
            </div>
        </div>
    );
}

export default Error;
