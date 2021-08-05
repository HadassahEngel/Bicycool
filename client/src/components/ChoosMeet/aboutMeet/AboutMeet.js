import "./aboutMeet.css";
import Way from "./Way";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import React,{useEffect,useState} from "react";
import Map from "./Map";
import Description from "./Description";
import { BsArrowRight } from "react-icons/bs";

function AboutMeet() {
    const location = useLocation();
    const idmeet = location.state.idmeet;
    const [eventKey, setEventKey] = useState("about");
    const [meetData, setMeetData] = useState({});

    useEffect(async() => {
        let response = await fetch("http://localhost:27017/meets/getMeet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({ idMeet: idmeet})
        });

        if (response.status == 200) {
            let resonse2=await response.json();
            setMeetData(resonse2);
        }
       
    }, [idmeet]);
    return (
        <>
            <h1 className="toaddh1">הודעה</h1>
            <div className="aboutmeetall">
                <div className="return-to-meet-arrow-div">
                    <Link to="/chooseMeet" className="return-to-meet-arrow">
                        <BsArrowRight />
                        חזרה לדף המפגשים
                    </Link>
                </div>
                <Nav
                    variant="tabs"
                    defaultActiveKey="about"
                    className="navmodal"
                    onSelect={(eventKey) => setEventKey(eventKey)}
                >
                    <Nav.Item className="nav-item-1">
                        <Nav.Link eventKey="about" className="nalinkm1">
                            אודות המסלול
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item-1">
                        <Nav.Link eventKey="how" className="nalinkm">
                            איך מגיעים?
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item-1">
                        <Nav.Link eventKey="maps" className="nalinkm">
                            מפת המסלול
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {eventKey === "about" && <Description description={meetData.about} />}
                {eventKey === "how" && <Way way={meetData.way} />}
                {eventKey === "maps" && <Map map={meetData.map} />}
            </div>
        </>
    );
}
export default AboutMeet;
