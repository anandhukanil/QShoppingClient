import React from "react";
import { removeKeys } from "../../../helpers";
import { IFormFieldProps } from "../../../types";
import styles from "../../../components/styles.module.css";


const PasswordComponent: React.FC<IFormFieldProps&{onToggleReset: () => void}> = ({
  field, onChange, value, className, onToggleReset,
}) => {
  return (
    <>
      <label htmlFor={field.name}>
        {field.label}
        {field.required && <span className="required-star">*</span>}
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={className}
          type={field.fieldType}
          id={field.name}
          value={value}
          {...removeKeys([
            "fieldType", "customValidation", "validationRules", "skipValidation", "component", 
          ], field)}
          onChange={(e) => onChange(e, field.name)}
        />
        {field.tooltip && <span className={styles.tooltip} data-tooltip={field.tooltip}>i</span>}
      </div>
      <div className={styles.loginForgetPassWord}>
        <a href="#" className="link forgot-link" onClick={onToggleReset}>Forgot Password ?</a>
      </div>
    </>
  );
};

export default PasswordComponent;