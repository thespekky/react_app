import React, {
  useEffect,
  useState,
  Suspense,
  useRef,
  useContext,
} from "react";
//import image from "./image.png";
import image from "../../../../../images/image.png";
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
    setTimeout(() => {}, 100);
    const data = await GetAllData("/getallKosarasok");
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
      <div className="flex flex-wrap md:justify-center flex-row w-full font-serif">
        {data.map((kosarasok) => (
          <div
            className="grid grid-cols-2 w-1/5 min-w-48 md:min-w-full md:grid-cols-4 border-2 rounded-md border-solid border-slate-500 p-0 m-1"
            key={kosarasok.ID}
          >
            <div className=" max-w-48 max-h-48 relative">
              <img
                src={image}
                className=" w-auto h-auto object-cover rounded-lg"
              ></img>
            </div>
            <div className=" m-1">
              <div className=" mt-1">{kosarasok.name}</div>
              <div className=" mt-1">Született: {kosarasok.bdate}</div>
              <div className=" mt-1">csapat: {kosarasok.team}</div>
            </div>
            <div className="col-span-2 md:row-span-1 mt-2">
              {kosarasok.introduction}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
