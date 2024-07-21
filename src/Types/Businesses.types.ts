export interface BussinessAddressI {
  district: string;
  city: string;
  street: string;
}

export interface BussinessContactI {
  phone: string;
  email: string;
}

export interface ReviewI {
  _id: string;
  title: string;
  description: string;
  username: string;
  userID: string;
  bussiness: string; //id
  likes: number;
  createdAt?: string; // should be mandatory
}

export interface BussinessI {
  _id: string;
  name: string;
  about: string;
  reviews: ReviewI[];
  contact: BussinessContactI;
  location: BussinessAddressI;
  createdAt?: string;
  updatedAt?: string;
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
