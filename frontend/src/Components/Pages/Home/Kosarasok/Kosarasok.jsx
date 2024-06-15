import { GetAllData } from "../../../FetchData/fetchData";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext/AuthContext";
import Cookies from "universal-cookie";
import AlertContext from "../../../Alert/alert.context";
import { Alert } from "../../../Alert/Alert";
import image from "../image.png";
import React, {
  useEffect,
  useState,
  Suspense,
  useRef,
  useContext,
} from "react";
const cookies = new Cookies();
export default function Kosarasok() {
  const { isLoggedIn } = useAuth();
  const [data, setData] = useState([]);
  const [, sertAlert] = useContext(AlertContext);
  function wait(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const GetData = async () => {
    await wait(1000);
    const data = await GetAllData("/getallKosarasok");
    if (data.success) {
      setData(data.users);
    } else {
      showAlert(data.message, "danger");
    }
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      GetData();
    }
  }, []);
  return (
    <>
      <Alert />
      <Suspense fallback={<div>Adat betöltése...</div>}>
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
      </Suspense>
    </>
  );
}
