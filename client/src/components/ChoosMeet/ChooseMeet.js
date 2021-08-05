import React, { useEffect } from "react";
import "./ChooseMeet.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillSignal, AiOutlineClockCircle } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { GiBilledCap } from "react-icons/gi";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Meets from "../Meets/Meets";

function ChooseMeet(props) {
    const { user, setUser } = props;
    const [modalShow2, setModalShow2] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [level, setLevel] = useState("");
    const [area, setArea] = useState("");
    const [meetsList, setMeetsList] = useState([]);
    let history = useHistory();

    useEffect(async () => {

        let response = await fetch("http://localhost:27017/meets/chooseAllMeet", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        let response2 = await response.json();
        if (response.status === 200) {
            setMeetsList(response2);
        }
    }, []);

    function onInputChangeLevel(l, event) {
        setLevel(event.target.value);
    }

    function onInputChangeArea(a, event) {
        setArea(event.target.value);
    }

    async function reset() {
        setLevel("");
        setArea("");
        let response = await fetch("http://localhost:27017/meets/chooseAllMeet", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        let response2 = await response.json();
        if (response.status === 200) {
            setMeetsList(response2);
        }
    }

    useEffect(() => {

        setMeetsList(
            meetsList.filter((meet) => {
                return meet.level.includes(level) && meet.area.includes(area);
            })
        );
    }, [area, level]);


    const [meet, setmeet] = React.useState(0);
    const [message, setMessage] = useState("");

    const addMeet = async () => {
        let response = await fetch("http://localhost:27017/meets/joinMeet", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ idMeets: meet._id, idUser: user.id })
        });

        if (response.status !== 200) {
            setModalShow(false);
            let resonse2=await response.text();
            setMessage(resonse2);
            setModalShow2(true);
        }
        else {
            let user2 = { ...user };
            user2.meets.push(meet._id);
            setUser(user2);
            history.push("/messageBicycleRider1");
        }
    };

    return (
        <>
            <div className="meetall">
                <form className="filter-div">
                    <div>
                        <div
                            className="level-div"
                            onChange={(e) => onInputChangeLevel("level", e)}
                        >
                            <p className="choose-header1">בחר רמת קושי:</p>
                            <div className="divtypechoose1">
                                <div className="div-choose-type">
                                    <input
                                        className="typelevelchooseMeet"
                                        type="radio"
                                        name="level"
                                        value="קל"
                                    />
                                    <p className="typeMeet">קל</p>
                                </div>
                                <div className="div-choose-type">
                                    <input
                                        className="typelevelchooseMeet"
                                        type="radio"
                                        name="level"
                                        value="בינוני"
                                    />
                                    <p className="typeMeet">בינוני</p>
                                </div>
                                <div className="div-choose-type">
                                    <input
                                        type="radio"
                                        name="level"
                                        value="קשה"
                                    />
                                    <p className="typeMeet">קשה</p>
                                </div>
                                <div className="div-choose-type">
                                    <input
                                        type="radio"
                                        name="level"
                                        value="אתגרי"
                                    />
                                    <p className="typeMeet">אתגרי</p>
                                </div>
                            </div>
                        </div>

                        <div onChange={(e) => onInputChangeArea("area", e)}>
                            <div className="area-div">
                                <p className="choose-header1">בחר אזור:</p>
                                <div className="divtypechoose">
                                    <div className="div-choose-type">
                                        <input
                                            type="radio"
                                            name="area"
                                            value="צפון"
                                        />
                                        <p className="typeMeet">צפון</p>
                                    </div>
                                    <div className="div-choose-type">
                                        <input
                                            type="radio"
                                            name="area"
                                            value="דרום"
                                        />
                                        <p className="typeMeet">דרום</p>
                                    </div>
                                    <div className="div-choose-type">
                                        <input
                                            type="radio"
                                            name="area"
                                            value="מרכז"
                                        />
                                        <p className="typeMeet">מרכז</p>
                                    </div>
                                    <div className="div-choose-type">
                                        <input
                                            type="radio"
                                            name="area"
                                            value="ירושלים"
                                        />
                                        <p className="typeMeet">ירושלים</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input
                        type="reset"
                        className="button-reset"
                        onClick={async()=>{await reset()}}
                        value="אפס נתונים"
                    />
                </form>

                <div className="meets-div">
                    <h1 className="hed">בחר מפגש</h1>
                    <h3 className="hed2">ניתן לבחור עד מפגש אחד ליום</h3>
                    <h3 className="hed2">אורך כל מפגש כ-3 שעות</h3>
                    {Meets &&
                        meetsList?.map((i) => {
                            return (
                                <div className="con1">
                                    <img
                                        className="bicy"
                                        src={i.src}
                                        alt=""
                                    ></img>
                                    <p className="pdd">{i.namemeet}</p>
                                    <p className="pd">
                                        <GiBilledCap /> {i.name}
                                    </p>
                                    <p className="pd">
                                        <MdDateRange /> {i.date}
                                    </p>
                                    <p className="pd">
                                        <AiOutlineClockCircle /> {i.time}
                                    </p>
                                    <p className="pd">
                                        <AiFillSignal /> {i.level}
                                    </p>
                                    <p className="pddd">
                                        <FiMapPin /> {i.area}
                                    </p>

                                    <Link
                                        className="btn-pri2"
                                        to={{
                                            pathname: `/aboutMeet`,
                                            state: { idmeet: i._id },
                                        }}
                                    >
                                        ‏ פרטים נוספים
                                    </Link>
                                    <br></br>
                                    {user?.role === "BicycleRider" && (
                                        <button
                                            className="btn-pri1"
                                            onClick={() => {
                                                setModalShow(true);
                                                setmeet(i);
                                            }}
                                        >
                                            אני רוצה להצטרף
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    <Modal
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                        size="lg"
                        aria-labelledby="contained-modal"
                        centered
                    >
                        <button
                            className="btn-primary1"
                            onClick={() => setModalShow1(false)}
                        >
                            סגור
                        </button>
                    </Modal>

                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="lg"
                        aria-labelledby="contained-modal"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal"></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h2>אתה בטוח שברצונך להצטרף אלינו?</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                className="btn-primary3"
                                onClick={() => {
                                    addMeet();
                                }}
                            >
                                כן!
                            </button>

                            <button
                                className="btn-primary4"
                                onClick={() => setModalShow(false)}
                            >
                                מתלבט עדיין
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={modalShow2}
                        onHide={() => setModalShow2(false)}
                        size="lg"
                        aria-labelledby="contained-modal"
                        centered
                    >
                        <button
                            className="btn-primary1"
                            onClick={() => setModalShow2(false)}
                        >
                            {message}
                            <p className="same-date-mes2"> נסה מפגש אחר!</p>
                        </button>
                    </Modal>
                </div>
            </div>
        </>
    );
}
export default ChooseMeet;
