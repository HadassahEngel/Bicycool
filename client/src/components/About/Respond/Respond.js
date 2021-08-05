import "./Respond.css";
import React from "react";
import { Modal } from "react-bootstrap";
import { RiChatSmile3Fill, RiTruckLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Respond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                val: ""
            },
            responses: [],
            modalShow: false,
        };
    }

    async componentDidMount() {
        let responses = await this.getResponses()
        this.setState({ responses: responses })
    }

    getResponses = async () => {
        let response = await fetch("http://localhost:27017/responses/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.status == 200) {
            let response2 = await response.json()
            return response2
        }
    }

    addRes = async () => {
        if (this.state.value.val !== "") {
            let result = this.addRespond(this.state.value);
            if (result) {
                let responses = await this.getResponses()
                this.setState({ responses: responses })
                toast("תגובתך נשלחה בהצלחה!");
                this.setState({modalShow:false})
            }
            
        }
    };

    addRespond = async (res) => {
        let response = await fetch("http://localhost:27017/responses/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res)
        });
        if (response.status == 200) {
            return true
        }
        return false
    };

    render() {
        return (
            <div className="allres">
                <h1 className="hedres">תגובות והמלצות</h1>
                {this.state.responses &&
                    this.state.responses.map((item) => {
                        return (
                            <div className="cardcon">
                                <p className="iconres">
                                    <RiChatSmile3Fill />
                                </p>
                                <p className="responval">{item.val}</p>
                            </div>
                        );
                    })}

                <button
                    style={{ color: "black" }}
                    className="btn-add-respond1"
                    type="button"
                    onClick={() => {
                        this.setState({ modalShow: true });
                    }}
                >
                    להוספת תגובה
                </button>

                <Modal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    size="lg"
                    aria-labelledby="contained-modal"
                    centered
                >
                    <p className="p-modal-res">
                        כתבו לנו את תגובתכם, אנו תמיד שמחים לשמוע!
                    </p>
                    <form>
                        <div className="form-group">
                            <textarea
                                className="area form-control"
                                id="message-text"
                                onChange={(e) => {
                                    this.setState({
                                        value: {
                                            val: e.target.value,
                                        },
                                    });
                                }}
                            ></textarea>
                        </div>

                        <button
                            style={{ color: "black" }}
                            type="button"
                            className="butn122"
                            data-dismiss="modal"
                            onClick={this.addRes}
                        >
                            שלח
                        </button>
                        <button
                            className="butn121"
                            style={{ color: "black" }}
                            type="button"
                            onClick={() => this.setState({ modalShow: false })}
                        >
                            לא עכשיו
                        </button>
                    </form>
                </Modal>
                <div>
                    <ToastContainer />
                </div>
            </div>
        );
    }
}
