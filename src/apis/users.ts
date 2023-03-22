import { IUser } from "../types";

// TODO Change logic
export const logIn = (loginData: { username: string, password: string }) => {
  const users: IUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");
  
  return users.find((user) => loginData?.username === user.email && loginData.password === "password");
};

export const signUp = (data: IUser) => {
  const users: IUser[] = JSON.parse(localStorage.getItem("users") ?? "[]");
  localStorage.setItem("users", JSON.stringify([...users, { ...data, id: users.length + 1}]));

  return { ...data, id: users.length+1 };
};
