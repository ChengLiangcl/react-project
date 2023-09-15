import classes from "../MealItem/MealItem.module.css";
import MealItemForm from "../MealItem/MealItemForm";
import { useContext } from "react";

import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const price = `$${props?.price.toFixed(2)}`;
  const cartContex = useContext(CartContext);
  const addToCart = (amount) => {
    cartContex.addItem({
      id: props.id,
      name: props?.name,
      amount: amount,
      price: props.price,
    });
  };

  const removeFromCart = (amount) => {
    cartContex.cartFormRemove({
      amount: amount,
      id: props.id,
      price: props?.price,
    });
  };

  return (
    <li className={classes.meal} key={props?.id}>
      <div>
        <h3>{props?.name}</h3>
        <div className={classes.description}>{props?.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props?.id}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </div>
    </li>
  );
};

export default MealItem;
