// import api from "../services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AxiosError, isAxiosError } from "axios";
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
import { useSnackBar } from "./SnackBarContext.tsx";

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenPropsI) => {
  const [loggedInUser, setLoggedInUser] = useState<null | undefined | UserI>(
    undefined
  );
  const { displaySnackBar } = useSnackBar();
  const [token, setToken] = useLocalStorage<string | null>("jwt-taskify", null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }
    async function fetchUser() {
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

  function logoutUser() {
    setToken(null);
    setLoggedInUser(null);
    navigate("/");
  }

  async function loginUser(userData: LoginUserDataI) {
    try {
      const { data: token } = await api.post("/auth/login", userData);
      setToken(token);
      displaySnackBar({
        label: "Welcome",
      });
      navigate("/");
    } catch (error) {
      console.log(`AuthContext: `, error);
      displaySnackBar({
        label: "Error in login proccess!",
        context: isAxiosError(error) ? error?.response?.data : "Error",
        closeManually: true,
        snackbarType: "danger",
      });
    }
  }

  async function register(userData: RegisteredUserI) {
    try {
      await api.post("/auth/register", userData);
      displaySnackBar({
        label: "You registered successfully",
      });
      navigate("/auth");
    } catch (error: any) {
      console.log(`AuthContext: `, error);
      displaySnackBar({
        label: "Error in register proccess!",
        context:
          error.response.status === 400
            ? "Sorry, User already exists"
            : "Sorry, Internal Error",
        closeManually: true,
        snackbarType: "danger",
      });
      if (isAxiosError(error))
        throw error.response?.data ? error.response.data : error.message;
      else throw (error as Error).message;
    }
  }

  async function likeReview(reviewID: string) {
    setLoggedInUser((prev) => {
      if (!prev) {
        throw new Error("Logged in user should not be null or undefined");
      }
      return { ...prev, likedReviews: [...prev.likedReviews, reviewID] };
    });
  }
  async function dislikeReview(reviewID: string) {
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
