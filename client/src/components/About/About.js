import "./About.css";
import React from "react";
import a from "../../images/back3.png";
import { Link } from "react-router-dom";

function About() {
    return (
        <div
            className="image"
            style={{
                backgroundImage: `url(${a})`,
            }}
        >
            <div className="alllinka">
                <Link className="linkabout" to="./aboutBicy">
                    מי אנחנו
                </Link>
                <Link className="linkabout" to="./guides1">
                    המדריכים שלנו
                </Link>
                <Link className="linkabout" to="./questions">
                    שאלות נפוצות
                </Link>
                <Link className="linkabout" to="./respond">
                    תגובות והמלצות
                </Link>
                <Link className="linkabout" to="./howWork">
                    איך זה עובד?
                </Link>
            </div>
        </div>
    );
}

export default About;
