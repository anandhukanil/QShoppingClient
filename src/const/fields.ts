import { FieldTypes, IFormField } from "../types";


export const loginFields: IFormField[] = [
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
    skipValidation: true
  },
];

const confirmPasswordValidation: IFormField["customValidation"] = (values) => {
  const response = { success: true, error: ""};
  if (!values?.confirmPassword || (values?.createPassword !== values?.confirmPassword)) {
    response.success = false;
    response.error = "Password must be same";
  
  }
  return response;
};

export const signUpFields: IFormField[] = [
  {
    fieldType: FieldTypes.Text,
    name: "fullName",
    placeholder: "Full Name",
    label: "Full Name",
    required: true,
    validationRules: { minLength: 4 },
  },
  {
    fieldType: FieldTypes.Email,
    name: "email",
    placeholder: "someone@example.com",
    label: "Email Address",
    required: true,
  },
  {
    fieldType: FieldTypes.Password,
    name: "createPassword",
    placeholder: "Minimum 8 characters",
    label: "Create Password",
    required: true,
    validationRules: { minLength: 8 },
    tooltip: "Your password must be at least 8 characters long and contain at least one uppercase letter,"
    + " one lowercase letter, one digit, and one special character."
  },
  {
    fieldType: FieldTypes.Password,
    name: "confirmPassword",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    required: true,
    validationRules: { minLength: 8 },
    customValidation: confirmPasswordValidation,
    tooltip: "Please re-enter your password to confirm it. The passwords must match to proceed."
  },
];

export const profileFields: IFormField[] = [
  {
    fieldType: FieldTypes.Text,
    name: "firstName",
    placeholder: "First Name",
    label: "First Name",
    required: true,
    validationRules: { minLength: 4 },
  },
  {
    fieldType: FieldTypes.Text,
    name: "lastName",
    placeholder: "Last Name",
    label: "Last Name",
  },
  {
    fieldType: FieldTypes.Text,
    name: "mobileNumber",
    placeholder: "+91 9876543210",
    label: "Mobile Number",
  },
  {
    fieldType: FieldTypes.Number,
    name: "age",
    placeholder: "21",
    label: "Age",
  },
];