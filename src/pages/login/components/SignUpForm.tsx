import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpFields } from "../../../const/fields";
import FormComponent from "../../../components/FormComponent";
import "../styles.css";
import { signup } from "../../../apis/users";
import { NotificationTypes, Types } from "../../../types";
import { routes } from "../../../routes/routes";

const SignUpForm: React.FC<IProps> = ({onToggleForm}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignUp = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const response = await signup({
        firstName: values.fullName.split(" ")[0],
        lastName: values.fullName.split(" ").slice(1).join(" "),
        email: values.email,
        password: values.confirmPassword,
        id: "",
      });
      const { accessToken, refreshToken, user } = response.data;
      dispatch({
        type: Types.USER_LOGIN,
        payload: { accessToken, refreshToken, user }
      });
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Success, message: "Sign Up Success!" }
      });
      navigate(routes.landing.path);
      setLoading(false);
    } catch (error) {
      if (error?.message === "User already exists") {
        setErrorMessage("Email already exists!");
      }
      dispatch({
        type: Types.SET_NOTIFICATION,
        payload: { type: NotificationTypes.Error, message: "Sign Up Failed!" }
      });
    }
    setLoading(false);
  };


  return (
    <div className="login-form">
      <div className="login-form-inner">
        <FormComponent
          title="Sign Up"
          description="Join the shopping spree and never miss a deal!"
          submitButtonText="Sign Up"
          fields={signUpFields}
          onSubmit={onSignUp}
          disableSubmit={loading}
        />
        {errorMessage && <div className="loginErrorMessage">{errorMessage}</div>}
        <div className="register-div">Already have an account?&nbsp;
          <a href="#" className="link create-account" onClick={onToggleForm}>Login.</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

export interface IProps {
  onToggleForm: () => void;
}