import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link,
} from "react-router-dom";
import React, { useState } from "react";
import Home from "../components/Home/Home";
import LoginStart from "../components/Login/LoginStart";
import NewUser from "../components/Login/NewUser";
import Login from "../components/Login/Login";
import Shop from "../components/Shop/Shop";
import About from "../components/About/About";
import Account from "../components/Account/Account";
import ChooseMeet from "../components/ChoosMeet/ChooseMeet";
import CreateMeet from "../components/CreateMeet/CreateMeet";
import Logo from "../images/icon1.png";
import Respond from "../components/About/Respond/Respond";
import Cart from "../components/Cart/Cart";
import MessageGuide from "../components/Message/MessageGuide";
import MessageBicycleRider1 from "../components/Message/MessageBicycleRider1";
import AboutMeet from "../components/ChoosMeet/aboutMeet/AboutMeet";
import AboutMeetG from "../components/ChoosMeet/aboutMeet/AboutMeetG";
import Description from "../components/ChoosMeet/aboutMeet/Description";
import Map from "../components/ChoosMeet/aboutMeet/Map";
import WhoWith from "../components/ChoosMeet/aboutMeet/WhoWith";
import Way from "../components/ChoosMeet/aboutMeet/Way";
import Guides from "../components/About/Guides/Guides";
import { BsFillPersonFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import Questions from "../components/About/Questions/Questions";
import AboutBicy from "../components/About/AboutBicy/AboutBicy";
import Guides1 from "../components/About/Guides1/Guides1";
import HowWork from "../components/About/HowWork/HowWork";
import Meets from "../components/Meets/Meets";
import Error from "../components/Error404/Error";
import { RiMapPin2Fill } from "react-icons/ri";
import a from "../images/back5.jpg";
import ScrollToTop from "../components/Scroll/ScrollToTop";
function App() {
    const [total, settotal] = useState(0);
    let u;
    if (localStorage.getItem("user") == null) {
        u = undefined
    }
    else {
        u = JSON.parse(localStorage.getItem("user"));
    }
    const [user, setUser] = useState(u ? (u.role ? u : undefined) : undefined);
    const [itemList, setItemList] = useState([]);

    function deleteList() {
        setItemList([]);
        settotal(0);
    }
    function deleteProduct(item) {
        setItemList(
            itemList.filter((_item) => {
                if (item.name !== _item.name) return true;
            })
        );
        settotal(total - 1 * item.price);
    }
   
    function setNewUser(user) {
        if (user !== null) {
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
        }
        else{
            setUser(undefined)
        }
    }
    return (
        <Router>
            <div
                className="backimageshop"
                style={{
                    backgroundImage: `url(${a})`,
                }}
            >
                <div className="navcon">
                    <div className="navright">
                        <NavLink to="/" style={{ textDecoration: "none" }}>
                            {<img className="logohome" alt="" src={Logo}></img>}
                        </NavLink>

                        {user === null ||
                            (user === undefined && (
                                <NavLink
                                    to="/loginStart"
                                    className="rnav"
                                    style={{ textDecoration: "none" }}
                                >
                                    נצא לדרך?
                                </NavLink>
                            ))}

                        {user !== undefined && user?.role === "BicycleRider" && (
                            <NavLink
                                to="/chooseMeet"
                                className="rnav"
                                style={{ textDecoration: "none" }}
                            >
                                נצא לדרך?
                            </NavLink>
                        )}
                        {user !== undefined && user?.role === "Guide" && (
                            <NavLink
                                to="/createMeet"
                                className="rnav"
                                style={{ textDecoration: "none" }}
                            >
                                נצא לדרך?
                            </NavLink>
                        )}

                        <NavLink
                            to="/shop"
                            className="rnav"
                            style={{ textDecoration: "none" }}
                        >
                            חנות
                        </NavLink>

                        <Link
                            to="/about"
                            className="rnav"
                            style={{ textDecoration: "none" }}
                        >
                            אודותינו
                        </Link>
                    </div>

                    <div className="navleft">
                        {user === null ||
                            (user === undefined && (
                                <NavLink to="loginStart" className="helloacco">
                                    התחבר
                                </NavLink>
                            ))}

                        {user !== undefined && (
                            <p className="hello">שלום {user?.name}</p>
                        )}
                        <NavLink
                            to="/account"
                            className="proacco"
                            style={{ textDecoration: "none" }}
                        >
                            <BsFillPersonFill />
                        </NavLink>
                        <NavLink
                            to="/meets"
                            className="proacco"
                            style={{ textDecoration: "none" }}
                        >
                            <RiMapPin2Fill />
                        </NavLink>
                        <NavLink
                            to={{
                                state: { itemList: itemList, total: total },
                                pathname: "/cart",
                            }}
                            className="procart"
                            style={{ textDecoration: "none" }}
                        >
                            <FaShoppingBag />
                        </NavLink>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home
                            key="home"
                            role="home"
                            user={user}
                            style={{ height: "100% !important" }}
                        />
                    </Route>
                    <Route path="/shop">
                        <Shop
                            key="shop"
                            itemList={itemList}
                            setItemList={setItemList}
                            total={total}
                            settotal={settotal}
                        />
                    </Route>
                    <Route path="/about">
                        <About key="/about" />
                    </Route>
                    <Route path="/guides">
                        <Guides key="/guides" />
                    </Route>
                    <Route path="/guides1">
                        <Guides1 key="/guides1" />
                    </Route>
                    <Route path="/howWork">
                        <HowWork key="/howWork" />
                    </Route>
                    <Route path="/aboutBicy">
                        <AboutBicy key="/aboutBicy" />
                    </Route>
                    <Route path="/account">
                        <Account
                            key="account"
                            user={user}
                            setUser={setNewUser}
                            deleteList={deleteList}
                        />
                    </Route>
                    <Route path="/meets">
                        <Meets key="meets" user={user} setUser={setNewUser}  deleteList={deleteList} />
                    </Route>
                    <Route path="/loginStart">
                        <LoginStart key="/loginStart" />
                    </Route>
                    <Route path="/createMeet">
                        <CreateMeet key="/createMeet" />
                    </Route>
                    <Route path="/newGuide">
                        <NewUser role="Guide" />
                    </Route>
                    <Route path="/newBicycleRider">
                        <NewUser role="BicycleRider" />
                    </Route>
                    <Route path="/loginGuide">
                        <Login
                            key="loginGuide"
                            user={user}
                            setUser={setNewUser}
                            role="Guide"
                        />
                    </Route>
                    <Route path="/loginBicycleRider">
                        <Login
                            key="loginBicycleRider"
                            user={user}
                            setUser={setNewUser}
                            role="BicycleRider"
                        />
                    </Route>
                    <Route path="/respond">
                        <Respond key="respond" />
                    </Route>
                    <Route path="/questions">
                        <Questions user={user} key="questions" />
                    </Route>
                    <Route path="/cart">
                        <Cart
                            key="cart"
                            deleteItem={deleteProduct}
                            itemList={itemList}
                            total={total}
                            setItemList={setItemList}
                            settotal={settotal}
                            deleteList={deleteList}
                        />
                    </Route>
                    <Route path="/chooseMeet">
                        <ChooseMeet
                            key="chooseMeet"
                            user={user}
                            setUser={setNewUser}
                        />
                    </Route>
                    <Route path="/aboutMeet">
                        <AboutMeet key="aboutMeet" />
                    </Route>
                    <Route path="/aboutMeetG">
                        <AboutMeetG key="aboutMeetG" />
                    </Route>
                    <Route path="/description">
                        <Description key="description" />
                    </Route>
                    <Route path="/map">
                        <Map key="map" />
                    </Route>
                    <Route path="/whoWith">
                        <WhoWith key="whoWith" />
                    </Route>
                    <Route path="/way">
                        <Way key="way" />
                    </Route>
                    <Route path="/createMeet">
                        <CreateMeet key="createMeet" />
                    </Route>
                    <Route path="/messageGuide">
                        <MessageGuide key="messageGuide" />
                    </Route>
                    <Route path="/messageBicycleRider1">
                        <MessageBicycleRider1 key="messageBicycleRider1" />
                    </Route>
                    <Route component={Error}></Route>
                </Switch>
            </div>
            <ScrollToTop />
        </Router>
    );
}

export default App;
