import "./Guides.css";
import React, { useState, useEffect } from "react";
import Meets from "../../Meets/Meets";
import { Link, useLocation } from "react-router-dom";


function Guides() {
    const location = useLocation();
    const idguide = location.state.idguide;
    const [user, setuser] = useState({})
    useEffect(async() => {
        let response = await fetch("http://localhost:27017/guides/getGuide/"+idguide, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.status==200){
            let res2=await response.json()
            setuser(res2)
        }
    }, [])
   return(
        <>
        {user!={}&& <div>
            <Meets user={user}/>
        </div>}
        </>
    );
}

export default Guides;
