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
  selectName: string;
  selectTitle: string;
  selectValuePlaceholder: string;
  curValue?: string;
  children: ReactNode;
  onValueChange?: (value: string) => void;
}

export interface CustomSliderProps {
  onValueChange?: (value: number[]) => void;
  defaultValue: string;
  maxValue: number;
  steps: number;
}
