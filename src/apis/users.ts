import axios from "axios";
import { IProduct, IUser } from "../types";


export const logOut = (user: IUser, token: string) => (
  axios.post("/auth/logout", {
    user,
    token
  })
);

export const login = (username: string, password: string) => (
  axios.post("/auth/login", {
    username,
    password
  })
);

export const googleLogin = (credential: string) => (
  axios.post("/auth/google-login", {
    credential,
  })
);

export const refreshToken = (token: string) => (
  axios.post("/auth/refresh", {
    refreshToken: token
  })
);

export const signup = (userData: IUser & {password: string}) => (
  axios.post("/auth/signup", {
    userData,
  })
);

export const updateUser = (data: IUser, id: string) => (
  axios.post("/users/update", {
    ...data,
    id,
  })
);

export const checkoutOrder = (data: {item: IProduct, count: number }[], id: string) => (
  axios.post("/users/checkout", {
    items: data,
    id,
  })
);

export const addToUserCart = (product: IProduct, id: string, count?: number) => (
  axios.post("/users/add-to-cart", {
    product,
    id,
    count
  })
);

export const removeFromUserCart = (product: IProduct, id: string, count?: number) => (
  axios.post("/users/remove-from-cart", {
    product,
    id,
    count
  })
);

export const wishlistItem = (item: IProduct, id: string, action: "add"|"remove" = "add") => (
  axios.post("/users/wishlist", {
    item,
    action,
    id,
  })
);

export const resetPassword = (username: string, password: string, securityQuestion: string, securityAnswer: string) => (
  axios.post("/auth/reset", {
    username,
    password,
    securityQuestion,
    securityAnswer,
  })
);