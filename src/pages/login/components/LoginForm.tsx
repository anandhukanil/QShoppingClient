import React, { useEffect, useState } from "react";
import { loginFields } from "../../../const/fields";
import "../styles.css";
import FormComponent from "../../../components/FormComponent";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { IUser, NotificationTypes, Types } from "../../../types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";

const LoginForm: React.FC<IProps> = ({onToggleForm}) => {
  const [buttonWidth, setButtonWidth] = useState<number>(380);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        console.log("data", {data});
        const user = getDataFromGoogle(data);
        dispatch({
          type: Types.USER_SIGNUP,
          payload: user
        });
        dispatch({
          type: Types.SET_NOTIFICATION,
          payload: { type: NotificationTypes.Success, message: "Login Success!" }
        });
        navigate(routes.landing.path);
      })
      .catch((err) => {
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
    dispatch({
      type: Types.USER_LOGIN,
      payload: { username, password }
    });
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Success, message: "Login Success!" }
    });
    setLoading(false);
    navigate(routes.landing.path);
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
}

const getDataFromGoogle = (data: Record<string, string>): IUser => ({
  firstName: data.given_name,
  lastName: data.family_name,
  email: data.email,
  id: Math.floor((Math.random() * 999999) + 1)
});