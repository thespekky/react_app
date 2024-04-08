import { React, useEffect } from "react";

import Cookies from "universal-cookie";
import { useAuth } from "../../AuthContext/AuthContext";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useNavigate } from "react-router-dom";
import { Register } from "../../FetchData/fetchData";
const cookies = new Cookies();
export default function Reg() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.get("userData")) {
      navigate("/");
    }
  }, []);
  async function Reg(e) {
    e.prevetDefault();
  }
  return (
    <>
      <Alert />
      <div className="regdiv">
        <form onSubmit={Reg} className="bg-gray-600 w-96 p-3 reg-form-height">
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            className="p-4"
            // ref={Email}
            name="email"
          />
          <br />
          <label htmlFor="">Jelszó</label>
          <br />
          <input
            type="password"
            className="p-4"
            // ref={Password}
            name="password"
          />
          <br />
          <label htmlFor="">Jelszó még egszer</label>
          <br />
          <input
            type="password"
            className="p-4"
            //ref={Password2}
            name="password"
          />
          <br />
          <label htmlFor="">Kereszt név</label>
          <br />
          <input
            type="text"
            className="p-4"
            //ref={Keresztnev}
            name="Keresztnev"
          />
          <br />
          <label htmlFor="">Vezeték név</label>
          <br />
          <input
            type="text"
            className="p-4"
            //ref={Vezeteknev}
            name="Vezeteknev"
          />
          <br />
          <label htmlFor="">Felhasználó név</label>
          <br />
          <input
            type="text"
            className="p-4"
            //ref={Felhnev}
            name="Felhnev"
          />
          <input
            type="submit"
            className=" my-4 w-40 flex self-center justify-center bg-sky-500 text-white"
            value="Regisztráció"
          />
        </form>
      </div>
    </>
  );
}
