import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBoxOpen, FaHeart, FaSignOutAlt, FaUser, FaUserCog,
  FaBars, FaShoppingCart, FaSignInAlt, FaAddressCard
} from "react-icons/fa";
import { IMenuItem, IState, Types } from "../types";
import { routes } from "../routes/routes";
import styles from "./styles.module.css";
import Search from "./Search";
import DropdownMenu from "./DropdownMenu";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, currentUser, refreshToken } = useSelector((state: IState) => state.users);

  const onSignOut = useCallback(() => {
    dispatch({
      type: Types.USER_LOGOUT,
      payload: { user: currentUser, token: refreshToken }
    });
  }, [dispatch, currentUser, refreshToken]);

  const onAddressClick = useCallback(() => {
    navigate(routes.profile.path, { state: { type: "address" } });
  }, []);

  const options: IMenuItem[] = useMemo(() => [
    {
      label: "Profile",
      path: routes.profile?.path,
      icon: FaUserCog
    },
    {
      label: "Address",
      path: "address",
      icon: FaAddressCard,
      onClick: onAddressClick,
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
      onClick: onSignOut,
    }
  ], [onSignOut]);


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
                  // hideChevronIcon
                  />
                )
                : (
                  <NavLink
                    key="Login"
                    to={routes.login.path}
                    className={({ isActive }) => isActive ? styles.navLinkHiddenItem : ""}
                  >
                    <FaSignInAlt />
                    Login
                  </NavLink>
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
