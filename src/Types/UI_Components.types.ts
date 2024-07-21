import { ReactNode } from "react";

export interface SnackBarType {
  display: boolean;
  label: string;
  context: string;
  closeManually: boolean;
  className: string;
  snackbarType: string;
}

export type SnackbarType = "success" | "danger";

export interface displaySnackBarProps {
  label: string;
  context?: string;
  closeManually?: boolean;
  className?: string;
  snackbarType?: SnackbarType;
}

export interface ModalProps {
  children: ReactNode;
  className?: string;
}

export interface SelectOptionsProps {
  selectTitle: string;
  selectValuePlaceholder: string;
  children: ReactNode;
}

export interface CustomSliderProps {
  defaultValue: number;
  maxValue: number;
  steps: number;
}
