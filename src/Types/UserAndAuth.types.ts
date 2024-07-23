import { ReactNode } from "react";

export interface UserI {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  likedReviews: string[];
}

export interface UserChangeI {
  password: string;
  newPassword?: string;
  newUsername?: string;
}
export interface RegisteredUserI {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserDataI {
  email: string;
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
