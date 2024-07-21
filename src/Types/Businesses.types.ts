export interface ReviewI {
  _id?: string;
  title: string;
  description: string;
  username: string;
  userID: string;
  rating: number;
  bussiness: string; //id
  likes: number;
  createdAt?: string; // should be mandatory
}

export interface BussinessI {
  _id: string;
  name: string;
  about: string;
  reviews: ReviewI[]; // ids
  categories: string;
  avgRating: number;
  phone: string;
  email: string;
  district: string;
  city: string;
  street: string;
}

export interface BusinessesLayoutProps {
  businessesList: BussinessI[];
}
export interface BussinessItemProps {
  bussiness: BussinessI;
}
export interface ReviewProps {
  curReview: ReviewI;
  setBussiness: React.Dispatch<
    React.SetStateAction<BussinessI | null | undefined>
  >;
}
