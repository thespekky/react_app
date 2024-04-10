import { React, useEffect, useContext } from "react";

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
  async function Reg(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("password") == "" ||
      formData.get("password2") == "" ||
      formData.get("email") == "" ||
      formData.get("Keresztnev") == "" ||
      formData.get("Vezeteknev") == "" ||
      formData.get("Felhnev") == ""
    ) {
      showAlert("Nem adtál meg minden adatot", "warning");
      return;
    }
    if (formData.get("password") != formData.get("password2")) {
      showAlert("A jelszó nem egyezik", "warning");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.get("password"))) {
      showAlert(
        "A jelszó nem tartalmaz 8 karkaraktert vagy kicsi vagy nagybetűt",
        "warning"
      );
      return;
    }
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
      Keresztnev: formData.get("Keresztnev"),
      Vezeteknev: formData.get("Vezeteknev"),
      Felhnev: formData.get("Felhnev"),
    };
    const data = await Register("/reg", body);
    if (data.success) {
      showAlert(data.message, "success");
    } else {
      showAlert(data.message, "danger");
    }
  }
  return (
    <>
      <Alert />
      <div className="regdiv">
        <form onSubmit={Reg} className="bg-gray-600 w-96 p-3 reg-form-height">
          <label htmlFor="">Email</label>
          <br />
          <input type="email" className="p-4" name="email" />
          <br />
          <label htmlFor="">Jelszó</label>
          <br />
          <input type="password" className="p-4" name="password" />
          <br />
          <label htmlFor="">Jelszó még egszer</label>
          <br />
          <input type="password" className="p-4" name="password2" />
          <br />
          <label htmlFor="">Kereszt név</label>
          <br />
          <input type="text" className="p-4" name="Keresztnev" />
          <br />
          <label htmlFor="">Vezeték név</label>
          <br />
          <input type="text" className="p-4" name="Vezeteknev" />
          <br />
          <label htmlFor="">Felhasználó név</label>
          <br />
          <input type="text" className="p-4" name="Felhnev" />
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
