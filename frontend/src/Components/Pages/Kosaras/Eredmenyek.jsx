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
    <div className="max-width-half w-6/12">
      <h2 className="p-5">eredmények</h2>
      <div className="relative flex justify-start overflow-x-auto">
        <table className="w-1/5 border-4 border-gray-700 pb-3 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="mt-3 px-6 py-3">
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
