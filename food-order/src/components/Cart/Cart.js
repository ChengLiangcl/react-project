import classes from "../Cart/Cart.module.css";
import Modal from "../UI/Modal";
const Cart = (props) => {
  const CartItems = [{ id: "test", name: "sushi", price: 12.5 }].map((item) => {
    return (
      <ul>
        <li>{item?.name}</li>
      </ul>
    );
  });

  return (
    <Modal>
      {CartItems}
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
