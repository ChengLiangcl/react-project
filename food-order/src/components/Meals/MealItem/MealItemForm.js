import classes from "../MealItem/MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";
const MealItemForm = (props) => {
  const inputRef = useRef();
  const [amountValid, setAmountValid] = useState(true);

  const [clickedButton, setClickedButton] = useState("");

  const buttonHandler = (e) => {
    setClickedButton(e?.target?.id);
  };
  const formSubmit = (e) => {
    e.preventDefault();

    const amount = inputRef.current.value;
    const enteredAmount = +amount;

    if (clickedButton === "add") {
      if (amount.trim().length === 0 || enteredAmount < 1) {
        setAmountValid(false);
        return;
      }
      props.addToCart(enteredAmount);
    } else if (clickedButton === "delete") {
      props.removeFromCart(enteredAmount);
    }
  };
  return (
    <form className={classes.form} onSubmit={formSubmit}>
      <Input
        label='Amount'
        ref={inputRef}
        input={{
          id: props?.key,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button onClick={buttonHandler} id='add' className={classes.add}>
        + Add
      </button>

      <button onClick={buttonHandler} id='delete' className={classes.delete}>
        - Delete
      </button>

      {!amountValid && <p>Please enter the valid amount</p>}
    </form>
  );
};
export default MealItemForm;
