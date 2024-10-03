import { useEffect, useState, useContext, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  GetOneData,
  GetAllData,
  PostData,
  DeleteDataBody,
} from "../../FetchData/fetchData";
import AlertContext from "../../Alert/alert.context";
import { Alert } from "../../Alert/Alert";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import Eredmenyek_component from "./Eredmenyek";
import Csaladtagok_component from "./Csaladtagok";
const cookie = new Cookies();

export default function Kosaras() {
  const [Kosaras, setKosaras] = useState([]);
  const [Eredmenyek, setEredmenyek] = useState([]);
  const [Csaladtagok, setCsaladtagok] = useState([]);
  const [kedvenc, setKedvenc] = useState(false);
  const id = useParams().id;
  const navigate = useNavigate();
  const [, setAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    setAlert({
      text,
      type,
    });
  };
  const getKedvenc = async () => {
    const kedvenc = await PostData("/kedvenc/", {
      user_id: cookie.get("userData").id,
      kosaras_id: id,
    });
    if (kedvenc.kedvenc) {
      setKedvenc(true);
    } else {
      setKedvenc(false);
    }
  };
  const GetData = async () => {
    const data = await GetOneData("/kosarasok/" + id);
    if (data.kosaras) {
      setKosaras(data.kosaras);
    } else {
      showAlert(data.message, "danger");
    }
  };
  const getKosarasEredmenyek = async () => {
    const data = await GetOneData("/kosarasok/eredmenyek/" + id);
    if (data.eredmenyek) {
      setEredmenyek(data.eredmenyek);
    } else {
      showAlert(data.message, "danger");
    }
  };
  const GetCsapadtagok = async () => {
    const data = await GetAllData("/kosarasok/csaladtagok/" + id);
    if (data.csaladtagok) {
      setCsaladtagok(data.csaladtagok);
    } else {
      showAlert(data.message, "danger");
    }
  };

  useEffect(() => {
    if (!cookie.get("userData")) {
      navigate("/");
    } else {
      GetData();
      getKosarasEredmenyek();
      GetCsapadtagok();
      getKedvenc();
    }
  }, []);
  const kedvencChange = async () => {
    if (kedvenc) {
      const response = await DeleteDataBody("/kedvencek/" + id, {
        email: cookie.get("userData").email,
        user_id: cookie.get("userData").id,
      });
      if (response.success) {
        showAlert(response.message, "success");
      } else {
        showAlert(response.message, "danger");
      }
      setKedvenc(false);
    } else {
      setKedvenc(true);
      const response = await PostData("/kedvencek", {
        email: cookie.get("userData").email,
        user_id: cookie.get("userData").id,
        kosarasok_id: id,
      });
      if (response.success) {
        showAlert(response.message, "success");
      } else {
        showAlert(response.message, "danger");
      }
    }
  };

  return (
    <>
      <Alert />
      <Suspense fallback={<div>Adatok töltése</div>}>
        <div className="p-3">
          <h2 className="p-3 text-center font-black italic text-coloroftext">
            {Kosaras.name}
          </h2>
          <div className="flex md:flex-row md:flex-wrap">
            <div className="flex w-[80%] justify-start md:w-[100%] md:justify-center">
              <div>
                <div
                  className="relative left-3 top-11 z-10 col-start-1 row-start-1 h-[25px] w-[25px]"
                  onClick={() => {
                    kedvencChange();
                  }}
                >
                  <IconContext.Provider
                    value={{ size: "25px", color: "orange" }}
                  >
                    {kedvenc ? <FaStar /> : <FaRegStar />}
                  </IconContext.Provider>
                </div>{" "}
                <img
                  className="h-auto w-auto rounded-[12px] object-cover pt-1 md:p-[5px]"
                  src={"/src/Components/Pages/Home/" + Kosaras.image}
                  alt="kosaras képe"
                />
              </div>
            </div>
            <div className="h-auto w-[20%] rounded-md bg-gray-200 p-1 md:w-[100%]">
              <div className="mt-1 font-serif tracking-wide">
                <p className="text-center font-bold">Születése dátum</p>
                <p className="text-center">{Kosaras.bdate}</p>
              </div>
              <div className="mt-1 tracking-wide">
                <p className="text-center font-bold">csapat</p>
                <p className="text-center">{Kosaras.team}</p>
              </div>
              <div className="mt-1 tracking-wide">
                <p className="text-center font-bold">Karrier kezdete</p>
                <p className="text-center">{Kosaras.start_date}</p>
              </div>
              <div className="mt-1 tracking-wide">
                <p className="text-center font-bold">Karrier vége</p>
                <p className="text-center">
                  {Kosaras.end_date ? Kosaras.end_date : "Még mindig játszik"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-gray-50 p-1">
            {Kosaras.introduction}
          </div>
          <div className="kosaras_adatok mt-3 rounded-lg bg-gray-50 p-1">
            <Eredmenyek_component Eredmenyek={Eredmenyek} />
            <Csaladtagok_component Csaladtagok={Csaladtagok} />
          </div>
        </div>
      </Suspense>
    </>
  );
}
