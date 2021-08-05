import React from "react";
import "./Login.css";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
export default withRouter(function Login(props) {
    const { role, history, setUser } = props;
    const [status, setStatus] = useState(false);
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    function onInputChange(field, event) {
        setValue({ ...value, [field]: event.target.value });
    }

    async function validate() {

        if (role === "Guide") {
            let response = await fetch("http://localhost:27017/guides/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            let response2 = await response.json();
            if (response.status === 200) {
                history.push("/createMeet");
                setUser(response2);
                localStorage.setItem("user", JSON.stringify(response2));
                // window.location.reload(false);
                setStatus(true);
            }
            else {
                if (response2.err === "סיסמה לא נכונה") {
                    setErrors({
                        ...errors,
                        password:response2.err
                    });
                }
                if (response2.err === "משתמש לא קיים") {
                   setErrors({
                       ...errors,
                       email:response2.err
                   })
                }
            }
        }
        if (role === "BicycleRider") {

            let response = await fetch("http://localhost:27017/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            let response2 = await response.json();
            if (response.status === 200) {

                history.push("/chooseMeet");
                setUser(response2);
               
                // window.location.reload(false);
                setStatus(true);
            }
            else {
                if (response2.err === "סיסמה לא נכונה") {
                    setErrors({
                        ...errors,
                        password:response2.err
                    });
                }
                if (response2.err === "משתמש לא קיים") {
                   setErrors({
                       ...errors,
                       email:response2.err
                   })
                }
            }
        }


    }
    return (
        <>
            <h1 className="tologinh1">התחבר</h1>
            <div>
                <div className="container1">
                    <div className="inside-div">
                        <form onSubmit={async()=>{await validate();}}>
                            <p className="p_haeder">הזן את פרטיך</p>

                            <label>
                                <input
                                    type="text"
                                    name="text"
                                    className="email"
                                    placeholder={"כתובת אימייל"}
                                    onChange={(e) =>
                                        onInputChange("email", e)
                                    }
                                ></input>
                                <div className="errorslogin">
                                    {errors.email}
                                </div>
                                <p></p>
                            </label>



                            <label>
                                <input
                                    type="password"
                                    name="text"
                                    className="password"
                                    placeholder={"סיסמא"}
                                    onChange={(e) =>
                                        onInputChange("password", e)
                                    }
                                ></input>
                                <div className="errorslogin">
                                    {errors.password}
                                </div>
                                <p></p>
                            </label>

                        </form>
                        <button
                            className="sumbit"
                            onClick={validate}
                            type="submit"
                        >
                            המשך
                        </button>
                        {!status && (
                            <p className="messege_error">
                                יש להזין את כל השדות
                            </p>
                        )}
                        {status && (
                            <p className="messege_good">
                                ברוכים הבאים ! פרטיך עודכנו בהצלחה
                            </p>
                        )}
                        {role === "Guide" && (
                            <label>
                                <p></p>
                                <Link
                                    to="/newGuide"
                                    className="login1"
                                    style={{ textDecoration: "none" }}
                                >
                                    מדריך חדש? הרשם
                                </Link>
                            </label>
                        )}
                        {role === "BicycleRider" && (
                            <label>
                                <p></p>
                                <Link
                                    to="/newBicycleRider"
                                    className="login1"
                                    style={{ textDecoration: "none" }}
                                >
                                    משתמש חדש? הרשם
                                </Link>
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});
