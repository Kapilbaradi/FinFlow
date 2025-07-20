import { ReactNode } from "react";

export interface FromContextChildrenType {
  children: ReactNode;
}

export interface DataType {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

interface ValidateOnSubmitReturnType {
  isValid: boolean;
  error: Record<string, string | null>;
}

export interface ContextType {
  validateOnSubmit: (
    overrideData: DataType,
    validator: Record<string, (val: any) => string | null>
  ) => ValidateOnSubmitReturnType;
}
