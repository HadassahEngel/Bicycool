import "./HowWork.css";
import React from "react";
function HowWork() {
    return (
        <>
            <div className="all-how-work">
                <p className="hed-work">אז מה קורה כאן באתר? איך הכל עובד?</p>
                <p>לאתר זה ניתן להרשם בשתי הצורות: מדריך או רוכב</p>
                <p>
                    כדי להרשם כמדריך יש צורך לעבור ראיון אישי במשרדינו ובעזרת
                    המספר רשיון אישי שמקבלים ניתן להרשם לאתר
                </p>
                <p>כדי להרשם כרוכב יש צורך רק בלהזין מספר פריטים, והופ- אתם בפנים!</p>
                <p>מדריכים יוצרים מפגשים, והרוכבים מצטרפים אליהם</p>
                <p>כל שאלה נוספת אפשר לשאול בצ'אט שלנו או בשאלות נוספות</p>
                <p className="p-last">בהנאה מרובה!!</p>
            </div>
        </>
    );
}
export default HowWork;