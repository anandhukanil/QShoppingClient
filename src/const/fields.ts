import { FieldTypes, IFormField } from "../types";


const securityQuestions: {label: string, value: string}[] = [
  {label: "In what city were you born?", value: "1"},
  {label: "What is the name of your favorite pet?", value: "2"},
  {label: "What is your mother's maiden name?", value: "3"},
  {label: "What high school did you attend?", value: "4"},
  {label: "What was the name of your elementary school?", value: "5"}
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
    fieldType: FieldTypes.Select,
    name: "securityQuestion",
    placeholder: "Your security question.",
    label: "Security Question",
    required: true,
    options: securityQuestions,
  },
  {
    fieldType: FieldTypes.Text,
    name: "securityAnswer",
    label: "Answer",
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

const mobileNumberValidation: IFormField["customValidation"] = (values) => {
  const response = { success: true, error: ""};
  if (values?.mobileNumber && !values?.mobileNumber?.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
    response.success = false;
    response.error = "Mobile number is invalid";
  
  }
  return response;
};

export const profileFields: IFormField[] = [
  {
    fieldType: FieldTypes.Text,
    name: "firstName",
    placeholder: "First Name",
    label: "First Name",
    required: true,
    validationRules: { minLength: 3 },
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
    customValidation: mobileNumberValidation,
  },
  {
    fieldType: FieldTypes.Number,
    name: "age",
    placeholder: "21",
    label: "Age",
    min: 18,
  },
];

export const addressFields: IFormField[] = [
  {
    fieldType: FieldTypes.Text,
    name: "addressLine1",
    label: "Address Line 1",
    required: true,
    validationRules: { minLength: 4 },
  },
  {
    fieldType: FieldTypes.Text,
    name: "city",
    label: "City",
    required: true,
    validationRules: { minLength: 2 }
  },
  {
    fieldType: FieldTypes.Text,
    name: "state",
    label: "State",
    required: true,
    validationRules: { minLength: 2 }
  },
  {
    fieldType: FieldTypes.Number,
    name: "pinCode",
    label: "Pin Code",
    min: 0,
    required: true,
    validationRules: { minLength: 5 }
  },
];

export const passwordResetFields: IFormField[] = [
  {
    fieldType: FieldTypes.Email,
    name: "username",
    label: "Email",
    placeholder: "someone@example.com",
    required: true,
  },
  {
    fieldType: FieldTypes.Select,
    name: "securityQuestion",
    placeholder: "Your security question.",
    label: "Security Question",
    required: true,
    options: securityQuestions,
  },
  {
    fieldType: FieldTypes.Text,
    name: "securityAnswer",
    label: "Answer",
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
  }
];