import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AutchContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    id: 0,
    username: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    if (cookies.get("userData")) {
      setIsLoggedIn(true);
      setLoggedUser({
        id: cookies.get("userData").id,
        username: cookies.get("userData").username,
        name: cookies.get("userData").name,
        email: cookies.get("userData").email,
      });
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const login = (datas) => {
    cookies.set("userData", datas, { path: "/" });
    isLoggedIn(true);
  };
  const logout = () => {
    if (isLoggedIn) {
      cookies.remove("userData", { path: "/" });
      setIsLoggedIn(false);
      navigate("/");
    }
  };
  return (
    <AutchContext.Provider value={{ login, logout, isLoggedIn, loggedUser }}>
      {children}
    </AutchContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AutchContext);
};
