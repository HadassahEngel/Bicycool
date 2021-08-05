import React from "react";
import "./CreateMeet.css";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
    validationNameMeet,
    validationDate,
    validationTime,
    validationAbout,
    validationWay,
    validationMap,
    validationCreateMeet,
} from "../../Validation/Valid";
export default withRouter(function NewUser(props) {
    let user = JSON.parse(localStorage.getItem("user"));
    const { history } = props;
    const [status, setStatus] = useState(false);
    const [value, setValue] = useState({
        namemeet: "",
        name: (user ? user.name: ""),
        idguide: (user? user.id: ""),
        date: "",
        time: "",
        map: "",
        src: "",
        level: "קל",
        area: "צפון",
        about: "",
        way: ""
    });
    const [errors, setErrors] = useState({
        namemeet: "",
        date: "",
        time: "",
        map: "",
        about: "",
        way: "",
    });
    const minDate = new Date().toISOString().split("T")[0];

    function onInputChange(field, event) {
        setValue({ ...value, [field]: event.target.value });
    }

    const addMeet = async (meetDetails) => {
        await fetch("http://localhost:27017/meets/createMeet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },  body: JSON.stringify(meetDetails)
        });
        
    };

    const addMeetToGuide = async (meetDetails) => {
        await fetch("http://localhost:27017/guides/addMeet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },  body: JSON.stringify({id:user.id,time:meetDetails.time, namemeet:meetDetails.namemeet})
        });
        
    };


    async function validate() {
        errors.namemeet = validationNameMeet(value.namemeet);
        errors.date = validationDate(value.date);
        errors.time = validationTime(value.time);
        errors.map = validationMap(value.map);
        errors.about = validationAbout(value.about);
        errors.way = validationWay(value.way);
        errors.createmeet = validationCreateMeet(
            value.date,
            value.time,
            value.namemeet,
            user.id
        );

        setErrors({ ...errors, errors: errors });
        if (
            errors.namemeet === null &&
            errors.date === null &&
            errors.time === null &&
            errors.map === null &&
            errors.about === null &&
            errors.way === null &&
            errors.createmeet === null
        ) {
            await addMeet(value);
            await addMeetToGuide(value);
            history.push("/messageGuide");
            setStatus(true);
        }
    }

    return (
        <div>
            <h1 className="tologinh1">הודעה</h1>
            <div className="container8">
                <form onSubmit={async()=>{await validate()}}>
                    <p className="p_haeder3">נא הזן את פרטי המפגש:</p>

                    <p className="addimgp">
                        הוסף את תמונת המסלול: (תמונה בגודל של עד 3MB)
                    </p>
                    <input
                        className="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            let reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = () => {
                                setValue({ ...value, src: reader.result });
                            };
                        }}
                    ></input>

                    <label>
                        <input
                            type="text"
                            name="text"
                            className="namemeet"
                            placeholder={"שם המסלול"}
                            onChange={(e) => onInputChange("namemeet", e)}
                        ></input>
                        <div className="errors">{errors.namemeet}</div>
                        <p></p>
                    </label>

                    <label className="choose-header">בחר תאריך:</label>

                    <input
                        type="date"
                        className="date"
                        min={minDate}
                        onChange={(e) => onInputChange("date", e)}
                    ></input>
                    <div className="errors" id="date">
                        {errors.date}
                    </div>

                    <label htmlFor="time" className="choose-header">
                        בחר שעה:
                    </label>
                    <input
                        type="time"
                        name="time"
                        className="time"
                        placeholder={"שעה"}
                        min="09:00"
                        max="18:00"
                        required
                        onChange={(e) => onInputChange("time", e)}
                    ></input>
                    <div className="errors">{errors.time}</div>
                    <p></p>

                    <div onChange={(e) => onInputChange("level", e)}>
                        <div className="level-div">
                            <p className="choose-header">בחר רמת קושי:</p>
                            <div className="divtypechoose1">
                                <input
                                    className="typelevelchoose"
                                    type="radio"
                                    name="level"
                                    value="קל"
                                    defaultChecked
                                />
                                <p className="typelevel">קל</p>
                                <input
                                    className="typelevelchoose"
                                    type="radio"
                                    name="level"
                                    value="בינוני"
                                />
                                <p className="typelevel">בינוני</p>
                                <input type="radio" name="level" value="קשה" />
                                <p className="typelevel">קשה</p>
                                <input
                                    type="radio"
                                    name="level"
                                    value="אתגרי"
                                />
                                <p className="typelevel">אתגרי</p>
                            </div>
                            ‏
                        </div>
                    </div>

                    <div onChange={(e) => onInputChange("area", e)}>
                        <div className="area-div">
                            <p className="choose-header">בחר אזור:</p>
                            <div className="divtypechoose">
                                <input
                                    type="radio"
                                    name="area"
                                    value="צפון"
                                    defaultChecked
                                />
                                <p className="typearea">צפון</p>
                                <input type="radio" name="area" value="דרום" />
                                <p className="typearea">דרום</p>
                                <input type="radio" name="area" value="מרכז" />
                                <p className="typearea">מרכז</p>
                                <input
                                    type="radio"
                                    name="area"
                                    value="ירושלים"
                                />
                                <p className="typearea">ירושלים</p>
                            </div>
                        </div>
                    </div>

                    <input
                        type="text"
                        name="text"
                        className="map"
                        placeholder={"קישור למפת המסלול"}
                        onChange={(e) => onInputChange("map", e)}
                    ></input>
                    <div className="errors">{errors.map}</div>

                    <textarea
                        type="text"
                        name="text"
                        className="about"
                        placeholder={" אודות המסלול"}
                        onChange={(e) => onInputChange("about", e)}
                    ></textarea>
                    <div className="errors">{errors.about}</div>

                    <textarea
                        type="text"
                        name="text"
                        className="way"
                        placeholder={" הוראות הגעה למסלול"}
                        onChange={(e) => onInputChange("way", e)}
                    ></textarea>
                    <div className="errors">{errors.way}</div>

                    <div className="errors">{errors.createmeet}</div>
                    {console.log(errors.createmeet)}
                </form>
                <button className="sumbit" onClick={async()=>{await validate()}} type="submit">
                    צור מפגש
                </button>
                {!status && (
                    <p className="messege_error1">יש להזין את כל השדות</p>
                )}
                {status && (
                    <p className="messege_good">
                        ברוכים הבאים {value.name}! פרטיך עודכנו בהצלחה
                    </p>
                )}
            </div>
            //{" "}
        </div>
    );
});
