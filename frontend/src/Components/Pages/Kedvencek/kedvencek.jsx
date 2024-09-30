import Cookies from "universal-cookie";
import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import { useAuth } from "../../AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { GetAllData, DeleteDataBody } from "../../FetchData/fetchData";
import { useNavigate } from "react-router-dom";
import image from "../Home/image.png";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
const cookies = new Cookies();
export default function Kedvencek() {
  const { loggedUser } = useAuth();
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const [kedvenckosarasok, setKedvenckosarasok] = useState([]);
  const [tableState, setTableState] = useState({
    name: false,
    team: false,
  });
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
  async function deleteKedvencek(id) {
    let text = "Biztos hogy törölni akarod a kedvencet?";
    if (confirm(text) == true) {
      const response = await DeleteDataBody("/kedvencek/" + id, {
        email: loggedUser.email,
      });
      if (response.success) {
        showAlert(response.message, "success");
      }
    }
  }
  async function SortKosarasok({ where }) {
    const sortedKedvenckosarasok = kedvenckosarasok.sort((a, b) => {
      if (tableState[where]) {
        if (a[where] < b[where]) {
          return -1;
        }
        if (a[where] > b[where]) {
          return 1;
        }
        return 0;
      } else {
        if (a[where] > b[where]) {
          return -1;
        }
        if (a[where] < b[where]) {
          return 1;
        }
        return 0;
      }
    });
    setTableState({ ...tableState, [where]: !tableState[where] });
    setKedvenckosarasok(sortedKedvenckosarasok);
  }
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
              <th
                scope="col"
                className="mt-3 w-40 px-6 py-3 hover:cursor-pointer"
                onClick={() => SortKosarasok({ where: "name" })}
              >
                <div className="flex">
                  <p className="pr-1">Név</p>
                  {tableState.name ? (
                    <IconContext.Provider value={{ size: "15px" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ size: "15px" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="w-40 px-6 py-3 hover:cursor-pointer"
                onClick={() => SortKosarasok({ where: "team" })}
              >
                <div className="flex">
                  <p className="pr-1">Csapat</p>
                  {tableState.team ? (
                    <IconContext.Provider value={{ size: "15px" }}>
                      <FaArrowUp />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider value={{ size: "15px" }}>
                      <FaArrowDown />
                    </IconContext.Provider>
                  )}
                </div>
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
                  <div
                    className="flex justify-center p-2 text-linkcolor underline hover:cursor-pointer"
                    onClick={() => navigate("/kosarasok/" + kosaras.ID)}
                  >
                    <a>Ugrás</a>
                  </div>

                  <div
                    className="mt-5 flex justify-center p-2 hover:cursor-pointer"
                    onClick={() => {
                      deleteKedvencek(kosaras.ID);
                    }}
                  >
                    <IconContext.Provider
                      value={{ size: "20px", color: "red" }}
                    >
                      <MdDelete />
                    </IconContext.Provider>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
