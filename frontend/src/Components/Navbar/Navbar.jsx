import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
import { Refreshtoken } from "../FetchData/fetchData";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  let iisLoggedIn = true;
  const TokenValidálás = async () => {
    //console.log(cookies.get("userData"));
    if (cookies.get("userData") != null) {
      //console.log(cookies.get("userData").authtoken);
      let body = {
        refreshtoken: cookies.get("userData").refreshtoken,
        authtoken: cookies.get("userData").authtoken,
        email: cookies.get("userData").email,
      };
      //console.log(body);
      const data = await Refreshtoken(body);
      //console.log(data);
      if (data.success && data.changed) {
        const userDataCookie = cookies.get("userData");
        //console.log(userDataCookie);
        userDataCookie.authtoken = data.token;
        cookies.set("userData", userDataCookie, { path: "/" });
      } else {
        // console.log(data.message);
      }
      //console.log(cookies.get("userData").authtoken);
    }
  };
  useEffect(() => {
    TokenValidálás();
  }, []);

  return (
    <>
      <nav className="navbar bg-stone-800 text-white grid items-center ">
        <div className="">
          <Link to={"/"} className="text-5x1 title flex justify-start ">
            Fő oldal
          </Link>
        </div>
        <div className="">
          <ul className="p-0 m-0 list-none flex justify-center max-lg:gap-0 gap-3.5">
            {iisLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="">
          <ul className="p-0 m-0 list-none row-span-3 col-span-1 flex justify-center max-lg:gap-0 gap-3.5">
            {iisLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className=" ">
          <ul className="p-0 m-0 list-none max-lg:gap-0 flex justify-center gap-3.5">
            {iisLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <ul className="p-0 m-0 list-none max-lg:col-start-9 flex justify-end col-start-10">
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
          ? "h-full p-1 flex items-center active text-inherit"
          : "flex p-1 items-center h-full text-inherit"
      }
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
