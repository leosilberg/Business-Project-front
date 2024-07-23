import { ReviewI } from "./Businesses.types";

export interface ReviewProps {
  curReview: ReviewI;
}

export interface AddReviewFormProps {
  businessID: string;
  setOpenReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  currentReview?: ReviewI;
}
