import classes from "../Cart/Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import { useContext, useRef } from "react";
import CartContext from "../../store/cart-context";

import { useState } from "react";
const Cart = (props) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const cartCtx = useContext(CartContext);
  const item = cartCtx.items;
  const [isOrderClicked, setIsOrderClicked] = useState(false);

  /**
   * Handel the form submission handler
   *
   */

  const formHandler = (e) => {
    e.preventDefault();
    const name = nameRef?.current?.value;

    const phone = phoneRef?.current?.value;

    const address = addressRef?.current?.value;
    try {
      fetch("https://meals-c7a80-default-rtdb.firebaseio.com/order.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, phone: phone, address: address }),
      });
    } catch (error) {}
  };
  const orderHandler = () => {
    setIsOrderClicked(true);
  };

  let listItem = item.map((data, key) => {
    return (
      <ul key={key}>
        <CartItem
          key={data.id}
          id={data.id}
          name={data?.name}
          amount={data?.amount}
          price={data?.price}
        />
      </ul>
    );
  });

  return (
    <Modal>
      {listItem}
      <div className={classes?.total}>
        <span>Total Amount</span>
        <span>{100}</span>
      </div>
      <div className={classes?.actions}>
        <button onClick={props?.onClick} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      </div>

      {isOrderClicked && (
        <div className='form-container'>
          <form onSubmit={formHandler}>
            <>
              <label htmlFor='inputField'>Enter the name:</label>
              <input type='text' id='name' ref={nameRef} />
            </>
            <>
              <label htmlFor='inputField'>Enter the phone number:</label>
              <input type='text' id='phone' ref={phoneRef} />
            </>
            <>
              <label htmlFor='inputField'>Enter the address:</label>
              <input type='text' id='address' ref={addressRef} />
            </>
            <button type='submit' className={classes.button}>
              Confirm order
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
