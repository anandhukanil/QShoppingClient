import { IconType } from "react-icons/lib";
export interface IMenuItem {
  label: string;
  path: string;
  icon?: IconType;
  onClick?: () => void;
  element?: React.FC;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  // id: number;
  // title: string;
  // price: number;
  // description: string;
  // category: string;
  // image: string;
  // rating: Rating;
}

export interface IAddress {
  addressLine1: string;
  city: string;
  state: string;
  pinCode: number;
}
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  age?: number;
  address?: IAddress;
  securityQuestion?: string;
  securityAnswer?: string;
}

export interface IUserData extends IUser {
  hash: string;
  cartItems: {item: IProduct; count: number;}[];
  wishlistItems: IProduct[];
  orders: { items: {item: IProduct; count: number;}[], ordered: string, _id: string }[];
}

export enum Types {
  // Product Actions 
  GET_ALL_PRODUCTS = "get_all_products",
  GET_PRODUCT_DETAILS = "get_product_details",
  SET_DATA_LOADING = "set_data_loading",

  // User Actions
  SET_CURRENT_USER = "set_current_user",
  USER_LOGOUT = "user_logout",
  USER_LOGIN = "user_login",
  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
  SET_CART_ITEMS = "set_cart_items",
  // ADD_TO_WISHLIST = "add_to_wishlist",
  // REMOVE_FROM_WISHLIST = "remove_from_wishlist",
  CHECKOUT_CART_ITEMS = "checkout_cart_items",

  //Notification Actions
  SET_NOTIFICATION = "set_notification",
  CLEAR_NOTIFICATION = "clear_notification",

  TOKEN_REFRESH = "token_refresh",

  CATCH_EXCEPTIONS = "catch_exceptions",
}

export enum SliceNames {
  Products = "Products",
  Users = "Users",
  Notification = "Notification"
}

export enum NotificationTypes {
  Success = "success",
  Error = "error",
  Info = "info"
}

export interface INotificationState {
  type: NotificationTypes;
  message: string;
  error: string;
}

export interface IProductState {
  products: IProduct[];
  selectedProduct: IProduct|undefined;
  dataLoading: boolean;
  error: string;
}


export interface IUserState {
  currentUser: IUserData|undefined;
  refreshToken: string;
  accessToken: string;
  cartItems: { item: IProduct, count: number }[];
  error: string;
}

export interface IState {
  products: IProductState;
  users: IUserState;
  notification: INotificationState;
}

export interface IAction {
  type: Types;
  payload?: unknown;
}

export interface IRoute {
  path: string;
  name: string;
  element: React.ReactElement;
}

export interface IRoutes {
  [key: string]: (IRoute & { children: IRoute[], protected?: boolean });
}

export enum FieldTypes {
  Text = "text",
  Number = "number",
  Password = "password",
  Email = "email",
  Select = "select",
  Submit = "submit",
}

export interface IFormFieldProps {
  id:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  field: IFormField;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  className: string;
}
export interface IFormField {
  fieldType: FieldTypes;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; value?: any;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  component?: React.FC<IFormFieldProps>;
  validationRules?: {
    minLength?: number;
    maxLength?: number;
  };
  customValidation?: (values: Record<string, string>, name: string) => ({success: boolean, error: string});
  tooltip?: string;
  skipValidation?: boolean;
  options?: { label: string, value: string}[];
}

export enum LocalData {
  RefreshToken = "rfToken"
}