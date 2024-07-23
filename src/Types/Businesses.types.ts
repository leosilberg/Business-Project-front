export interface ReviewI {
  _id: string;
  title: string;
  description: string;
  rating: number;
  username: string;
  businessId: string;
  userId: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}
export interface ReviewWithBusinessI extends ReviewI {
  business: BussinessI;
}

export interface NewReviewI {
  title: string;
  description: string;
  rating: number;
}

export interface BussinessI {
  _id: string;
  name: string;
  about: string;
  category: string;
  phone: string;
  email: string;
  district: string;
  city: string;
  street: string;
  // reviews?: ReviewI[]; // ids
  avgRating: number;
}

export interface BusinessesLayoutProps {
  businessesList: BussinessI[];
}
export interface BussinessItemProps {
  bussiness: BussinessI;
}
