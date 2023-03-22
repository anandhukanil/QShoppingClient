import React from "react";
import { signUpFields } from "../../../const/fields";
import FormComponent from "../../../components/FormComponent";
import "../styles.css";

const SignUpForm: React.FC<IProps> = ({onToggleForm}) => {
  return (
    <div className="login-form">
      <div className="login-form-inner">
        <FormComponent
          title="Sign Up"
          description="Join the shopping spree and never miss a deal!"
          submitButtonText="Sign Up"
          fields={signUpFields}
          onSubmit={() => null}
        />
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