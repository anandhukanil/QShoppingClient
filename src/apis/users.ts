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

export const addToUserCart = (data: {item: IProduct, count: number }, id: string) => (
  axios.post("/users/add-to-cart", {
    item: data,
    id,
  })
);

export const removeFromUserCart = (data: {item: IProduct, count: number }, id: string) => (
  axios.post("/users/remove-from-cart", {
    item: data,
    id,
  })
);

export const updateUserCart = (itemId: number, count: number, id: string) => (
  axios.post("/users/update-cart", {
    itemId,
    count,
    id,
  })
);