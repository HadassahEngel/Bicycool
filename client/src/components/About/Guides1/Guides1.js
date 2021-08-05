import "./Guides1.css";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Guides1(paras) {

  const [guides, setGuides] = useState([])
  useEffect(async() => {
    let response = await fetch("http://localhost:27017/guides/getAllGuides", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.status==200){
           let re2=await response.json()
           setGuides(re2)
        }
  }, [])

  return (
    <>
      <h1 className="tologinh1">הודעה</h1>
      <div>
        <h1 className="h1hedguide">המדריכים שלנו</h1>
        {guides &&
          guides.map((i) => {
            return (
              <div className="container4">
                <div className="cardcon">
                  <img className="g" src={i.src} alt=""></img>
                </div>
                
                <p className="pphed">{i.name}</p>
                <div className="h22">
                  <p className="h222">{i.about}</p>
                </div>
                <div className="divtobtn">
                  <Link
                    className="btn-primary7"
                    to={{
                      pathname: `/guides`,
                      state: { idguide: i.id },
                    }}
                  >
                    למפגשים של {i.name}
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Guides1;
