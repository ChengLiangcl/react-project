import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  total: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    /**
     * Initial check the items have been added or not, if yes it will return the index
     */

    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existItem = state.items[existItemIndex];
    let updateItems;

    /**
     * If item has been added, set the update Items
     */
    if (existItem) {
      let updateItem = {
        ...existItem,
        amount: existItem.amount + action.item.amount,
      };

      updateItems = [...state.items];
      updateItems[existItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action?.item);
    }
    const updateTotal = state.total + action.item.price * action.item.amount;

    return {
      items: updateItems,
      total: updateTotal,
    };
  }

  if (action.type === "CARTREMOVE") {
    let deletedItem = state.items.find((item) => {
      return item.id === action.removeTotal.id;
    });

    let notDelteItem = state.items.filter((item) => {
      return item.id !== action.removeTotal.id;
    });

    /**
     * If find the delete item index exist, the remove the item from the shopping cart
     *
     */
    if (
      typeof deletedItem !== "undefined" &&
      typeof notDelteItem !== "undefined" &&
      deletedItem?.amount - action.removeTotal.amount >= 0
    ) {
      let updateDeletedItem = {
        ...deletedItem,
        amount: deletedItem?.amount - action.removeTotal.amount,
      };
      /**
       * Update delete amount from the cart
       */

      const updateTotal =
        state.total - action.removeTotal.price * action.removeTotal.amount;

      return {
        items: [...notDelteItem, updateDeletedItem],
        total: updateTotal,
      };
    } else {
      return {
        items: state?.items,
        total: state?.total,
      };
    }
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
