import { GetAllData } from "../../../FetchData/fetchData";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import AlertContext from "../../../Alert/alert.context";
import { Alert } from "../../../Alert/Alert";
import image from "../image.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
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
            className="m-1 mr-3 grid w-[400px] grid-cols-2 grid-rows-2 rounded-md border-2 p-0 shadow-md shadow-slate-600 hover:cursor-pointer md:w-full md:grid-cols-4 md:pr-4"
            key={kosarasok.ID}
          >
            <div className="relative left-4 top-4 z-10 col-start-1 row-start-1 h-[25px] w-[25px]">
              <IconContext.Provider value={{ size: "25px", color: "orange" }}>
                <FaRegStar />
              </IconContext.Provider>
            </div>
            <div
              className="relative col-start-1 row-start-1 max-h-48 max-w-48"
              onClick={() => {
                navigate("/kosarasok/" + kosarasok.ID);
              }}
            >
              <img
                src={image}
                className="h-auto w-auto rounded-[12px] object-cover pl-1 pt-1 md:p-[5px]"
                loading="lazy"
              ></img>
            </div>
            <div
              className="m-1 p-1"
              onClick={() => {
                navigate("/kosarasok/" + kosarasok.ID);
              }}
            >
              <div className="mt-1 font-bold tracking-wide text-coloroftext">
                {kosarasok.name}
              </div>
              <div className="mt-1 tracking-wide text-coloroftext">
                <span className="font-bold">Született:</span> {kosarasok.bdate}
              </div>
              <div className="mt-1 tracking-wide text-coloroftext">
                <span className="font-bold">csapat:</span> {kosarasok.team}
              </div>
            </div>
            <div
              className="col-span-2 mt-2 p-2 leading-7 tracking-wide text-coloroftext md:row-span-1"
              onClick={() => {
                navigate("/kosarasok/" + kosarasok.ID);
              }}
            >
              {kosarasok.introduction}
            </div>
          </div>
        ))}
    </>
  );
}
