import { useState, useEffect } from "react";

export const useSessionStorage = (key: string, intialValue: string) => {
  const [value, setValue] = useState(() => {
    return sessionStorage.getItem(key) || intialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
