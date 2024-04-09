import { Link, useResolvedPath, useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  let iisLoggedIn = true;
  return (
    <>
      <nav className="navbar bg-stone-800 text-white  grid items-center ">
        <div className="">
          <Link to={"/"} className="text-5x1 title ">
            Fő oldal
          </Link>
        </div>
        <div className="">
          <ul className="p-0 m-0 list-none flex max-lg:gap-0 gap-3.5">
            {iisLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="">
          <ul className="p-0 m-0 list-none row-span-3 col-span-1 flex max-lg:gap-0 gap-3.5">
            {iisLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className=" ">
          <ul className="p-0 m-0 list-none max-lg:gap-0 gap-3.5">
            {iisLoggedIn ? (
              <CostumeLink to="/valami">valami</CostumeLink>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <ul className="p-0 m-0 list-none flex  max-lg:gap-0 gap-3.5">
          {iisLoggedIn ? <CostumeLink to="/valami">valami</CostumeLink> : <></>}
        </ul>
        <ul className="p-0 m-0 list-none flex max-lg:gap-0 gap-3.5">
          {iisLoggedIn ? <CostumeLink to="/valami">valami</CostumeLink> : <></>}
        </ul>

        <ul className="p-0 m-0 list-none max-lg:col-start-9 col-start-10">
          {!isLoggedIn ? (
            <CostumeLink to="/Reg">Regisztráció</CostumeLink>
          ) : (
            <></>
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
