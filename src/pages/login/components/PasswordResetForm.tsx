import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { passwordResetFields } from "../../../const/fields";
import FormComponent from "../../../components/FormComponent";
import { NotificationTypes, Types } from "../../../types";
import "../styles.css";
import { resetPassword } from "../../../apis/users";

const PasswordResetForm: React.FC<IProps> = ({onToggleReset}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();

  const onSignIn = async (values: Record<string, string>) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await resetPassword(
        values.username,
        values.createPassword,
        values.securityQuestion,
        values.securityAnswer
      );
      if (response?.data?.success) {
        dispatch({
          type: Types.SET_NOTIFICATION,
          payload: { type: NotificationTypes.Success, message: "Password Reset Successfully!" }
        });
        onToggleReset();
      } else {
        dispatch({
          type: Types.SET_NOTIFICATION,
          payload: { type: NotificationTypes.Error, message: "Failed To Reset Password!" }
        }); 
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.data) {
        setErrorMessage(error.response.data);
      }
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Failed To Reset Password!" }
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-inner">
        <FormComponent
          title="Reset Password"
          description="Reset your password with just a few clicks!"
          submitButtonText="Submit"
          fields={passwordResetFields}
          onSubmit={onSignIn}
          disableSubmit={loading}
          values={defaultValue}
        />
        {errorMessage && <div className="loginErrorMessage">{errorMessage}</div>}
        <div className="register-div">Nevermind, I&apos;ll keep my password.&nbsp;
          <a href="#" className="link create-account" onClick={onToggleReset}>Back to Login.</a>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;

export interface IProps {
  onToggleReset: () => void;
}

const defaultValue = { securityQuestion: "1" };