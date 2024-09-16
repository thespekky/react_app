import Cookies from "universal-cookie";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useAuth } from "../../AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { GetAllData } from "../../FetchData/fetchData";
import { useNavigate } from "react-router-dom";
import image from "../Home/image.png";
const cookies = new Cookies();
export default function Kedvencek() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const [kedvenckosarasok, setKedvenckosarasok] = useState([]);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  const getKedvencek = async () => {
    const kedvenc = await GetAllData(
      "/kedvencek/" + cookies.get("userData").id,
    );
    if (kedvenc.success) {
      console.log(kedvenc.kedvencKosarasok);
      setKedvenckosarasok(kedvenc.kedvencKosarasok);
    } else {
      showAlert(kedvenc.message, "danger");
    }
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      getKedvencek();
    }
  }, []);
  return (
    <>
      <Alert />
      <div>
        <h2 className="p-3 text-center font-black italic text-coloroftext">
          Kedvencek
        </h2>
      </div>
      <div className="w-full overflow-x-auto p-1">
        <table className="w-full border-4 border-gray-700 pb-3 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="mt-3 w-40 px-6 py-3">
                Név
              </th>
              <th scope="col" className="w-40 px-6 py-3">
                Csapat
              </th>
              <th scope="col" className="px-6 py-3">
                Leírás
              </th>
              <th scope="col" className="px-6 py-3">
                Műveletek
              </th>
            </tr>
          </thead>
          <tbody>
            {kedvenckosarasok.map((kosaras) => (
              <tr key={kosaras.ID}>
                <td className="px-6 py-4">{kosaras.name}</td>
                <td className="px-6 py-4">{kosaras.team}</td>
                <td className="px-6 py-4">{kosaras.introduction}</td>
                <td className="px-6 py-4">
                  <div>kosaras</div>
                  <div>törlés</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
