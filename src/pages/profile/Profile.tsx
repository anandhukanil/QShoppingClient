import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IState } from "../../types";

const Profile: React.FC<IProps> = () => {
  const { currentUser } = useSelector((state: IState) => state.users);
  
  return (
    <>
      {currentUser
        ? (
          <Link key={"Account"} to={"#"}>
            <FaShoppingCart />
            Account
          </Link>
        )
        : (
          <Link key={"Login"} to={"#"}>Login/Signup</Link>
        )}
    </>
  );
};

export default Profile;

export interface IProps {}