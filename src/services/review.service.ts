import { isAxiosError } from "axios";
import { NewReviewI, ReviewI } from "../Types/Businesses.types.js";
import api from "./api.js";

async function getReviews(
  businessId: string,
  abortController?: AbortController
): Promise<ReviewI[]> {
  try {
    const { data: reviews } = await api.get<ReviewI[]>(
      `business/${businessId}/reviews`,
      {
        signal: abortController?.signal,
      }
    );
    return reviews;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function getReview(
  reviewId: string,
  abortController?: AbortController
): Promise<ReviewI> {
  try {
    const { data: review } = await api.get<ReviewI>(`review/${reviewId}`, {
      signal: abortController?.signal,
    });
    return review;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function createReview(
  newReview: NewReviewI,
  businessId: string,
  abortController?: AbortController
): Promise<ReviewI> {
  try {
    const { data } = await api.post<ReviewI>(
      "review/business/" + businessId,
      newReview,
      {
        signal: abortController?.signal,
      }
    );
    return data;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function deleteReview(
  reviewId: string,
  abortController?: AbortController
): Promise<string> {
  try {
    const { data } = await api.delete<string>(`review/${reviewId}`, {
      signal: abortController?.signal,
    });
    return data;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function editReview(
  reviewId: string,
  changes: NewReviewI,
  abortController?: AbortController
): Promise<ReviewI> {
  try {
    const { data } = await api.patch<ReviewI>(`review/${reviewId}`, changes, {
      signal: abortController?.signal,
    });
    return data;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function likeReview(
  reviewId: string,
  abortController?: AbortController
): Promise<ReviewI> {
  try {
    const { data } = await api.post<ReviewI>(`review/${reviewId}/like`, {
      signal: abortController?.signal,
    });
    return data;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}

async function removeLikeReview(
  reviewId: string,
  abortController?: AbortController
): Promise<ReviewI> {
  try {
    const { data } = await api.delete<ReviewI>(`review/${reviewId}/like`, {
      signal: abortController?.signal,
    });
    return data;
  } catch (error) {
    console.log(`reviews.service: `, error);
    if (isAxiosError(error))
      throw error.response?.data ? error.response.data : error.message;
    else throw (error as Error).message;
  }
}
export const ReviewsService = {
  getReviews,
  deleteReview,
  editReview,
  getReview,
  createReview,
  likeReview,
  removeLikeReview,
};
