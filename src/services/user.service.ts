import { isAxiosError } from "axios";
import { UserI } from "../Types/UserAndAuth.types.js";
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

async function deleteUser(userId: string): Promise<string> {
  try {
    const { data } = await api.delete<string>(`user/${userId}`);
    return data;
  } catch (error) {
    console.log(`users.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function editUser(
  userId: string,
  changes: Partial<UserI>
): Promise<UserI> {
  try {
    const { data } = await api.patch<UserI>(`user/${userId}`, changes);
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
};
