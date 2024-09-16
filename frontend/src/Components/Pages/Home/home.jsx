import { useState, Suspense } from "react";
import { Alert } from "../../Alert/Alert";
import Kosarasok from "./Kosarasok/kosarasok";
import CostumeSearch from "../../CostumeSearch/CostumeSearch";
export default function Home() {
  const [searchbar, setSearchbar] = useState("");

  return (
    <>
      <div className="pt-3">
        <CostumeSearch onsubmit={(e) => setSearchbar(e)} />
      </div>
      <Suspense fallback={<Loading />}>
        <div className="flex w-full flex-row flex-wrap font-serif md:justify-center">
          <Kosarasok searchbar={searchbar} />
        </div>
      </Suspense>
      <Alert />
    </>
  );
}
function Loading() {
  return <div>Adat betöltése...</div>;
}
