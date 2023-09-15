import classes from "./CartItem.module.css";

import { useContext } from "react";

import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const price = `$${props.price?.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const addHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props?.name,
      amount: 1,
      price: props.price,
    });
  };
  const removeFromCart = () => {
    cartCtx.cartFormRemove({
      amount: 1,
      id: props.id,
      price: props?.price,
    });
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeFromCart}>−</button>
        <button onClick={addHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
