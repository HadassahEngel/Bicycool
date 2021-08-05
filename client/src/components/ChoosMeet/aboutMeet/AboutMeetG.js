import "./aboutMeet.css";
import Way from "./Way";
import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Map from "./Map";
import Description from "./Description";
import WhoWith from "./WhoWith";
import { BsArrowRight } from "react-icons/bs";

function AboutMeetG() {
    const location = useLocation();
    const idmeet = location.state.idmeet;
    const [eventKey, setEventKey] = React.useState("about");
    const [meet, setMeet] = useState({})
    
    useEffect(async() => {
        let response = await fetch("http://localhost:27017/meets/getMeet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({idMeet:idmeet,projection:{_id:1,about:1,map:1,way:1}})
        });

        let meet = await response.json();
        if (response.status === 200) {
            setMeet(meet)
        }
    }, [])

    return (
        <>
            <h1 className="toaddh1">הודעה</h1>
            <div className="aboutmeetall">
                <div className="return-to-meet-arrow-div">
                    <Link to="/meets" className="return-to-meet-arrow">
                        <BsArrowRight />
                        חזרה למפגשים שלך
                    </Link>
                </div>
                <Nav
                    variant="tabs"
                    defaultActiveKey="about"
                    className="navmodal"
                    onSelect={(eventKey) => setEventKey(eventKey)}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="about" className="nalinkm1">
                            אודות המסלול
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="how" className="nalinkm">
                            איך מגיעים?
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="maps" className="nalinkm">
                            מפת המסלול
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="whoWith" className="nalinkm">
                            מי איתנו?
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {eventKey === "about" && <Description description={meet.about} />}
                {eventKey === "how" && <Way way={meet.way} />}
                {eventKey === "maps" && <Map map={meet.map} />}
                {eventKey === "whoWith" && <WhoWith idmeet={idmeet} />}
            </div>
        </>
    );
}
export default AboutMeetG;
