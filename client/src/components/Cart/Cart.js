import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { BiShekel } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { PayPalButton } from "react-paypal-button-v2";
import { BsFillTrashFill } from "react-icons/bs";

function Cart(props) {
  const {
    deleteItem,
    itemList,
    total,
    setItemList,
    settotal,
    deleteList,
  } = props;

  return (
    <>
      <h1 className="tologinh1">עגלה</h1>
      <div className="return-to-shop-arrow-div">
        {" "}
        <Link to="/shop" className="return-to-meet-arrow">
          <BsArrowRight />
          חזרה לחנות
        </Link>
      </div>
      {total === 0 && (
        <h1 className="empty-cart-header">סל הקניות שלך ריק עדיין</h1>
      )}
      {total > 0 && (
        <div className="concart">
          <div className="all-item-cart">
            {itemList.map((item) => {
              // let src = require("../../images/shop/" + item.src);
              return (
                <div className="item-cart">
                  <img className="img-cart-item" src={item.src} alt=""></img>
                  <div className="div-item-cart">
                    <p className="pitem1"> {item.name}</p>
                    <p className="pitem2">
                      <BiShekel /> {item.price}
                    </p>
                    <button
                    className="trash-remove"
                      onClick={() => {
                        deleteItem(item);
                      }}
                    >
                      <BsFillTrashFill/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pay-cart-div">
            <p className="total-pay">סה"כ לתשלום:</p>
            <p className="total-pay">
              {" "}
              <BiShekel /> {total}
            </p>
           
            <PayPalButton
              onCancel={() => console.log("on cancel")}
              amount={String(total)}
              shippingPreference="NO_SHIPPING"
              onSuccess={(payment) => {
                console.log("The payment was succeeded!", payment);
                deleteList();
              }}
              setItemList={setItemList}
              settotal={settotal}
              options={{
                clientId:
                  "ASeDRc3lXilzl0a69ZVVzY3n372OmW4puqScb62ssrDNZeB7kEmknswfNNo7hCSf5B9QLmSsV_gDpZ_u",
                currency: "ILS",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
