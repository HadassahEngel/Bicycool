import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Shop.css";
import { BiShekel } from "react-icons/bi";
import { IoBagAdd, IoBagRemove } from "react-icons/io5";
function Shop(props) {
    const { itemList, setItemList, total, settotal } = props;
    const products=[
        {
          "type": "מגנים",
          "name": "מגן ברך G-Form Pro-X",
          "price": "340",
          "id": "1",
          "about": "מגני ברכיים הG-Form Pro-X המיוצרים במיוחד לאלה שאוהבים אקשן ברכיבות שלהם, ה G-Form מיוצרים מחומרים פעילים Reactive Protection Technology RPT. ג'ל ה-RPT סופג 94% מהאנרגיה ומתקשה בזמן המכה. אלסטיים ביותר ומנדפי זיעה, בעלי פס סיליקון בקצוות העליונות של השרוול נגד תזוזתו מהרגל ובכך אינו מאפשר להם לזוז מהרגל גם בזמן הנפילה ",
          "src": "http://www.up2me.co.il/imgs/23252678.png"
        },
        {
          "type": "מגנים",
          "name": "מגן מרפק G-Form Pro-X",
          "price": "340",
          "id": "2",
          "about": "מגני מרפק G-Form מפותחים בארצות הברית, ומיוצרים מחומרים פעילים Reactive Protection Technology RPT. ג'ל ה-RPT סופג 94% מהאנרגיה ומתקשה בזמן המכה. אלסטיים ביותר ומנדפי זיעה, בעלי פס סיליקון בקצוות העליונות של השרוול נגד תזוזתו מהיד ובכך אינו מאפשר להם לזוז גם בזמן הנפילה",
          "src": "http://www.up2me.co.il/imgs/81498075.png"
        },
        {
          "type": "מגנים",
          "name": "מגן ברך Fox Launch Enduro",
          "price": "449",
          "id": "3",
          "about": "כאשר אתה ביום רכיבה כיפי או מאתגר, אתה צריך מגן שידע לנוע וגם להגן. מגני ברך לאנצ' אינדורו קלים ומאווררים לנוחות מרבית. הם מאפשרים טווח בלתי מוגבל של תנועה תודות לרצועה אחורית גמישה. כדי למנוע תזוזה לא רצויה, יש רצועת סיליקון בחלק הפנימי כדי למנוע תזוזה, וכאשר אתה מדווש אתה מרגיש אותם נעולים במקום",
          "src": "http://www.up2me.co.il/imgs/91641218.png"
        },
        {
          "type": "מגנים",
          "name": "מגן מרפק Fox Launch Enduro",
          "price": "360",
          "id": "4",
          "about": "כאשר אתה ביום רכיבה כיפי או מאתגר, אתה צריך מגן שידע לנוע וגם להגן. מגני מרפק לאנצ' אינדורו קלים ומאווררים לנוחות מרבית. הם מאפשרים טווח בלתי מוגבל של תנועה תודות לרצועה אחורית גמישה. כדי למנוע תזוזה לא רצויה, יש רצועת סיליקון בחלק הפנימי כדי למנוע תזוזה, וכאשר אתה מדווש אתה מרגיש אותם נעולים במקום.",
          "src": "http://www.up2me.co.il/imgs/5406815.png"
        },
        {
          "type": "מגנים",
          "name": "מגיני ידיים חצי כפפות Hired Hands - triple 8",
          "price": "299",
          "id": "5",
          "about": "כפפות ההירד הנדס (Hired Hands) הן המסיביות ביותר שלנו- הגנה מקסימלית לפרק היד, בשילוב כיסוי מושלם ובטוח ע״י הכפפה הסופר איכותית של טריפל, עשויות עור איגותי ובעלות ריפוד מלא להגנה מקסימלית!",
          "src": "http://www.up2me.co.il/imgs/45482565.png"
        },
        {
          "type": "מחשבוני ספורט",
          "name": "מחשבון BONTRAGER TRIP 300",
          "price": "350",
          "id": "6",
          "about": "ה-TRIP 300 של BONTRAGER הוא מחשב אלחוטי דיגיטלי איכותי המשדר ב-ANT+, קל ונוח לתפעול. הוא מספק את כל המידע ההכרחי על גבי מסך גדול וברור, ומאפשר שימוש כמד דופק",
          "src": "http://www.up2me.co.il/imgs/92096195.png"
        },
        {
          "type": "מחשבוני ספורט",
          "name": "מחשבון Lezyne MEGA XL GPS Y12",
          "price": "950",
          "id": "7",
          "about": "ה-Lezyne Mega XL הוא יחידת אימון דיגיטלית בעלת ניהול נתונים סופר מהיר, מצטיין בממשק ברור, עמיד ונוח לשימוש, הכולל תשדורות ANT+ ו-BLUETOOTH לחיבור להתקנים אחרים, מתפקד גם כ-מד סלד, דופק, הספק, ואפליקציות האימון האיכותיות ביותר בשוק.  ",
          "src": "http://www.up2me.co.il/imgs/81797866.png"
        },
        {
          "type": "נעלי רכיבה",
          "name": "נעליים BONTRAGER FLATLINE",
          "price": "585",
          "id": "8",
          "about": "ה-BONTRAGER FLATLINE הן נעלי שטח נוחות בעלות מראה של נעל ספורט רגילה ונוחה העושה שימוש בגומי VIBRAM בכל יכולת האחיזה המעולה במקום קליטים. הנעל מצוידת בבולם זעזועים בסוליה לספיגת מהמורות הדרך ברכיבה על פדלים שטוחים או בהליכה",
          "src": "http://www.up2me.co.il/imgs/46575460.png"
        },
        {
          "type": "נעלי רכיבה",
          "name": "נעליים Bontrager Velocis Road",
          "price": "750",
          "id": "9",
          "about": "ה-BONTRAGER VELOCIS הן נעלי כביש מרשימות במיוחד ובצבעים מדליקים, המתאימות לרוכבים שאוהבים לתת בראש ולהשלים את המראה הכללי שלהם עם זוג נעלים מטריף!",
          "src": "http://www.up2me.co.il/imgs/18296181.png"
        },
        {
          "type": "פנסים",
          "name": "פנס Bontrager Ion 200 RT Front Bike Light",
          "price": "325",
          "id": "10",
          "about": "נצנץ / פנס קדמי לשימוש באור יום. הדרך הקלה והטובה ביותר לשמור על ביטחון הרוכב. ה-ION 200 RT מעניק את הביטחון של נצנץ המיועד גם לשעות היום, עם נראות למרחק של עד 2 קילומטר, וגם יכול לשמש כפנס לשעות החשכה. קטנטן וקליל, נטען USB. מתאים להתקנה גם על הכידון וגם (עם התקן מתאים) על הקסדה",
          "src": "http://www.up2me.co.il/imgs/82474008.png"
        },
        {
          "type": "פנסים",
          "name": "פנס Lezyne Micro Drive 500XL",
          "price": "429",
          "id": "11",
          "about": "ה-Micro DRIVE 500XL הוא פנס מקצועי קומפקטי מאוד ונטען לשימוש ברכיבת כביש ושטח. הוא בהיר ומאיר למרחק רב ובזוית רחבה. מספק עד 500 לומינס ובעל 9 מצבי פעולה, כולל תאורת יום, והבזקים שונים",
          "src": "http://www.up2me.co.il/imgs/84144235.png"
        },
        {
          "type": "פנסים",
          "name": "פנס ראש לד Head Light 5W CREE LED",
          "price": "110",
          "id": "12",
          "about": "פנס ראש לד Head Light 5W CREE LED 300 לומנס (LUMENS) חזק במיוחד  עם רצועת גומי מתכווננת שמוחזקת הייטב על הראש, מתאים במיוחד לרכיבות ארוכות בשטח.",
          "src": "http://www.up2me.co.il/imgs/13754955.png"
        },
        {
          "type": "קסדות",
          "name": "קסדה - Bontrager Starvos",
          "price": "400",
          "id": "13",
          "about": "קסדת Bontrager Starvos האוניברסלית בעלת נצנץ אחורי ומערכת אוורור מתקדמת, קסדה רב משימתית לכל מטרה ולכל רכיבה, מבנה קשיח, חזק ומאוורר, מערכת הידוק ראש ביד אחת, קסדת BONTRAGER STARVOS- היא הקסדה הראשונה בקולקציה המיועדת לרוכבי כביש.ל-STARVOS שילוב מנצח בין משקל, אוורור ומחיר.",
          "src": "http://www.up2me.co.il/imgs/2281108.png"
        },
        {
          "type": "קסדות",
          "name": "קסדה - Bontrager Lithos MIPS",
          "price": "895",
          "id": "14",
          "about": "ה-BONTRAGER LITHOS MIPS היא קסדת ה-ALL MOUNTAIN המרשימה ביותר בקטגוריה. היא כוללת מעטפת ראש מעולה,מערכת הגנה מזעזועי מוח MIPS, מערכת NoSweat לניתוב הזיעה מעיני הרוכב ואפשרות להרכבת התקן לפנס או למצלמת GoPro",
          "src": "http://www.up2me.co.il/imgs/81618962.png"
        },
        {
          "type": "תיקי מים",
          "name": "תיק OGIO ERZBERG 1L",
          "price": "379",
          "id": "15",
          "about": "מנשא מים מקצועי לריצות ארוכות, נפח נוזלים 1 ליטר, כיסים ותאים נוספים, קל משקל ומאוורר במיוחד, עם כתפיות רשת מרופדות ומנדפות זיעה לנוחות מקסימלית.",
          "src": "http://www.up2me.co.il/imgs/50077943.png"
        },
        {
          "type": "תיקי מים",
          "name": "תיק OGIO DAKAR 3L",
          "price": "699",
          "id": "16",
          "about": "תיק שתייה אטלס הכולל שקית שתייה בנפח 3 ליטר. תא תרמי ייעודי לשלוקר המצוייד בוו תפיסה עליון. תא קדמי גדול לאחסון ציוד נוסף ואביזרים. פאנל אחורי ארגונומי מאוורר במיוחד. מערכת רתמות ובדים קלים ומאווררים לתמרון קל ונוח.",
          "src": "http://www.up2me.co.il/imgs/71993156.png"
        }
      ]
    const [state, setstate] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
    });
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    function addItem(newProduct) {
        setItemList([...itemList, newProduct]);
        settotal(total + Number(newProduct.price));
    }

    function removeItem(newProduct) {
        setItemList(
            itemList.filter((_item) => {
                if (newProduct.name !== _item.name) return true;
            })
        );
        settotal(total - Number(newProduct.price));
    }

    return (
        <>
            <h1 className="toshoph1">חנות</h1>
            <div className="all">
                {products &&
                    products.map((Product) => {
                        // let src = require("../../images/shop/" + Product.src);
                        return (
                            <div className="divcard">
                                <div class="row g-0">
                                    <p class="typep">{Product.type}</p>

                                    <div class="col-md-4">
                                        <img
                                            className="imgbicy"
                                            src={Product.src}
                                            alt=""
                                        ></img>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                {Product.name}
                                            </h5>

                                            <p class="card-text">
                                                {Product.about}
                                            </p>
                                            <div className="riandle">
                                                <p class="text-muted">
                                                    <BiShekel /> {Product.price}
                                                </p>
                                                {!itemList.find(
                                                    (p) =>
                                                        p.name === Product.name
                                                ) && (
                                                    <button
                                                        className="tocart"
                                                        onClick={() => {
                                                            setModalShow(true);
                                                            setstate({
                                                                ...state,
                                                                [Product.id]: true,
                                                            });

                                                            addItem({
                                                                name: Product.name,
                                                                price: Product.price,
                                                                src: Product.src,
                                                            });
                                                        }}
                                                    >
                                                        <IoBagAdd />
                                                    </button>
                                                )}
                                                {itemList.find((p) => {
                                                    return (
                                                        p.name === Product.name
                                                    );
                                                }) && (
                                                    <button
                                                        className="tocart"
                                                        onClick={() => {
                                                            setModalShow2(true);

                                                            setstate({
                                                                ...state,
                                                                [Product.id]: false,
                                                            });

                                                            removeItem({
                                                                name: Product.name,
                                                                price: Product.price,
                                                                src: Product.src,
                                                            });
                                                        }}
                                                    >
                                                        <IoBagRemove />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal"></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>הפריט נוסף בהצלחה :)</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn-primary3"
                            onClick={() => setModalShow(false)}
                        >
                            המשך בקניה
                        </button>
                        <Link
                            className="btn-primary5"
                            to={{
                                state: { itemList: itemList, total: total },
                                pathname: "/cart",
                            }}
                        >
                            צפה בפריטים שלך
                        </Link>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                    size="lg"
                    aria-labelledby="contained-modal"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal"></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>הפריט הוסר בהצלחה</h2>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn-primary3"
                            onClick={() => setModalShow2(false)}
                        >
                            המשך בקניה
                        </button>
                        <Link
                            className="btn-primary5"
                            to={{
                                state: { itemList: itemList, total: total },
                                pathname: "/cart",
                            }}
                        >
                            צפה בפריטים שלך
                        </Link>
                    </Modal.Footer>
                </Modal>
                <Link
                    className="btn-primary6"
                    to={{
                        state: { itemList: itemList, total: total },
                        pathname: "/cart",
                    }}
                >
                    מעבר לסל ותשלום
                </Link>
            </div>
        </>
    );
}

export default Shop;
