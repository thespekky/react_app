import { createContext, useRef, useState, useEffect } from "react";

const AlertContext = createContext();

export const AlertPRovider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const timeReft = useRef(null);

  useEffect(() => {
    if (timeReft.current) {
      clearTimeout(timeReft.current);
    }
    timeReft.current = setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, [alert]);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
