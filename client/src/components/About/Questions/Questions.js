import "./Questions.css";
import React from "react";
import Faq from "react-faq-component";
import { RiChatNewLine } from "react-icons/ri";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const data = {
    rows: [
        {
            title: "איפה מתקיימים המפגשים?",
            content: ` הממפגשים מתקיימים בכל אזור בארץ- בדרום, בצפון, במרכז ובירושלים, המסלולים הם במקומות המעניינים ביותר בארץ, בהתחייבות! `,
        },
        {
            title: "לאיזה גילאים הם מיועדים?",
            content: `טווח הגילאים האפשרי להצטרפות הוא בין 14 ל120, מתחת לגיל 18 נדרש אישור הורים חתום.`,
        },
        {
            title: "מה המחיר?",
            content: `מפגשי הרכיבה שלנו עולים דמי תשלום סמליים של 15 ש"ח בלבד, התשלום מגיע ישירות למדריך ויש לשלם אותו בשעת המפגש. אז הצטיידו ב15 שקלים כדי שתוכלו להצטרף!`,
        },
        {
            title: "אילו רמות קושי קיימות?",
            content: `אצלינו קיימות כל רמות הרכיבה, מהקל ביותר למתחילים, ועד אתגרי לרוכבים מנוסים.
            האפשרויות הן: קל, בינוני, קשה ואתגרי`,
        },
        {
            title: "לכמה מפגשים ניתן להרשם?",
            content: `ניתן להרשם לכמות מפגשים ללא הגבלה, אך בכל יום ניתן להרשם רק למפגש אחד. שימו לב! אם הצטרפתם למפגש בתאריך מסויים, לא תוכלו להצטרף למפגש נוסף באותו תאריך.`,
        },
        {
            title: "מה אוכל לעשות אם חסר לי ציוד עבור המפגש?",
            content: `בדיוק בשביל זה הוקמה החנות שלנו\n.
            כאן בחנות ניתן למצוא את כל המוצרים`,
        },
    ],
};
export default class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: "",
            email: "",
            name: "",
        };
    }
    state = {
        modal8: false,
        modal9: false,
    };

    send = () => {
        if (this.state.val !== "") {
            toast("שאלתך נשלחה בהצלחה!");
            emailjs.send(
                "service_x2pve55",
                "template_tj3jdl1",
                {
                    name: this.state.name,
                    email: this.state.email,
                    value: this.state.val,
                },
                "user_Ol2nhwnPOsyEBhWc4lcHI"
            );
        }
    };
    onChange = (e) => {
        let email = this.state.email;
        let name = this.state.name;
        if (this.props.user) {
            email = this.props.user?.email;
            name = this.props.user?.name;
        }
        this.setState({
            val: e.target.value,
            email: email,
            name: name,
        });
    };

    toggle = (nr) => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
        });
    };

    render() {
        return (
            <div>
                <MDBModal
                    isOpen={this.state.modal8}
                    toggle={this.toggle(8)}
                    fullHeight
                    position="right"
                >
                    <MDBModalHeader toggle={this.toggle(8)}></MDBModalHeader>
                    <MDBModalBody>
                        <div className="addques">
                            <p className="addqueshed">יש לך שאלה נוספת?</p>
                            <textarea
                                className="textareaques"
                                placeholder={
                                    " אפשר לשאול כאן, ואנו נשתדל להשיב בהקדם"
                                }
                                onChange={(e) => {
                                    this.onChange(e);
                                }}
                            ></textarea>
                            {!this.props.user && (
                                <div>
                                    <input
                                        className="input-ques-0"
                                        placeholder="אימייל"
                                        onChange={(e) => {
                                            this.setState({
                                                email: e.target.value,
                                            });
                                        }}
                                    />
                                    <input
                                        className="input-ques-1"
                                        placeholder="שם"
                                        onChange={(e) => {
                                            this.setState({
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            )}
                            <button className="send" onClick={this.send}>
                                שלח!
                            </button>
                        </div>
                    </MDBModalBody>
                </MDBModal>

                <div className="allques">
                    <div className="allques2">
                        <h1 className="queshed">שאלות נפוצות</h1>
                        <div className="quesna">
                            <Faq data={data} />
                        </div>
                        <button className="btnaddques" onClick={this.toggle(8)}>
                            <RiChatNewLine />
                        </button>
                        <div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
