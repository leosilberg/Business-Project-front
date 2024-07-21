// import api from "../services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import { isAxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChildrenPropsI,
  LoginUserDataI,
  RegisteredUserI,
  UserContextType,
  UserI,
} from "../Types/UserAndAuth.types";
import api from "../services/api.ts";
import { UsersService } from "../services/user.service.ts";

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenPropsI) => {
  const [loggedInUser, setLoggedInUser] = useState<null | undefined | UserI>(
    undefined
  );
  const [token, setToken] = useLocalStorage<string | null>("jwt-taskify", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      // setLoggedInUser({
      //   _id: "string",
      //   username: "Eden",
      //   email: "string@gmail",
      //   likedReviews: ["r3", "r2", "r1"],
      // });
      try {
        const user = await UsersService.getUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(`AuthContext: `, (error as Error).message);
        logoutUser();
      }
    }

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (loggedInUser) navigate("/", { replace: true });
  }, [loggedInUser]);

  function logoutUser() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function loginUser(userData: LoginUserDataI) {
    try {
      const { data: token } = await api.post("/auth/login", userData);
      setToken(token);
    } catch (error) {
      console.log(`AuthContext: `, error);
      if (isAxiosError(error))
        throw error.response?.data ? error.response.data : error.message;
      else throw (error as Error).message;
    }
  }

  async function register(userData: RegisteredUserI) {
    try {
      const { data } = await api.post("/auth/register", userData);
    } catch (error) {
      console.log(`AuthContext: `, error);
      if (isAxiosError(error))
        throw error.response?.data ? error.response.data : error.message;
      else throw (error as Error).message;
    }
  }

  async function likeReview(reviewID: string) {
    // update user, bussiness and review data
    setLoggedInUser((prev) => {
      if (!prev) {
        throw new Error("Logged in user should not be null or undefined");
      }
      return { ...prev, likedReviews: [...prev.likedReviews, reviewID] };
    });
  }
  async function dislikeReview(reviewID: string) {
    // update user
    setLoggedInUser((prev) => {
      if (!prev) {
        throw new Error("Logged in user should not be null or undefined");
      }
      return {
        ...prev,
        likedReviews: prev.likedReviews.filter((rID) => rID !== reviewID),
      };
    });
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        token,
        loginUser,
        register,
        logoutUser,
        likeReview,
        dislikeReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
