import bbq from "../../assets/bbq.jpg";
import classes from "../Layout/Header.module.css";
const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>Meals Time</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={bbq} width={50} height={50} alt='Korean BBQ' />
      </div>
    </>
  );
};

export default Header;
