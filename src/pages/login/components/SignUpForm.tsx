import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { signUpFields } from "../../../const/fields";
import FormComponent from "../../../components/FormComponent";
import "../styles.css";
import { addUser, getUser } from "../../../apis/users";
import { IUserData, NotificationTypes, Types } from "../../../types";
import { routes } from "../../../routes/routes";

const SignUpForm: React.FC<IProps> = ({onToggleForm}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignUp = (values: Record<string, string>) => {
    setLoading(true);
    const user = getUser(values?.email);
    if (user) {
      setErrorMessage("Email already exists!");
      setLoading(false);
      return;
    }
    const hash = bcrypt.hashSync(values?.createPassword, 10);
    const userData: Omit<IUserData, "id"> = {
      email: values?.email,
      firstName: values?.fullName?.split(" ")[0],
      lastName: values?.fullName?.split(" ").slice(1).join(" "),
      hash,
    };
    const userValue = addUser(userData);
    dispatch({
      type: Types.SET_CURRENT_USER,
      payload: {...userValue, hash: ""}
    });
    dispatch({
      type: Types.SET_NOTIFICATION,
      payload: { type: NotificationTypes.Success, message: "Sign Up Success!" }
    });
    setLoading(false);
    navigate(routes.landing.path);
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