import React, { useState } from "react";
import { login, welcome } from "../../assets";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import styles from "./styles.module.css";

const LogInSignUpPage: React.FC<IProps> = () => {
  const [active, setActive] = useState<boolean>(false);

  const toggleForm = () => {
    setActive((prevState) => !prevState);
  };

  return (
    <div className={styles.section}>
      <div className={`${styles.container} ${active ? styles.active : ""}`}>
        <div className={`${styles.user} ${styles.signinBx}`}>
          <div className={styles.imgBx}>
            <img src={login} alt="" />
          </div>
          <div className={styles.formBx + " loginWrapper"}>
            <LoginForm onToggleForm={toggleForm} />
          </div>
        </div>
        <div className={`${styles.user} ${styles.signupBx}`}>
          <div className={styles.formBx + " loginWrapper"}>
            <SignUpForm onToggleForm={toggleForm} />
          </div>
          <div className={styles.imgBx}>
            <img src={welcome} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUpPage;

export interface IProps {}