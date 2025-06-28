import { createContext, FormEvent, useContext, useState } from "react";

const FromContext = createContext<unknown>(null);

export const formProvider = ({ children, formData, onSubmit }) => {
  const [data, setDate] = useState({ formData });
  const [validator, setValidator] = useState({});
  const [error, setError] = useState({});

  const registor = (name, validateFn) => {
    setValidator({ ...validator, [name]: validateFn });
  };

  const validateOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newError = {};
    Object.entries(validator).forEach(([name, vFn]) => {
      const error = vFn(data[name]);
      if (error) newError[name] = error;
    });
    setError(newError);
    // if (Object.keys(newError).length === 0) {
    //   onSubmit(data);
    //   setDate({});
    // }
  };

  return (
    <FromContext.Provider value={{ data, error, registor, validateOnSubmit }}>
      {children}
    </FromContext.Provider>
  );
};

export const useForm = () => useContext(FromContext);
