import React, { useEffect, useState } from "react";
import "./aboutMeet.css";
import profil from "../../../images/pro2.png";

function WhoWith(props) {
    const { idmeet } = props;
    const [users, setUsers] = useState([])

    useEffect(async() => {
        let response = await fetch("http://localhost:27017/meets/getUsersInMeets/" + idmeet, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        let response2 = await response.json();
        if (response.status === 200) {
            setUsers(response2);
        }
    }, [])

    return (
        <div className="itemallwhowith">
            {
                users.map(
                    (Iuser) =>
                    (
                        <div className="who-with1">
                            <img
                                className="imgpro1"
                                src={(Iuser.src!=undefined && Iuser.src!="")? Iuser.src :profil}
                                alt="user profile"
                            />
                            <div className="p-who-with"> {Iuser.name}</div>
                        </div>
                    )
                )
            }
        </div>
    );
}
export default WhoWith;
