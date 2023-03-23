import React, { useEffect, useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import bcrypt from "bcryptjs";
import { loginFields } from "../../../const/fields";
import FormComponent from "../../../components/FormComponent";
import { NotificationTypes, Types } from "../../../types";
import { addUser, getUser } from "../../../apis/users";
import { getDataFromGoogle } from "../../../helpers";
import "../styles.css";

const LoginForm: React.FC<IProps> = ({onToggleForm, onLoginCompleted}) => {
  const [buttonWidth, setButtonWidth] = useState<number>(380);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", onWindowResized);
    onWindowResized();

    return () => {
      window.removeEventListener("resize", onWindowResized);
    };
  }, []);

  const onWindowResized = () => {
    setButtonWidth(document.getElementsByClassName("login-form-inner")[0]?.clientWidth);
  };

  const onGoogleSignInSuccess = (response: CredentialResponse) => {
    setLoading(true);
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${response?.credential}`)
      .then((res) => res.json())
      .then((data) => {
        const userData = getDataFromGoogle(data);
        let user = getUser(userData?.email);
        if (!user) {
          user = addUser({ ...userData, hash: "" });
        }
        dispatch({
          type: Types.SET_CURRENT_USER,
          payload: user
        });
        dispatch({
          type: Types.SET_NOTIFICATION,
          payload: { type: NotificationTypes.Success, message: "Login Success!" }
        });
        onLoginCompleted();
      })
      .catch(() => {
        dispatch({
          type: Types.SET_NOTIFICATION,
          payload: { type: NotificationTypes.Error, message: "Failed to login!" }
        });
      })
      .finally(() => setLoading(false));
  };

  const onGoogleSignInFailed = () => {
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Error, message: "Failed to login!" }
    });
  };

  const onSignIn = (values: Record<string, string>) => {
    setLoading(true);
    const { username, password } = values;
    const user = getUser(username);
    if (!user) {
      setErrorMessage("User not found!");
      setLoading(false);
      return;
    }
    if (bcrypt.compareSync(password, user.hash)) {
      dispatch({
        type: Types.SET_CURRENT_USER,
        payload: {...user, hash: ""}
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Login Success!" }
      });
      setLoading(false);
      onLoginCompleted();
    } else {
      setErrorMessage("Password is incorrect!");
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Login Failed!" }
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-inner">
        <FormComponent
          title="Login"
          description="Shop with ease, sign in to your account."
          submitButtonText="Login"
          fields={loginFields}
          onSubmit={onSignIn}
          disableSubmit={loading}
        />
        {/* <div className="login-form-group single-row">
          <div className="custom-check">
            <input autoComplete="off" type="checkbox" checked id="remember" /><label htmlFor="remember">Remember me</label>
          </div>
        <a href="#" className="link forgot-link">Forgot Password ?</a> */}
        {errorMessage && <div className="loginErrorMessage">{errorMessage}</div>}
        <div className="sign-in-seperator">
          <span>or</span>
        </div>
        <GoogleLogin
          onSuccess={onGoogleSignInSuccess}
          onError={onGoogleSignInFailed}
          width={`${buttonWidth}px`}
        />
        <div className="register-div">Not registered yet?&nbsp;
          <a href="#" className="link create-account" onClick={onToggleForm}>Create an account.</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

export interface IProps {
  onToggleForm: () => void;
  onLoginCompleted: () => void;
}
