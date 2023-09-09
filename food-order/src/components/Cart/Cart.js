import classes from "../Cart/Cart.module.css";
import Modal from "../UI/Modal";

import { useContext } from "react";
import CartContext from "../../store/cart-context";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const item = cartCtx.items;

  /**
   * Ouput the food order menu items
   */

  let listItem = item.map((data, key) => {
    return (
      <ul key={key}>
        <li>{data?.name}</li>
        <li>{data?.amount}</li>
      </ul>
    );
  });

  return (
    <Modal>
      {listItem}
      <div className={classes?.total}>
        <span>Total Amount</span>
        <span>100</span>
      </div>
      <div className={classes?.actions}>
        <button onClick={props?.onClick} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
