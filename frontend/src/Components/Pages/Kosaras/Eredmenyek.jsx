import { useEffect } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Eredmenyek({ Eredmenyek }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h2 className="p-5">eredmények</h2>
      <div className="relative overflow-x-auto flex justify-center ">
        <table className="w-11/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-4 border-gray-700 pb-3">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 mt-3">
                Helyszín
              </th>
              <th scope="col" className="px-6 py-3">
                Csarnok
              </th>
              <th scope="col" className="px-6 py-3">
                Pontok
              </th>
              <th scope="col" className="px-6 py-3">
                Büntetések
              </th>
            </tr>
          </thead>
          <tbody>
            {Eredmenyek.map((eredmeny) => (
              <tr key={eredmeny.ID}>
                <td className="px-6 py-4">{eredmeny.helyszin}</td>
                <td className="px-6 py-4">{eredmeny.csarnok}</td>
                <td className="px-6 py-4">{eredmeny.pontok}</td>
                <td className="px-6 py-4">{eredmeny.buntetesek}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
