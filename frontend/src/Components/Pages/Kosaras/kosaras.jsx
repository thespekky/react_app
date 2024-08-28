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
      <Suspense fallback={<div>Adatok töltése</div>}>
        <div className="p-3">
          <h2 className="text-center font-black italic">{Kosaras.name}</h2>
          <div className="flex md:flex-row md:flex-wrap">
            <div className=" w-[80%] md:w-[100%] flex justify-center">
              {" "}
              <img
                className=" w-auto h-auto object-cover rounded-[12px] pl-1 pt-1 md:p-[5px]"
                src={"/src/Components/Pages/Home/" + Kosaras.image}
                alt="kosaras képe"
              />
            </div>
            <div className="w-[20%] md:w-[100%] bg-gray-200 p-1 m-1 rounded-md">
              <div className=" mt-1 font-serif tracking-wide">
                Születése dátum: {Kosaras.bdate}
              </div>
              <div className=" mt-1 tracking-wide">csapat: {Kosaras.team}</div>
            </div>
          </div>
          <div className="p-1 m-3 rounded-lg bg-gray-50">
            {Kosaras.introduction}
          </div>
          <div className="p-1 m-3 rounded-lg text-center bg-gray-50">
            Eredmények
          </div>
        </div>
      </Suspense>
    </>
  );
}
