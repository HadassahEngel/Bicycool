import "./Chat.css";
import React from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import Data from "../../Json/data.json";
import { FiSend } from "react-icons/fi";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                id: "",
                name: "",
                role: "",
                value: "",
                date: "",
                time: "",
            },
        };
    }
    state = {
        modal8: false,
        modal9: false,
        today: "",
    };

    addRes = () => {
        if (this.state.value.value !== "") {
            this.addRespond(this.state.value);
            this.scrollToBottom();
        }
    };
    _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.addRes();
            this.scrollToBottom();
        }
    };
    addRespond = async (res) => {
        await fetch("http://localhost:5005/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res),
        });
    };

    toggle = (nr) => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            today: new Date(),
        });
    };
    render() {
        return (
            <div className="modal-chat">
                <MDBModal
                    className="modal-chat"
                    isOpen={this.state.modal8}
                    toggle={this.toggle(8)}
                    fullHeight
                    position="right"
                >
                    <MDBModalHeader toggle={this.toggle(8)}></MDBModalHeader>
                    <MDBModalBody>
                        <div className="all-chat">
                            {Data &&
                                Data.chat.map((i) => {
                                    return (
                                        <div>
                                            {i.role === "Guide" && (
                                                <div className="chat-guide">
                                                    <p className="p-value-guide">
                                                        {i.value}
                                                    </p>
                                                    <div className="div-guide-det">
                                                        <p className="pguide1">
                                                            {i.name}
                                                        </p>
                                                        <div className="div-to-det-guide">
                                                            <p className="pguide2">
                                                                {i.date}
                                                            </p>
                                                            <p className="pguide3">
                                                                {i.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {i.role === "BicycleRider" && (
                                                <div className="chat-bicy">
                                                    <p className="p-value-bicy">
                                                        {i.value}
                                                    </p>
                                                    <div className="div-bicy-det">
                                                        <p className="pbicy1">
                                                            {i.name}
                                                        </p>
                                                        <div className="div-to-det-bicy">
                                                            <p className="pbicy2">
                                                                {i.date}
                                                            </p>
                                                            <p className="pbicy3">
                                                                {i.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                        <input
                            className="input-send-chat"
                            onKeyDown={this._handleKeyDown}
                            placeholder={" כתוב כאן"}
                            onChange={(e) => {
                                this.setState({
                                    value: {
                                        id: this.state.ID,
                                        name: this.props.user.name,
                                        role: this.props.user.role,
                                        value: e.target.value,
                                        date: this.state.today.toLocaleDateString(),
                                        time:
                                            this.state.today.getHours() +
                                            ":" +
                                            this.state.today.getMinutes(),
                                    },
                                });
                                this.setState({
                                    ID: this.state.ID + 1,
                                });
                            }}
                        ></input>
                        <button className="send-chat" onClick={this.addRes}>
                            <FiSend />
                        </button>
                    </MDBModalBody>
                </MDBModal>

                <div className="div-button-chat">
                    <button className="button-chat" onClick={this.toggle(8)}>
                        <IoChatbubbleOutline />
                    </button>
                </div>
            </div>
        );
    }
}
