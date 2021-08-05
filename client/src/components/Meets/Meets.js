import React, { useState, useEffect } from "react";
import "./Meets.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import a from "../../images/back5.jpg";
import { BsFillTrashFill } from "react-icons/bs";

export default withRouter(function Meets(props) {
    const { history, user, setUser ,deleteList} = props;
    const [meets, setMeets] = useState([]);

    useEffect(async () => {
        let response;
        let newMeet = []
        if(!user){
            setMeets(newMeet);
            return;
        }
        if (user.role == "BicycleRider") {
            response = await fetch("http://localhost:27017/users/getUser/" + user.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            let userUpdate = await response.json();
            if (response.status === 200) {
                setUser(userUpdate)
            }
            for (let i = 0; i < userUpdate.meets.length; i++) {
                console.log(userUpdate.meets[i]);
                let response = await fetch("http://localhost:27017/meets/getMeet", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ idMeet: userUpdate.meets[i], projection: { _id: 1, date: 1, namemeet: 1, name: 1, time: 1, area: 1, level: 1, users: 1 } }),
                });

                let response2 = await response.json();
                if (response.status === 200) {
                    console.log(response2);
                    newMeet.push(response2);
                }
            }
        }
        else {
            if (user && user.id) {
                response = await fetch("http://localhost:27017/guides/getGuideMeets/" + user.id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                newMeet = await response.json();
            }
        }

        setMeets(newMeet);

    }, [user])

    async function deleteMeet(meetID) {
        let response = await fetch("http://localhost:27017/meets/leaveMeet", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idMeets: meetID, idUser: user.id }),
        });

        if (response.status === 200) {
            let newUser = { ...user }
            let newMeetsArray = [...user.meets];
            let index = user.meets.findIndex(id => id === meetID)
            if (index >= 0) {
                newMeetsArray.splice(index, 1);
                newUser.meets = newMeetsArray;
                setUser(newUser);
            }

            let meetsNew = [...meets]
            index = -1
            for (let i = 0; i < meets.length; i++) {
                if (meets[i]._id == meetID) {
                    index = i;
                    break;
                }

            }
            if (index >= 0) {
                meetsNew.splice(index, 1);
                setMeets(meetsNew);
            }
        }

    }

    function clear() {
        localStorage.clear();
        history.push("/");
        setUser(null);
        deleteList();
    }
    return (
        <div
            className="image2"
            style={{
                backgroundImage: `url(${a})`,
            }}
        >
            <div>
                {user == null && (
                    <div className="acco1">
                        <Link to="/loginStart" className="acco">
                            הנך נדרש להתחבר כדי לצפות בדף זה
                        </Link>
                    </div>
                )}
                {user != null && (
                    <div>
                        <div className="conmeetdet">
                            <div className="headermeets2">
                                <div className="hedaccomeet">המפגשים שלך</div>
                            
                            </div>
                            <div className="headerdetails">
                                <p className="headerdetailstitle">שם המסלול</p>
                                <p className="headerdetailstitle">תאריך</p>
                                <p className="headerdetailstitle">שעה</p>
                                <p className="headerdetailstitle">רמת קושי</p>
                                <p className="headerdetailstitle">אזור</p>
                                <p className="headerdetailstitle">
                                    כמות משתתפים
                                </p>
                            </div>
                            {user?.role === "Guide" &&
                                meets.map((i) => {
                                    {
                                        return (
                                            <Link
                                                className="meetglink"
                                                to={{
                                                    pathname: `/aboutMeetg`,
                                                    state: { idmeet: i._id },
                                                }}
                                            >
                                                <div className="pacd">
                                                    {i.namemeet}
                                                </div>
                                                <p className="pacd">{i.date}</p>
                                                <p className="pact">{i.time}</p>
                                                <p className="pacl">
                                                    {i.level}
                                                </p>
                                                <p className="paca">{i.area}</p>
                                                <p className="paca">
                                                    {i.users.length}
                                                </p>
                                            </Link>
                                        );
                                    }
                                })}
                            {user?.role === "BicycleRider" &&
                                meets?.map((j) => {
                                    {
                                        return (
                                            <div>
                                                <button
                                                    className="btn-delete-meet"
                                                    onClick={() =>
                                                        deleteMeet(j._id)
                                                    }
                                                >
                                                    <BsFillTrashFill />
                                                </button>
                                                <Link
                                                    className="meetglink"
                                                    to={{
                                                        pathname: `/aboutMeetG`,
                                                        state: {
                                                            idmeet: j._id,
                                                        },
                                                    }}
                                                >
                                                    <div className="pacd">
                                                        {j.namemeet}
                                                    </div>
                                                    <div className="pacd">
                                                        {j.date}
                                                    </div>

                                                    <p className="pact">
                                                        {j.time}
                                                    </p>
                                                    <p className="pacl">
                                                        {j.level}
                                                    </p>
                                                    <p className="paca">
                                                        {j.area}
                                                    </p>
                                                    <p className="paca">
                                                        {j?.users?.length}
                                                    </p>
                                                </Link>{" "}
                                            </div>
                                        );
                                    }
                                })
                            }

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
