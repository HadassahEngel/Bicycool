import React from "react";
import "./Account.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import { useState } from "react";
import profil from "../../images/pro2.png";
import {
    validationName,
    validationPhone,
    validationEmail,
    validationWay,
} from "../../Validation/Valid";

export default withRouter(function Account(props) {
    const { history, user, setUser, deleteList } = props;

    function clear() {
        localStorage.clear();
        history.push("/");
        setUser(null);
        deleteList();
    }
    const [edit, setEdit] = useState(false);
    const [userEdit, setUserEdit] = useState({
        name: user && user.name,
        email: user && user.email,
        password: user && user.password,
        phone: user && user.phone,
        id: user && user.id,
        src: user && user.src,
        role: user && user.role,
        meets: user && user.meets,
    });
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });
    function onInputChange(event, field) {
        setUserEdit({ ...userEdit, [field]: event.target.value });
    }
    async function validate() {
        errors.name = validationName(userEdit.name);
        errors.email = validationEmail(userEdit.email, user.role, user.email);
        errors.phone = validationPhone(userEdit.phone);
        errors.password = validationWay(userEdit.password);

        setErrors({ ...errors, errors: errors });
        if (
            errors.phone === null &&
            errors.email === null &&
            errors.name === null &&
            errors.password === null
        ) {
            await updateUser(userEdit);
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    const updateUser = async (res) => {
        let response = await fetch("http://localhost:27017/users/updateUser/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(userEdit)
        });

        if (response.status === 200) {
            setUser(userEdit);
            localStorage.setItem("user", JSON.stringify(userEdit));
        }


    };


    return (
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
                    <div className="container3">
                        <button className="bclear" onClick={clear}>
                            להתנתקות
                        </button>
                        <div className="headerdetailsaccount">
                            <div className="imagedetails">
                                {user?.src === "" && (
                                    <img
                                        className="imgpro"
                                        src={profil}
                                        alt=""
                                    />
                                )}
                                {user?.src !== "" && (
                                    <img
                                        className="imgpro"
                                        src={user?.src}
                                        alt=""
                                    />
                                )}
                                {edit && (
                                    <div>
                                        <input
                                            className="change-name"
                                            defaultValue={user?.name}
                                            onChange={(event) =>
                                                onInputChange(event, "name")
                                            }
                                        />
                                        <div className="errorsnew">
                                            {errors.name}
                                        </div>
                                    </div>
                                )}
                                {!edit && (
                                    <p className="details1"> {user?.name}</p>
                                )}
                            </div>
                        </div>
                        <div className="divdetails1">
                            <p className="titledetails">
                                <HiOutlineIdentification />

                                <p className="details"> {user?.id}</p>
                            </p>
                            <p className="titledetails">
                                <AiOutlineMail />
                                {edit && (
                                    <div>
                                        <input
                                            className="change-details"
                                            defaultValue={user?.email}
                                            onChange={(event) =>
                                                onInputChange(event, "email")
                                            }
                                        />{" "}
                                        <div className="errorsnew">
                                            {errors.email}
                                        </div>
                                    </div>
                                )}{" "}
                                {!edit && (
                                    <p className="details"> {user?.email}</p>
                                )}
                            </p>
                        </div>{" "}
                        <div className="divdetails2">
                            <p className="titledetails">
                                <AiOutlinePhone />
                                {edit && (
                                    <div>
                                        <input
                                            className="change-details"
                                            defaultValue={user?.phone}
                                            onChange={(event) =>
                                                onInputChange(event, "phone")
                                            }
                                        />
                                        <div className="errorsnew">
                                            {errors.phone}
                                        </div>
                                    </div>
                                )}
                                {!edit && (
                                    <p className="details"> {user?.phone} </p>
                                )}
                            </p>
                            <p className="titledetails">
                                <GoLock />
                                {edit && (
                                    <div>
                                        <input
                                            className="change-details"
                                            defaultValue={user?.password}
                                            onChange={(event) =>
                                                onInputChange(event, "password")
                                            }
                                        />
                                        <div className="errorsnew">
                                            {errors.password}
                                        </div>
                                    </div>
                                )}

                                {!edit && (
                                    <p className="details">
                                        {" "}
                                        {user?.password}{" "}
                                    </p>
                                )}
                            </p>{" "}
                            {edit && (
                                <button
                                    className="detedit3"
                                    onClick={() => {
                                        setEdit(false);
                                        validate();
                                    }}
                                >
                                    שמור שינויים
                                </button>
                            )}
                        </div>
                        <div className="detedit">
                            <button
                                className="detedit1"
                                onClick={() => {
                                    setEdit(true);
                                }}
                            >
                                <FaRegEdit />
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
  
    );
});

