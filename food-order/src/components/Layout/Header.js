import bbq from "../../assets/bbq.jpg";
import classes from "../Layout/Header.module.css";

import CartButton from "./CartButton";
const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Jay Park Korean BBQ</h1>
        <CartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={bbq} width={50} height={50} alt='Korean BBQ' />
      </div>
    </>
  );
};

export default Header;
