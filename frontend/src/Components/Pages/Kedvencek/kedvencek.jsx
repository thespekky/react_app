import Cookies from "universal-cookie";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useAuth } from "../../AuthContext/AuthContext";
import { useContext } from "react";
const cookies = new Cookies();
export default function Kedvencek() {
  const { isLoggedIn } = useAuth();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  return (
    <>
      <Alert />
      <div>
        <h1>Kedvencek</h1>
      </div>
    </>
  );
}
