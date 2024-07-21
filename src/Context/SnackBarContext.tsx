import { createContext, ReactNode, useContext, useState } from "react";
import {
  displaySnackBarProps,
  SnackBarType,
} from "../Types/UI_Components.types";

interface SnackBarCtxProviderProps {
  children: ReactNode;
}

interface SnackBarContextType {
  snackBar: SnackBarType;
  setSnackBar: React.Dispatch<React.SetStateAction<SnackBarType>>;
  displaySnackBar: (props: displaySnackBarProps) => void;
  closeSnackBar: () => void;
}

export const SnackBarContext = createContext<SnackBarContextType>({
  snackBar: {
    display: false,
    label: "",
    context: "",
    closeManually: false,
    className: "",
    snackbarType: "",
  },
  setSnackBar: () => {},
  displaySnackBar: () => {},
  closeSnackBar: () => {},
});

export function SnackBarCtxProvider({ children }: SnackBarCtxProviderProps) {
  const [snackBar, setSnackBar] = useState<SnackBarType>({
    display: false,
    label: "",
    context: "",
    closeManually: false,
    className: "",
    snackbarType: "success",
  });

  function displaySnackBar(props: displaySnackBarProps) {
    const { label, context, closeManually, className, snackbarType } = props;

    setSnackBar((prev) => {
      return {
        ...prev,
        display: true,
        label: label || "",
        context: context || "",
        closeManually: closeManually || false,
        className: className || prev.className,
        snackbarType: snackbarType || "success",
      };
    });
  }

  function closeSnackBar() {
    setSnackBar((prev) => {
      return {
        ...prev,
        display: false,
        snackbarType: "success",
        closeManually: false,
      };
    });
  }

  return (
    <SnackBarContext.Provider
      value={{ snackBar, setSnackBar, displaySnackBar, closeSnackBar }}
    >
      {children}
    </SnackBarContext.Provider>
  );
}

export function useSnackBar() {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
