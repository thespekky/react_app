import { useEffect, useState, useContext, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { GetOneData, GetAllData } from "../../FetchData/fetchData";
import AlertContext from "../../Alert/alert.context";
import { Alert } from "../../Alert/Alert";
import Eredmenyek_component from "./Eredmenyek";
import Csaladtagok_component from "./Csaladtagok";
const cookie = new Cookies();

export default function Kosaras() {
  const [Kosaras, setKosaras] = useState([]);
  const [Eredmenyek, setEredmenyek] = useState([]);
  const [Csaladtagok, setCsaladtagok] = useState([]);
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
    }
  }, []);
  return (
    <>
      <Alert />
      <Suspense fallback={<div>Adatok töltése</div>}>
        <div className="p-3">
          <h2 className="text-center font-black italic p-3">{Kosaras.name}</h2>
          <div className="flex md:flex-row md:flex-wrap">
            <div className=" w-[80%] md:w-[100%] flex justify-start">
              {" "}
              <img
                className=" w-auto h-auto object-cover rounded-[12px] pl-1 pt-1 md:p-[5px]"
                src={"/src/Components/Pages/Home/" + Kosaras.image}
                alt="kosaras képe"
              />
            </div>
            <div className="w-[20%] md:w-[100%] bg-gray-200 p-1 m-1 rounded-md">
              <div className=" mt-1 font-serif tracking-wide">
                <p className="font-bold text-center">Születése dátum</p>
                <p className="text-center">{Kosaras.bdate}</p>
              </div>
              <div className=" mt-1 tracking-wide">
                <p className="font-bold text-center">csapat</p>
                <p className="text-center">{Kosaras.team}</p>
              </div>
            </div>
          </div>
          <div className="p-1 m-3 rounded-lg bg-gray-50">
            {Kosaras.introduction}
          </div>
          <div className="p-1 m-3 rounded-lg bg-gray-50 kosaras_adatok">
            <Eredmenyek_component Eredmenyek={Eredmenyek} />
            <Csaladtagok_component Csaladtagok={Csaladtagok} />
          </div>
        </div>
      </Suspense>
    </>
  );
}
