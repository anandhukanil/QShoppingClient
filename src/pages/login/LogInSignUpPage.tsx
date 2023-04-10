import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, welcome } from "../../assets";
import { routes } from "../../routes/routes";
import LoginForm from "./components/LoginForm";
import PasswordResetForm from "./components/PasswordResetForm";
import SignUpForm from "./components/SignUpForm";
import styles from "./styles.module.css";

const LogInSignUpPage: React.FC<IProps> = () => {
  const [signUpActive, setSignUpActive] = useState<boolean>(false);
  const [resetActive, setResetActive] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleForm = () => {
    setSignUpActive((prevState) => !prevState);
  };
  const toggleReset = () => {
    setResetActive((prevState) => !prevState);
  };

  const onLoginCompleted = () => {
    if (location?.state?.from?.pathname) {
      navigate(location?.state?.from?.pathname);
    } else {
      navigate(routes.landing.path);
    }
  };

  return (
    <div className={styles.section}>
      <div className={`${styles.container} ${signUpActive ? styles.active : ""}`}>
        <div className={`${styles.user} ${styles.signinBx}`}>
          <div className={styles.imgBx}>
            <img src={login} alt="" />
          </div>
          <div className={styles.formBx + " loginWrapper"}>
            {resetActive ? (
              <PasswordResetForm
                onToggleReset={toggleReset}
              />
            ) : (
              <LoginForm
                onToggleForm={toggleForm}
                onLoginCompleted={onLoginCompleted}
                onToggleReset={toggleReset}
              />
            )}
          </div>
        </div>
        <div className={`${styles.user} ${styles.signupBx}`}>
          <div className={styles.formBx + " loginWrapper"}>
            <SignUpForm onToggleForm={toggleForm} onLoginCompleted={onLoginCompleted} />
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
