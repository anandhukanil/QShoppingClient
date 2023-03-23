import React, { PropsWithChildren, useState } from "react";
import { removeKeys, validateEmail, validatePassword } from "../helpers";
import { FieldTypes, IFormField } from "../types";
import styles from "./styles.module.css";

const FormComponent: React.FC<PropsWithChildren<IProps>> = (props) => {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>(setInitialValues(props.fields, props.values));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const {success, errors} = validateFields(values, props.fields);
    if (!success) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    props.onSubmit(values);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setValues((prevState) => ({...prevState, [name]: e.target?.value }));
  };
  

  return (
    <form action="" onSubmit={onSubmit}>
      <h1>{props.title}</h1>
      {props.description && <p className="body-text">{props.description}</p>}
      {props.fields?.map((field) => (
        <div className="login-form-group" key={field.name}>
          <label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="required-star">*</span>}
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={field.className ?? (fieldErrors[field.name] && styles.errorField)}
              type={field.fieldType}
              id={field.name}
              value={values[field.name]}
              {...removeKeys(["fieldType", "customValidation", "validationRules", "skipValidation"], field)}
              onChange={(e) => onChangeHandler(e, field.name)}
            />
            {field.tooltip && <span className={styles.tooltip} data-tooltip={field.tooltip}>i</span>}
          </div>
          {fieldErrors[field.name] && <div className={styles.errorMessage}>{fieldErrors[field.name]}</div>}
        </div>
      ))}
      <button disabled={props.disableSubmit} className="rounded-button login-cta" type="submit">
        {props.submitButtonText||"Login"}
      </button>
      {props.children}
    </form>
  );
};

export default FormComponent;

export interface IProps {
  title: string;
  onSubmit: (values: Record<string, string>) => void;
  fields: IFormField[];
  values?: Record<string, string>;
  description?: string;
  submitButtonText?: string;
  disableSubmit?: boolean;
}

const validateFields = (values: Record<string, string>, fields: IFormField[]) => {
  const result: {success: boolean, errors: Record<string, string>} = { success: true, errors: {} };
  Object.keys(values).forEach((key) => {
    const field = fields.find((field) => field.name === key);

    if (field?.skipValidation) {
      return;
    }

    if (field?.customValidation) {
      const { success, error } = field.customValidation(values, key);
      if (!success) {
        result.success = success;
        result.errors[key] = error;
      }
    } else {
      switch (field?.fieldType) {
      case FieldTypes.Email:
        if (!validateEmail(values[key])) {
          result.success = false;
          result.errors[key] = "Enter a valid email address.";
        }
        break;
      case FieldTypes.Password:
        if (!validatePassword(values[key])) {
          result.success = false;
          result.errors[key] = `${field?.label} is not valid.`;
        }
        break;
      default:
        if (field?.required && (!values[key] || !`${values[key]}`.trim())) {
          result.success = false;
          result.errors[key] = `${field.label} is required.`;
        } else if (field?.validationRules
          && field?.validationRules.minLength
          && (`${values[key]}`.length < field?.validationRules.minLength)) {
          result.success = false;
          result.errors[key] = `Please enter at lease ${field?.validationRules.minLength} characters.`;
        } else if (field?.validationRules
          && field?.validationRules.maxLength
          && (`${values[key]}`.length > field?.validationRules.maxLength)) {
          result.success = false;
          result.errors[key] = `Only ${field?.validationRules.maxLength} characters are allowed.`;
        }
        break;
      }
    }
  });
    

  return result;
};

const setInitialValues = (fields: IFormField[], values?: Record<string, string>) => (fields
  .reduce((prevValue, currentValue) => (
    {...prevValue, [currentValue.name]: (values && values[currentValue.name] || "") }
  ), {}));