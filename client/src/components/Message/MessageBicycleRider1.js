import React from "react";
import "./Message.css";

import { Link } from "react-router-dom";
import a from "../../images/a.png";

function MessageGuide() {
    return (
        <>
            <h1 className="tologinh1">הודעה</h1>
            <div
                className="ab"
                style={{
                    backgroundImage: `url(${a})`,
                }}
            >
                <h2 className="mesbrhed">הצטרפת בהצלחה!</h2>
                <p className="p7">הנך צריך להצטייד ב:</p>
                <div className="divli">
                    <li> קסדה</li>
                    <li>פנס</li>
                    <li>כפפות רכיבה</li>
                    <li>מגיני מרפק</li>
                    <li>מגיני ברכיים</li>
                    <li>מחזירי אור</li>
                    <li>נעלי רכיבה</li>
                    <li>תיק מים עם לפחות 3 ליטר</li>
                </div>
                <Link to="/" className="btn12">
                    לדף הבית
                </Link>
                <Link to="/shop" className="btn11">
                    לחנות
                </Link>
            </div>
        </>
    );
}
export default MessageGuide;
