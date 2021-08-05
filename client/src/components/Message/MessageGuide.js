import React from "react";
import "./Message.css";
import { Link } from "react-router-dom";
import a from "../../images/shop/b.png"

function MessageGuide() {
    return (
        <>
        <h1 className="tologinh1">הודעה</h1>
        <div className="abc" style={{ 
            backgroundImage: `url(${a})` 
          }}>
            
            <h2 className="mesghed">המפגש נוצר בהצלחה!</h2>
            <p className="p8">תודה לך!</p>
            <p className="p9">פרטי המפגש נשלחו למייל</p>
            
            <Link to="/" className="btn13">
                חזרה לדף הבית
            </Link>
            <Link to="/chooseMeet" className="btn11">
                לצפיה במפגשים
            </Link>
        </div>
        </>
    );
}
export default MessageGuide;
