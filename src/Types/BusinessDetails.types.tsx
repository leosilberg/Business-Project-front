import { BussinessI, ReviewI } from "./Businesses.types";

export interface ReviewProps {
  curReview: ReviewI;
  setBussiness: React.Dispatch<
    React.SetStateAction<BussinessI | null | undefined>
  >;
}

export interface AddReviewFormProps {
  businessID: string;
  setBusiness: React.Dispatch<
    React.SetStateAction<BussinessI | null | undefined>
  >;
  setOpenReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}
