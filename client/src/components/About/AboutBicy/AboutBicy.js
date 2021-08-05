import "./AboutBicy.css";
import React from "react";
import a from "../../../images/back4.jpg";

function AboutBicy() {
    return (
        <div
            className="image"
            style={{
                backgroundImage: `url(${a})`,
            }}
        >
            <div className="divtoaboutbicy">
                <h1 className="hederaboutbicy">מי אנחנו?</h1>
                <p className="ptoaboutbicy">
                    bicycool היא חברה שהחלה את פעילותה בישראל לפני קרוב לעשור.
                    מאז היא גדלה והתפתחה עד שנהפכה לחברה הגדולה בארץ למפגשי
                    רכיבה על אופניים! הרעיון החדשני, שלא היה מוכר עד שהגיעה
                    bicycool היכה גלים והפך להצלחה מסחררת. ששואלים את אלפי
                    הרוכבים שלנו, למה דווקא bicycool? הם מציינים סיבות רבות
                    שבראשם כמובן המסלולים המהנים והמותאמים שלנו, המדריכים
                    המנוסים, חווית הרכיבה שמכפילה את עצמה עם bicycool, האתר הנח
                    שלנו שמאפשר הצטרפות למפגש בקלות ובכיף וסיבות רבות נוספות.
                    אנו ממליצים לכם להצטרף אלינו גם ומאחלים חווית רכיבה נעימה!!!
                </p>
            </div>
        </div>
    );
}
export default AboutBicy;
