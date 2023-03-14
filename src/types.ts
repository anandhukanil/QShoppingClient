import { IconType } from "react-icons/lib";

export interface IMenuItem {
  label: string;
  icon: IconType;
  path: string;
  onClick?: () => void;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface IProduct {
  // id: number;
  // title: string;
  // description: string;
  // price: number;
  // discountPercentage: number;
  // rating: number;
  // stock: number;
  // brand: string;
  // category: string;
  // thumbnail: string;
  // images: string[];

  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
}

export enum Types {
  // Product Actions 
  GET_ALL_PRODUCTS = "get_all_products",
  GET_PRODUCT_DETAILS = "get_product_details",

  // User Actions
  USER_LOGIN = "user_login",
  USER_LOGOUT = "user_logout",
  USER_SIGNUP = "user_signup",
  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
  ADD_TO_WISHLIST = "add_to_wishlist",
  REMOVE_FROM_WISHLIST = "remove_from_wishlist",

  CATCH_EXCEPTIONS = "catch_exceptions",
}

export enum SliceNames {
  Products = "Products",
  Users = "Users"
}

export interface IProductState {
  products: IProduct[];
  selectedProduct: IProduct|undefined;
  error: string;
}

export interface IUserState {
  currentUser: IUser|undefined;
  cartItems: { item: IProduct, count: number }[];
  wishListItems: IProduct[];
  error: string;
}

export interface IState {
  products: IProductState;
  users: IUserState
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
  [key: string]: IRoute & { children: IRoute[]};
}