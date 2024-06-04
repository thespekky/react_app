import React, {
  useEffect,
  useState,
  Suspense,
  useRef,
  useContext,
} from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { GetAllData } from "../../FetchData/fetchData";
const cookies = new Cookies();
export default function Home() {
  const { isLoggedIn } = useAuth();
  const [, sertAlert] = useContext(AlertContext);
  const [data, setData] = useState([]);
  const GetData = async () => {
    const data = await GetAllData("/getusers");
    if (data.success) {
      setData(data.users);
    } else {
      showAlert(data.message, "danger");
    }
  };
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      GetData();
    }
  }, []);
  return (
    <>
      <Suspense fallback={<div>Adat betöltése...</div>}></Suspense>
      <Alert />
      <h1>Home</h1>
      {isLoggedIn}
      <button
        type="button"
        onClick={() => {
          showAlert("Belépve", "success");
        }}
      ></button>
      {data.map((user) => (
        <ul key={user.ID}>
          <li>{user.name}</li>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>{user.admin}</li>
        </ul>
      ))}
    </>
  );
}
