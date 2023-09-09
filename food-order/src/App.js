import Header from "./components/Layout/Header";
import { React, Fragment, useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [isClicked, setIsClicked] = useState(false);

  const shoppingCartButtonHandler = () => {
    setIsClicked(true);
  };

  const closeHandler = () => {
    setIsClicked(false);
  };

  return (
    <CartProvider>
      {isClicked && <Cart onClick={closeHandler} />}
      <Header onClick={shoppingCartButtonHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
