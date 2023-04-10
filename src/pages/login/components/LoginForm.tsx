import React, { useEffect, useMemo, useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import FormComponent from "../../../components/FormComponent";
import { FieldTypes, IFormField, IFormFieldProps, NotificationTypes, Types } from "../../../types";
import "../styles.css";
import { googleLogin, login } from "../../../apis/users";
import PasswordComponent from "./PasswordComponent";

const LoginForm: React.FC<IProps> = ({onToggleForm, onLoginCompleted, onToggleReset}) => {
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

  const onGoogleSignInSuccess = async (credResponse: CredentialResponse) => {
    setLoading(true);
    try {
      const response = await googleLogin(credResponse.credential as string);
      const { accessToken, refreshToken, user } = response.data;
      dispatch({
        type: Types.USER_LOGIN,
        payload: { accessToken, refreshToken, user }
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Login Success!" }
      });
      onLoginCompleted();
    } catch (error) {
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed to login!" }
      });
    }
    setLoading(false);
  };

  const onGoogleSignInFailed = () => {
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Error, message: "Failed to login!" }
    });
  };

  const onSignIn = async (values: Record<string, string>) => {
    setLoading(true);
    setErrorMessage("");
    const { username, password } = values;
    try {
      const response = await login(username, password);
      const { accessToken, refreshToken, user } = response.data;
      dispatch({
        type: Types.USER_LOGIN,
        payload: { accessToken, refreshToken, user }
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Login Success!" }
      });
      setLoading(false);
      onLoginCompleted();
    } catch (error) {
      if (error?.response?.data) {
        setErrorMessage(error.response.data);
      }
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Login Failed!" }
      });
      setLoading(false);
    }
  };

  const loginFields: IFormField[] = useMemo(() => [
    {
      fieldType: FieldTypes.Email,
      name: "username",
      label: "Email",
      placeholder: "someone@example.com",
      required: true,
    },
    {
      fieldType: FieldTypes.Password,
      name: "password",
      label: "Password",
      placeholder: "Password",
      required: true,
      validationRules: { minLength: 8 },
      skipValidation: true,
      component: (_props: IFormFieldProps) => <PasswordComponent {..._props} onToggleReset={onToggleReset} />,
    },
  ], []);

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
  onToggleReset: () => void;
}
