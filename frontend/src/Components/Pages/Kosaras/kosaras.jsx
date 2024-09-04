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
          <h2 className="p-3 text-center font-black italic">{Kosaras.name}</h2>
          <div className="flex md:flex-row md:flex-wrap">
            <div className="flex w-[80%] justify-start md:w-[100%]">
              {" "}
              <img
                className="h-auto w-auto rounded-[12px] object-cover pl-1 pt-1 md:p-[5px]"
                src={"/src/Components/Pages/Home/" + Kosaras.image}
                alt="kosaras képe"
              />
            </div>
            <div className="m-1 w-[20%] rounded-md bg-gray-200 p-1 md:w-[100%]">
              <div className="mt-1 font-serif tracking-wide">
                <p className="text-center font-bold">Születése dátum</p>
                <p className="text-center">{Kosaras.bdate}</p>
              </div>
              <div className="mt-1 tracking-wide">
                <p className="text-center font-bold">csapat</p>
                <p className="text-center">{Kosaras.team}</p>
              </div>
            </div>
          </div>
          <div className="m-3 rounded-lg bg-gray-50 p-1">
            {Kosaras.introduction}
          </div>
          <div className="kosaras_adatok m-3 rounded-lg bg-gray-50 p-1">
            <Eredmenyek_component Eredmenyek={Eredmenyek} />
            <Csaladtagok_component Csaladtagok={Csaladtagok} />
          </div>
        </div>
      </Suspense>
    </>
  );
}
