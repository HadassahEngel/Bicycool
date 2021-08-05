import "./Home.css";
import React from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";

import { Link } from "react-router-dom";

function Home(props) {
    const {user}=props
    return (
        <div className="image" style={{ backgroundImage: "url('bicy.png')" }}>
            ‏
            <div className="containe">
                <div className="text">
                    <p className="texth">
                        אוהבים את התחושה, שהגוף מתמלא אדרנלין, הרוח מכה על הפנים
                        ואתם נהנים מנופים מרהיבים? כנראה שאתם נמנים על חובבי
                        רכיבת האופניים, שאוהבים לשלב את הספורט עם הטבע. זה הזמן
                        לשים את התרמיל על הגב, לוודא שיש בו גם פק"ל קפה ולצאת
                        לדרך---
                    </p>
                </div>

                {user === undefined && (
                    <Link
                        to="/LoginStart"
                        className="LoginStart"
                        style={{ textDecoration: "none" }}
                    >
                        קדימה, בואו נתחיל
                        <AiOutlineDoubleLeft />
                    </Link>
                )}

                {user !== undefined &&
                    user?.role === "BicycleRider" && (
                        <Link
                            to="/chooseMeet"
                            className="LoginStart"
                            style={{ textDecoration: "none" }}
                        >
                            קדימה, בואו נתחיל
                            <AiOutlineDoubleLeft />
                        </Link>
                    )}
                {user !== undefined  &&
                        user?.role === "Guide" && (
                            <Link
                                to="/createMeet"
                                className="LoginStart"
                                style={{ textDecoration: "none" }}
                            >
                                קדימה, בואו נתחיל
                                <AiOutlineDoubleLeft />
                            </Link>
                        )}
            </div>
        </div>
    );
}
export default Home;
