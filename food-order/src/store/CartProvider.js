import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  total: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateItems = state.items.concat(action?.item);
    const updateTotal = state.total + action.item.price * action.item.amount;

    return {
      items: updateItems,
      total: updateTotal,
    };
  }

  if (action.type == "CARTREMOVE") {
    const removeItemId = action.removeTotal.id;
    const removeParticularId = state.items?.filter((item) => {
      return item.id === removeItemId;
    });
    const removeTotalAmount = action.removeTotal.amount;
    /**
     * Remove item from the cart form when click No button
     */
    removeParticularId.splice(removeParticularId.length - removeTotalAmount);
    const filterItem = state.items?.filter((item) => {
      return item.id !== removeItemId;
    });
    const updateItems = filterItem.concat(removeParticularId);
    return {
      items: updateItems,
    };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItem = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const cartFormRemove = (removeTotal) => {
    /**
     * Remove the item for cart form
     * @input item id
     * @output already order food but after deleted
     */
    dispatchCart({ type: "CARTREMOVE", removeTotal: removeTotal });
  };

  const removeItem = (id) => {};
  const cartContext = {
    items: cartState.items,
    total: cartState.total,
    addItem: addItem,
    removeItem: removeItem,
    cartFormRemove: cartFormRemove,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
