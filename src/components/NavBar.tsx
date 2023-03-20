import React, { useState } from "react";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaHeart, FaSignOutAlt, FaUser, FaUserCog } from "react-icons/fa";
import { IMenuItem, IState } from "../types";
import {routes} from "../routes/routes";
import styles from "./styles.module.css";
import Search from "./Search";
import DropdownMenu from "./DropdownMenu";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { cartItems, currentUser } = useSelector((state: IState) => state.users);


  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/">
            <span className={styles.logoLetter}>Q</span>Shopping
          </Link>
        </div>
        <div className={styles.navbarToggle} onClick={() => setShowMenu(!showMenu)}>
          <FaBars />
        </div>
        <div className={`${styles.navbarMenu} ${showMenu ? styles.active : ""}`}>
          <ul className={styles.navbarItems}>
            <li className={styles.navbarItem}>
              {currentUser
                ? (
                  <DropdownMenu
                    label="Account"
                    labelComponent={LabelComponent}
                    menuItems={options}
                    hideChevronIcon
                  />
                )
                : (
                  <Link key="Login" to="#">Login/Signup</Link>
                )}
            </li>
            <li className={styles.navbarItem}>
              <Link key={"Cart"} to={routes.cart.path}>
                {!!cartItems.length && <span className={styles.cartCount}>{cartItems.length}</span>}
                <FaShoppingCart />
                  Cart
              </Link>
            </li>
            <li className={`${styles.navbarItem} ${styles.searchItem}`}>
              <Search />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


const LabelComponent = () => (
  <Link key={"Account"} to={routes.profile.path}>
    <FaUser />
    Account
  </Link>
);

const options: IMenuItem[] = [
  {
    label: "Profile",
    path: routes.profile?.path,
    icon: FaUserCog
  },
  {
    label: "Wishlists",
    path: [routes.profile?.path, routes.profile?.children[0]?.path].join("/"),
    icon: FaHeart
  },
  {
    label: "Orders",
    path: [routes.profile?.path, routes.profile?.children[1]?.path].join("/"),
    icon: FaBoxOpen
  },
  {
    label: "SignOut",
    path: routes.landing.path,
    icon: FaSignOutAlt,
    onClick: () => alert("Sign Out!"),
  }
];