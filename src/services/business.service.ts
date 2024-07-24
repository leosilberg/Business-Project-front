import axios, { isAxiosError } from "axios";
import { BussinessI } from "../Types/Businesses.types.js";
import api from "./api.js";
import { API_KEY } from "../secret.js";

async function getBusinesses(
  searchParams?: string,
  abortController?: AbortController
): Promise<any> {
  try {
    const { data } = await api.get<BussinessI[]>(`business/${searchParams}`, {
      signal: abortController?.signal,
    });
    return data;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error)) {
      if (error.name === "CanceledError") {
        throw "AbortError";
      }
      throw error.response?.data ? error.response.data : error.message;
    } else throw (error as Error).message;
  }
}

async function getBusiness(
  businessId: string,
  abortController?: AbortController
): Promise<BussinessI> {
  try {
    const { data: business } = await api.get<BussinessI>(
      `business/${businessId}`,
      {
        signal: abortController?.signal,
      }
    );
    return business;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error)) {
      if (error.name === "CanceledError") {
        throw "AbortError";
      }
      throw error.response?.data ? error.response.data : error.message;
    } else throw (error as Error).message;
  }
}

async function getBusinessLocation(
  formmatedAddress: string,
  abortController?: AbortController
) {
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${formmatedAddress}&key=${API_KEY}`,
      {
        signal: abortController?.signal,
      }
    );
    const loc = data.results[0].geometry.location;
    return { data, loc };
  } catch (error) {
    throw error;
  }
}

async function createBusiness(
  form: FormData,
  abortController?: AbortController
): Promise<string> {
  try {
    const { data } = await api.post<string>("business", form, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController?.signal,
    });
    return data;
  } catch (error) {
    console.log(`business.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function deleteBusiness(
  businessId: string,
  abortController?: AbortController
): Promise<string> {
  try {
    const { data } = await api.delete<string>(`business/${businessId}`, {
      signal: abortController?.signal,
    });
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
  changes: Partial<BussinessI>,
  abortController?: AbortController
): Promise<BussinessI> {
  try {
    const { data } = await api.patch<BussinessI>(
      `business/${businessId}`,
      changes,
      {
        signal: abortController?.signal,
      }
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
  getBusinessLocation,
};
