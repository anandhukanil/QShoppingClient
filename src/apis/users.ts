import { generateUniqueId } from "../helpers";
import { IUser, IUserData, LocalData } from "../types";

export const getUsers = (): IUserData[] => {
  const users: IUserData[] = JSON.parse(localStorage.getItem(LocalData.Users) ?? "[]");
  
  return users;
};

export const getUserById = (id: string) => {
  const users: IUserData[] = getUsers();
  
  return users.find((user) => user.id === id) as IUserData;
};

export const getUser = (email: string): IUserData => {
  const users: IUserData[] = getUsers();
  
  return users.find((user) => user.email === email) as IUserData;
};

export const addUser = (user:  Omit<IUserData, "id">): IUserData => {
  const users: IUserData[] = getUsers();
  const userData = { ...user, id: generateUniqueId() };
  localStorage.setItem(LocalData.Users, JSON.stringify([...users, userData]));

  return userData;
};

export const updateUser = (user: IUser) => {
  const users = getUsers();
  const _user = users.find((_user) => user.email === _user.email);
  const userData: IUserData = {
    ...(!!_user && _user),
    ...user,
    hash: _user?.hash as string,
  };
  localStorage.setItem(LocalData.Users, JSON.stringify(users.map(
    (_data) => _data.email === userData.email ? userData : _data
  )));

  return userData;
};