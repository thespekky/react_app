import { useEffect, useState, useContext, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { GetOneData } from "../../FetchData/fetchData";
import AlertContext from "../../Alert/alert.context";
import { Alert } from "../../Alert/Alert";
const cookie = new Cookies();

export default function Kosaras() {
  const [Kosaras, setKosaras] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const [, setAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    setAlert({
      text,
      type,
    });
  };
  const GetData = async () => {
    const data = await GetOneData("/kosarasok/" + id);
    if (data.kosaras) {
      setKosaras(data.kosaras[0]);
    } else {
      showAlert(data.message, "danger");
    }
  };
  useEffect(() => {
    if (!cookie.get("userData")) {
      navigate("/");
    } else {
      GetData();
    }
  }, []);
  return (
    <>
      <Alert />
      <Suspense fallback={<div>Adatok töltése</div>}></Suspense>
    </>
  );
}
