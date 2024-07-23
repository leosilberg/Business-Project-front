import { ReviewWithBusinessI } from "@/Types/Businesses.types.js";
import { isAxiosError } from "axios";
import { UserChangeI, UserI } from "../Types/UserAndAuth.types.js";
import api from "./api.js";

async function getUser(): Promise<UserI> {
  try {
    const { data: user } = await api.get<UserI>(`user`);
    return user;
  } catch (error) {
    console.log(`users.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function getUserReviews(): Promise<ReviewWithBusinessI[]> {
  try {
    const { data } = await api.get<ReviewWithBusinessI[]>(`user/reviews`);
    return data;
  } catch (error) {
    console.log(`users.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function deleteUser(): Promise<string> {
  try {
    const { data } = await api.delete<string>(`user`);
    return data;
  } catch (error) {
    console.log(`users.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function editUser(changes: UserChangeI): Promise<UserI> {
  try {
    const { data } = await api.patch<UserI>(`user`, changes);
    return data;
  } catch (error) {
    console.log(`users.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

export const UsersService = {
  deleteUser,
  editUser,
  getUser,
  getUserReviews,
};
