import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Logout } from "../FetchData/fetchData";

const AutchContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    id: 0,
    username: "",
    name: "",
    email: "",
    admin: 0,
  });

  useEffect(() => {
    if (cookies.get("userData")) {
      setIsLoggedIn(true);
      setLoggedUser({
        id: cookies.get("userData").id,
        username: cookies.get("userData").username,
        name: cookies.get("userData").name,
        email: cookies.get("userData").email,
        admin: cookies.get("userData").admin,
      });
    }
  }, []);
  const navigate = useNavigate();

  const login = (datas) => {
    cookies.set("userData", datas, { path: "/" });
    setLoggedUser({
      id: datas.id,
      username: datas.username,
      name: datas.name,
      email: datas.email,
      admin: datas.admin,
    });
    setIsLoggedIn(true);
    navigate("/");
  };
  const logout = () => {
    if (isLoggedIn) {
      Logout({ email: loggedUser.email });
      cookies.remove("userData", { path: "/" });
      setIsLoggedIn(false);
      setLoggedUser({
        id: 0,
        username: "",
        name: "",
        email: "",
        admin: 0,
      });

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
