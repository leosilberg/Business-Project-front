// import api from "../services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useState, useEffect, useContext } from "react";
import {
  ChildrenPropsI,
  LoginUserDataI,
  RegisteredUserI,
  UserContextType,
  UserI,
} from "../Types/UserAndAuth.types";

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: ChildrenPropsI) => {
  const [loggedInUser, setLoggedInUser] = useState<null | undefined | UserI>(
    undefined
  );
  const [token, setToken] = useLocalStorage<string | null>("jwt-taskify", null);

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      setLoggedInUser({
        _id: "string",
        username: "Eden",
        email: "string@gmail",
        likedReviews: ["r3", "r2", "r1"],
      });
      //   try {
      //     const response = await api.get("/auth/loggedInUser");
      //     setLoggedInUser(response.data);
      //   } catch (error: any) {
      //     if (error.response?.status === 401) {
      //       console.error("Invalid token, logging out");
      //       logoutUser();
      //     } else if (error.response?.status === 404) {
      //       console.error("User not found, logging out");
      //       logoutUser();
      //     } else {
      //       console.error("Error fetching user data:", error);
      //     }
      //   }
    }

    fetchUser();
  }, [token]);

  //   useEffect(() => {
  //     if (loggedInUser) navigate("/", { replace: true });
  //   }, [loggedInUser]);

  function logoutUser() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function loginUser(userData: LoginUserDataI) {
    setToken("1234");
    // try {
    //   const response = await api.post("/auth/login", userData);
    //   setToken(response.data.token);
    // } catch (error) {
    //   console.error("Error logging in:", error);
    // }
  }

  async function register(userData: RegisteredUserI) {
    // try {
    //   await api.post("/auth/register", userData);
    // } catch (error) {
    //   console.error("Error registering:", error);
    // }
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
