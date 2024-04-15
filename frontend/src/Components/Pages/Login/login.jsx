import { React, useEffect, useContext } from "react";

import Cookies from "universal-cookie";
import { useAuth } from "../../AuthContext/AuthContext";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useNavigate } from "react-router-dom";
import { Register } from "../../FetchData/fetchData";
const cookies = new Cookies();
export default function Login() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      navigate("/");
    }
  }, []);
  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
  }
  return (
    <>
      <Alert />
      <div className="regdiv">
        <form onSubmit={login} className=" bg-slate-500 w-96 p-3">
          <label htmlFor="">Email</label>
          <br />
          <input type="email" className="p-4" name="email" />
          <br />
          <label htmlFor="">Jelszó</label>
          <br />
          <input type="password" className="p-4" name="password" />
          <br />

          <div>
            <input
              type="submit"
              className=" my-4 w-40 mr-2 hover:cursor-pointer bg-sky-500 text-white"
              value="Belépés"
            />
            <input
              type="button"
              className=" my-4 w-40 mr-2 hover:cursor-pointer bg-sky-500 text-white"
              value="Regisztráció"
              onClick={() => navigate("/reg")}
            />
          </div>
        </form>
      </div>
    </>
  );
}
