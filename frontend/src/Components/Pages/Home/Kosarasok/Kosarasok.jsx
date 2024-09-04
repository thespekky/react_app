import { GetAllData } from "../../../FetchData/fetchData";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import AlertContext from "../../../Alert/alert.context";
import { Alert } from "../../../Alert/Alert";
import image from "../image.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
Kosarasok.propTypes = {
  searchbar: PropTypes.any, // Change 'any' to the expected prop type if known
};
export default function Kosarasok({ searchbar = null }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  const GetData = async () => {
    //await wait(1000);
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
      {data
        .filter((kosaras) => kosaras.name.includes(searchbar))
        .map((kosarasok) => (
          <div
            className="m-1 mr-3 grid w-[380px] grid-cols-2 rounded-md border-2 p-0 shadow-md shadow-slate-600 hover:w-[400px] hover:cursor-pointer md:w-full md:grid-cols-4 md:pr-4"
            key={kosarasok.ID}
            onClick={() => {
              navigate("/kosarasok/" + kosarasok.ID);
            }}
          >
            <div className="relative max-h-48 max-w-48">
              <img
                src={image}
                className="h-auto w-auto rounded-[12px] object-cover pl-1 pt-1 md:p-[5px]"
                loading="lazy"
              ></img>
            </div>
            <div className="m-1 p-1">
              <div className="mt-1 tracking-wide">{kosarasok.name}</div>
              <div className="mt-1 tracking-wide">
                Született: {kosarasok.bdate}
              </div>
              <div className="mt-1 tracking-wide">csapat: {kosarasok.team}</div>
            </div>
            <div className="col-span-2 mt-2 p-2 leading-7 tracking-wide md:row-span-1">
              {kosarasok.introduction}
            </div>
          </div>
        ))}
    </>
  );
}
