import axios, { isAxiosError } from "axios";
import { BussinessI } from "../Types/Businesses.types.js";
import api from "./api.js";
import { API_KEY } from "../secret.js";

async function getBusinesses(searchParams?: string): Promise<any> {
  try {
    const { data } = await api.get<BussinessI[]>(`business/${searchParams}`);
    return data;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function getBusiness(businessId: string): Promise<BussinessI> {
  try {
    const { data: business } = await api.get<BussinessI>(
      `business/${businessId}`
    );
    return business;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function getBusinessLocation(formmatedAddress: string) {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${formmatedAddress}&key=${API_KEY}`
    );
    const loc = data.results[0].geometry.location;
    return { data, loc };
  } catch (error) {
    throw error;
  }
}

async function createBusiness(form: FormData): Promise<string> {
  try {
    const { data } = await api.post<string>("business", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function deleteBusiness(businessId: string): Promise<string> {
  try {
    const { data } = await api.delete<string>(`business/${businessId}`);
    return data;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function editBusiness(
  businessId: string,
  changes: Partial<BussinessI>
): Promise<BussinessI> {
  try {
    const { data } = await api.patch<BussinessI>(
      `business/${businessId}`,
      changes
    );
    return data;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

export const BusinessesService = {
  getBusinesses,
  deleteBusiness,
  editBusiness,
  getBusiness,
  createBusiness,
  getBusinessLocation
};
