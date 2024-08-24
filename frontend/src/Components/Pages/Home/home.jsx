import { useEffect, useState, Suspense, useContext } from "react";

//import image from "./image.png";

import { useAuth } from "../../AuthContext/AuthContext";
import Cookies from "universal-cookie";

import { Alert } from "../../Alert/Alert";
import AlertContext from "../../Alert/alert.context";
import Kosarasok from "./Kosarasok/kosarasok";
import CostumeSearch from "../../CostumeSearch/CostumeSearch";
const cookies = new Cookies();
export default function Home() {
  const { isLoggedIn } = useAuth();
  const [, sertAlert] = useContext(AlertContext);

  const [searchbar, setSearchbar] = useState("");

  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      //GetData();
    }
  }, []);
  return (
    <>
      <CostumeSearch onsubmit={(e) => setSearchbar(e)} />

      <Suspense fallback={<Loading />}>
        <div className="flex flex-wrap md:justify-center flex-row w-full font-serif">
          <Kosarasok searchbar={searchbar} />
        </div>
      </Suspense>
      <Alert />
      <h1>Home</h1>
      {isLoggedIn}
      <button
        type="button"
        onClick={() => {
          showAlert("Belépve", "success");
        }}
      ></button>
    </>
  );
}
function Loading() {
  return <div>Adat betöltése...</div>;
}
