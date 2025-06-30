import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface DataType {
  email: string;
  password: string;
}

interface ValidateOnSubmitReturnType {
  isValid: boolean;
  error: Record<string, string | null>;
}

interface ContextType {
  data: DataType;
  newError: Record<string, string | null>;
  setFormData: (formData: DataType) => void;
  registor: (validators: Record<string, (val: any) => string | null>) => void;
  validateOnSubmit: () => ValidateOnSubmitReturnType;
}

const FromContext = createContext<ContextType | null>(null);

export const FormProvider = ({ children }) => {
  const [data, setDate] = useState({} as DataType);
  const [validator, setValidator] = useState({});
  const [error, setError] = useState<Record<string, string | null>>({});

  const setFormData = useCallback((formData: DataType) => {
    setDate(formData);
    console.log(formData);
  }, []);

  const registor = useCallback(
    (validation: Record<string, (val: any) => string | null>) => {
      setValidator(validation);
    },
    []
  );

  let newError: Record<string, string | null> = {};
  const validateOnSubmit = useCallback(() => {
    newError = {};
    Object.entries(validator).forEach(([name, validateFn]) => {
      // const fieldValidator: funType = {name, validateFn}
      const error = (validateFn as (val: any) => string | null)(
        data[name as keyof DataType]
      );

      if (error) newError[name] = error;
    });
    // setError(newError);
    return { isValid: Object.keys(newError).length === 0, error: newError };
  }, [data, validator]);

  return (
    <FromContext.Provider
      value={{ data, newError, setFormData, registor, validateOnSubmit }}
    >
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
