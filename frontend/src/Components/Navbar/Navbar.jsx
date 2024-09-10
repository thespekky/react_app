import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { Refreshtoken } from "../FetchData/fetchData";
import Cookies from "universal-cookie";
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { IconContext } from "react-icons";

const cookies = new Cookies();
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [darktheme, setDarkTheme] = useState(false);
  const TokenValidálás = async () => {
    if (cookies.get("userData") != null) {
      let body = {
        refreshtoken: cookies.get("userData").refreshtoken,
        authtoken: cookies.get("userData").authtoken,
        email: cookies.get("userData").email,
      };
      const data = await Refreshtoken(body);
      if (data.success && data.changed) {
        const userDataCookie = cookies.get("userData");
        userDataCookie.authtoken = data.token;
        cookies.set("userData", userDataCookie, { path: "/" });
      } else {
        // console.log(data.message);
      }
    }
  };
  useEffect(() => {
    let selectedTheme = localStorage.getItem("DarkTheme");
    if (selectedTheme) {
      if (selectedTheme === "true") {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        setDarkTheme(true);
      } else {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        setDarkTheme(false);
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkTheme(true);
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      setDarkTheme(false);
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    TokenValidálás();
  }, []);
  function ThemeChange() {
    if (darktheme == true) {
      setDarkTheme(false);
      localStorage.setItem("DarkTheme", false);
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      setDarkTheme(true);
      localStorage.setItem("DarkTheme", true);
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }

  return (
    <>
      <nav className="navbar grid grid-cols-12 items-center bg-backgroundcolor pb-10 pt-10 text-coloroftext hover:bg-backgroundcolor">
        <div className="">
          <Link
            to={"/"}
            className="text-5x1 title flex justify-start font-bold"
          >
            Fő oldal
          </Link>
        </div>
        <div className="">
          <ul className="max-lg:gap-0 m-0 flex list-none justify-center gap-3.5 p-1">
            {isLoggedIn ? (
              <CostumeLink to="/kedvencek">Kedvencek</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="">
          <ul className="max-lg:gap-0 col-span-1 row-span-3 m-0 flex list-none justify-center gap-3.5 p-1">
            {isLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className=" ">
          <ul className="max-lg:gap-0 m-0 flex list-none justify-center gap-3.5 p-1">
            {isLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <ul className="max-lg:col-start-9 col-start-11 m-0 flex list-none justify-end p-1">
          <li className="flex p-1">
            {!darktheme ? (
              <>
                <p className="mr-2">Sötét</p>
                <IconContext.Provider value={{ size: "25px" }}>
                  <MdDarkMode onClick={() => ThemeChange()} />
                </IconContext.Provider>
              </>
            ) : (
              <>
                <p className="mr-2">Világos</p>
                <IconContext.Provider value={{ size: "25px" }}>
                  <CiDark onClick={() => ThemeChange()} />
                </IconContext.Provider>
              </>
            )}
          </li>
        </ul>
        <ul className="max-lg:col-start-9 col-start-12 m-0 flex list-none justify-end p-1">
          {!isLoggedIn ? (
            <CostumeLink to={"/login"}>Belépés</CostumeLink>
          ) : (
            <CostumeLink to={"/logout"} onClick={logout}>
              Kilépés
            </CostumeLink>
          )}
        </ul>
      </nav>
    </>
  );
}
function CostumeLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li
      className={
        isActive
          ? "active flex h-full items-center p-1 text-inherit"
          : "flex h-full items-center p-1 text-inherit"
      }
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
