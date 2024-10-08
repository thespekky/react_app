import { useEffect, useContext } from "react";

import Cookies from "universal-cookie";
import { useAuth } from "../../AuthContext/AuthContext";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../FetchData/fetchData";
const cookies = new Cookies();
export default function Login() {
  const { login } = useAuth();
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
      password: formData.get("password"),
    };

    const data = await LoginUser("/login", body);
    if (data.success) {
      login({
        id: data.user.ID,
        username: data.user.username,
        name: data.user.name,
        email: data.user.email,
        admin: data.user.admin,
        authtoken: data.token,
        refreshtoken: data.refreshtoken,
      });
    } else {
      showAlert(data.message, "danger");
    }
  }
  return (
    <>
      <Alert />
      <div className="regdiv">
        <form onSubmit={LoginForm} className="w-96 bg-slate-500 p-3">
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
              className="my-4 mr-2 w-40 bg-sky-500 text-white hover:cursor-pointer"
              value="Belépés"
            />
            <input
              type="button"
              className="my-4 mr-2 w-40 bg-sky-500 text-white hover:cursor-pointer"
              value="Regisztráció"
              onClick={() => navigate("/reg")}
            />
          </div>
        </form>
      </div>
    </>
  );
}
