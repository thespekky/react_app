import { Link, useResolvedPath, useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect } from "react";
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      <nav className="navbar bg-stone-800 text-white flex justify-between items-stretch">
        <Link to={"/"} className="text-5x1 title">
          Fő oldal
        </Link>
        <ul className="p-0 m-0 list-none flex gap-3.5">
          {isLoggedIn ? <CostumeLink to="/valami">valami</CostumeLink> : <></>}
        </ul>
        <ul className="p-0 m-0 list-none flex gap-3.5">
          {<CostumeLink to="/valami">valami</CostumeLink>}
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
