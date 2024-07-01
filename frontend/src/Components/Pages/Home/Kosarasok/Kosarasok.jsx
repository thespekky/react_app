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
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
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
      {data.map((kosarasok) => (
        <div
          className="shadow-md shadow-slate-600 grid grid-cols-2 w-[380px] md:w-full md:pr-4 md:grid-cols-4 border-2 rounded-md border-solid border-slate-500 p-0 m-1 mr-3"
          key={kosarasok.ID}
        >
          <div className=" max-w-48 max-h-48 relative">
            <img
              src={image}
              className=" w-auto h-auto object-cover rounded-[12px] pl-1 pt-1"
            ></img>
          </div>
          <div className=" m-1 p-1">
            <div className=" mt-1 tracking-wide">{kosarasok.name}</div>
            <div className=" mt-1 tracking-wide">
              Született: {kosarasok.bdate}
            </div>
            <div className=" mt-1 tracking-wide">csapat: {kosarasok.team}</div>
          </div>
          <div className="p-2 col-span-2 md:row-span-1 mt-2 leading-7 tracking-wide">
            {kosarasok.introduction}
          </div>
        </div>
      ))}
    </>
  );
}
