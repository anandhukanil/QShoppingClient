import { IUser } from "../types";

// TODO Change logic
export const logIn = (loginData: { userName: string, passWord: string }) => {
  const users: IUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");
  
  return users.find((user) => loginData?.userName === user.email && loginData.passWord === "password");
};

export const signUp = (data: IUser) => {
  const users: IUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");
  localStorage.setItem("users", JSON.stringify([...users, { ...data, id: users.length + 1}]));

  return { ...data, id: users.length+1 };
};
