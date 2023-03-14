import React, { useState } from "react";
import { FaBars, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import { IState } from "../types";
import styles from "./styles.module.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { cartItems } = useSelector((state: IState) => state.users);


  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <a href="/">
            <span className={styles.logoLetter}>Q</span>Shopping
          </a>
        </div>
        <div className={styles.navbarToggle} onClick={() => setShowMenu(!showMenu)}>
          <FaBars />
        </div>
        <div className={`${styles.navbarMenu} ${showMenu ? "active" : ""}`}>
          <ul className={styles.navbarItems}>
            <li className={styles.navbarItem}>
              <Profile />
            </li>
            <li className={styles.navbarItem}>
              <Link key={"Cart"} to={"#"}>
                {!!cartItems.length && <span className={styles.cartCount}>{cartItems.length}</span>}
                <FaShoppingCart />
                  Cart
              </Link>
            </li>
          </ul>
          <div className={styles.navbarSearch}>
            <input type="text" placeholder="Search" />
            <FaSearch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
