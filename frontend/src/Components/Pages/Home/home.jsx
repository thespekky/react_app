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
const cookies = new Cookies();
export default function Home() {
  const { isLoggedIn } = useAuth();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (cookies.get("userData")) {
    }
  }, []);
  function alerts() {
    showAlert("Belépve", "success");
  }
  return (
    <>
      <Alert />
      <h1>Home</h1>
      {isLoggedIn}
      <button
        type="button"
        onClick={() => {
          showAlert("Belépve", "success");
        }}
      >
        Belépve
      </button>
    </>
  );
}
