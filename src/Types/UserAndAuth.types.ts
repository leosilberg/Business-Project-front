import { ReactNode } from "react";

export interface UserI {
  _id: string;
  username: string;
  email: string;
  likedReviews: string[]; // Reviews IDs
  createdAt?: string;
  updatedAt?: string;
}
export interface RegisteredUserI {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserDataI {
  username: string;
  password: string;
}

export interface ChildrenPropsI {
  children: ReactNode;
}

export interface UserContextType {
  loggedInUser: UserI | undefined | null;
  token: undefined | null | string;
  loginUser: (userData: LoginUserDataI) => Promise<void>;
  logoutUser: () => void;
  register: (userData: RegisteredUserI) => Promise<void>;
  likeReview: (reviewID: string) => Promise<void>;
  dislikeReview: (reviewID: string) => Promise<void>;
}
