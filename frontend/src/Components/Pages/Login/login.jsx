import { React, useEffect, useContext } from "react";

import Cookies from "universal-cookie";
import { useAuth } from "../../AuthContext/AuthContext";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../FetchData/fetchData";
const cookies = new Cookies();
export default function Login() {
  const { login } = useAuth();
  const { loggedUser, setUser } = useAuth();
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
  async function LoginForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("email") === "" || formData.get("password") === "") {
      showAlert("Nem adtál meg minden adatot", "warning");
      return;
    }
    const body = {
      email: formData.get("email"),
      password: CryptoJS.SHA1(formData.get("password")).toString(),
    };

    const data = await LoginUser("/login", body);
    if (data.success) {
      login({
        username: data.user[0].username,
        name: data.user[0].name,
        email: data.user[0].email,
        admin: data.user[0].admin,
        authtoken: data.token,
      });
    } else {
      showAlert(data.message, "danger");
    }
  }
  return (
    <>
      <Alert />
      <div className="regdiv">
        <form onSubmit={LoginForm} className=" bg-slate-500 w-96 p-3">
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
