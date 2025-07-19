import { createContext, ReactNode, useContext } from "react";

interface FromContextChildrenType {
  children: ReactNode;
}

interface DataType {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}

interface ValidateOnSubmitReturnType {
  isValid: boolean;
  error: Record<string, string | null>;
}

interface ContextType {
  validateOnSubmit: (
    overrideData: DataType,
    validator: Record<string, (val: any) => string | null>
  ) => ValidateOnSubmitReturnType;
}

const FromContext = createContext<ContextType | null>(null);

export const FormProvider = ({ children }: FromContextChildrenType) => {
  const validateOnSubmit = (
    overrideData: DataType,
    validator: Record<string, (val: any) => string | null>
  ) => {
    const data = overrideData;
    const newError: Record<string, string | null> = {};
    Object.entries(validator).forEach(([name, validateFn]) => {
      let error;
      if (name == "confirmPassword") {
        // In validateOnSubmit(formData, validate), you pass all form fields including password and confirmPassword but it will not receive the password field — and therefore, will always fail the comparison: That's we are using if else explicitly passing password as parameter.
        error = (validateFn as (val: any, val2: any) => string | null)(
          data[name as keyof DataType],
          data["password"]
        );
      } else {
        error = (validateFn as (val: any) => string | null)(
          data[name as keyof DataType]
        );
      }

      if (error) newError[name] = error;
    });

    return { isValid: Object.keys(newError).length === 0, error: newError };
  };

  return (
    <FromContext.Provider value={{ validateOnSubmit }}>
      {children}
    </FromContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FromContext);
  if (!context) {
    throw new Error("Context needed");
  }
  return context;
};
