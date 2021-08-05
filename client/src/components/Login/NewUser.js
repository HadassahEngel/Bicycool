import "./NewUser.css";
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
    validationName,
    validationId,
    validationPhone,
    validationEmail,
    validationLicense_number,
    validationAge,
    validationPassword,
    validationConfirmPassword,
    validationSrc,
    validationAbout,
} from "../../Validation/Valid";

export default withRouter(function NewUser(props) {
    const { role, history } = props;
    const [status, setStatus] = useState(false);
    const [value, setValue] = useState({
        name: "",
        id: "",
        phone: "",
        email: "",
        license_number: "",
        age: "",
        password: "",
        src: "",
        confirm_password: "",
        about: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        id: "",
        phone: "",
        email: "",
        license_number: "",
        age: "",
        password: "",
        confirm_password: "",
        src: "",
        about: "",
    });
    function onInputChange(field, event) {
        setValue({ ...value, [field]: event.target.value });
    }

    const addUserGuide = async () => {
        let url = "";
        if (role === "Guide") url = "guides";
        else url = "users";
        let response = await fetch("http://localhost:27017/" + url + "/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value)
        });

        let response2 = await response.text();
        if (response.status === 200) {
            history.push("/loginBicycleRider");
            setStatus(true);
        }
        else {
            if (response2 == "כתובת מייל זו קיימת במערכת") {
                setErrors({ ...errors, email: response2 })
            }
            else { alert("שגיאה: " + response2); }
        }
    };


    async function validate() {
        if (role === "Guide") { errors.about = validationAbout(value.about); }
        if (value.src != "") { errors.src = validationSrc(value.src); }
        errors.name = validationName(value.name);
        errors.id = validationId(value.id, role);
        errors.email = validationEmail(value.email, role);
        errors.phone = validationPhone(value.phone);
        errors.age = validationAge(value.age);
        if (role === "Guide") { errors.license_number = validationLicense_number(value.license_number); }
        errors.password = validationPassword(value.password);
        errors.confirm_password = validationConfirmPassword(
            value.confirm_password,
            value.password
        );

        setErrors({ ...errors, errors: errors });
        if (
            errors.phone === null &&
            errors.email === null &&
            errors.name === null &&
            errors.id === null &&
            (role === "BicycleRider" || errors.license_number === null) &&
            errors.password === null &&
            errors.confirm_password === null &&
            (value.src === "" || errors.src === null) &&
            (role == "BicycleRider" || errors.about === null)
        ) {
            await addUserGuide();
        }
    }


    return (
        <div>
            <h1 className="tologinh1">התחבר</h1>
            <div className="container2">
                <form
                    onSubmit={async () => {
                        await validate();
                    }}
                >
                    <p className="p_haeder1">כמה פרטים לפני ההצטרפות...</p>
                    <label>
                        <input
                            type="src"
                            name="src"
                            className="src"
                            placeholder={"קישור לתמונה שלך(לא חובה)"}
                            onChange={(e) => onInputChange("src", e)}
                        ></input>
                        <div className="errors">{errors.src}</div>
                        <p></p>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="text"
                            className="name"
                            placeholder={"שם"}
                            onChange={(e) => onInputChange("name", e)}
                        ></input>
                        <div className="errorsnew">{errors.name}</div>
                        <p></p>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="text"
                            className="id"
                            placeholder={"תעודת זהות"}
                            onChange={(e) => onInputChange("id", e)}
                        ></input>
                        <div className="errorsnew">{errors.id}</div>
                        <p></p>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="text"
                            className="email"
                            placeholder={"כתובת אימייל"}
                            onChange={(e) => onInputChange("email", e)}
                        ></input>
                        <div className="errorsnew">{errors.email}</div>
                        <p></p>
                    </label>
                    <label>
                        <input
                            type="text"
                            name="text"
                            className="phone"
                            placeholder={"מספר טלפון"}
                            onChange={(e) => onInputChange("phone", e)}
                        ></input>
                        <div className="errorsnew">{errors.phone}</div>
                        <p></p>
                    </label>
                    {role === "Guide" && (
                        <label>
                            <input
                                type="text"
                                className="license_number"
                                placeholder={"מספר רשיון"}
                                onChange={(e) =>
                                    onInputChange("license_number", e)
                                }
                            ></input>
                            <div className="errorsnew">
                                {errors.license_number}
                            </div>
                            <p></p>
                        </label>
                    )}

                    {role === "BicycleRider" && (
                        <label>
                            <input
                                type="number"
                                name="text"
                                className="age"
                                placeholder={"גיל"}
                                onChange={(e) => onInputChange("age", e)}
                            ></input>
                            <div className="errorsnew">{errors.age}</div>
                            <p></p>
                        </label>
                    )}
                    <label>
                        <input
                            type="password"
                            name="text"
                            className="password"
                            placeholder={"צור סיסמא"}
                            lastPassword={value.password}
                            onChange={(e) => onInputChange("password", e)}
                        ></input>
                        <div className="errorsnew">{errors.password}</div>
                        <p></p>
                    </label>
                    <label>
                        <input
                            type="password"
                            name="text"
                            className="confirmpassword"
                            placeholder={"אשר סיסמא"}
                            lastPassword={value.password}
                            onChange={(e) =>
                                onInputChange("confirm_password", e)
                            }
                        ></input>
                        <div className="errorsnew">
                            {errors.confirm_password}
                        </div>
                        <p></p>
                    </label>
                    {role === "Guide" && (
                        <label>
                            <textarea
                                type="text"
                                name="text"
                                className="way"
                                placeholder={" נא פרט כאן אודותיך"}
                                onChange={(e) => onInputChange("about", e)}
                            ></textarea>
                            <div className="errors">{errors.about}</div>
                        </label>
                    )}
                </form>
                <button className="sumbit" onClick={validate} type="submit">
                    להצטרפות
                </button>
                {!status && (
                    <p className="messege_error">יש להזין את כל השדות</p>
                )}
                {status && (
                    <p className="messege_good">
                        ברוכים הבאים {value.name}! פרטיך עודכנו בהצלחה
                    </p>
                )}
                {role === "Guide" && (
                    <label>
                        <p></p>
                        <Link
                            to="/loginGuide"
                            className="login11"
                            style={{ textDecoration: "none" }}
                        >
                            מדריך רשום? התחבר
                        </Link>
                    </label>
                )}
                {role === "BicycleRider" && (
                    <label>
                        <p></p>
                        <Link
                            to="/loginBicycleRider"
                            className="login11"
                            style={{ textDecoration: "none" }}
                        >
                            משתמש קיים? התחבר
                        </Link>
                    </label>
                )}
            </div>
        </div>
    );
});
