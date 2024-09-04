import { useEffect } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Csaladtagok({ Csaladtagok }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <div className="max-width-half w-6/12">
      <div className="h-auto w-full">
        <h2 className="float-right p-5">családtagok</h2>
      </div>
      <div className="relative flex w-full justify-end overflow-x-auto">
        <table className="w-1/5 border-4 border-gray-700 pb-3 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="mt-3 px-6 py-3">
                Vezetéknév
              </th>
              <th scope="col" className="px-6 py-3">
                Keresztnév
              </th>
              <th scope="col" className="px-6 py-3">
                Kapcsolat
              </th>
            </tr>
          </thead>
          <tbody>
            {Csaladtagok.map((csaladtag) => (
              <tr key={csaladtag.ID}>
                <td className="px-6 py-4">{csaladtag.Vezetek_nev}</td>
                <td className="px-6 py-4">{csaladtag.Kereszt_nev}</td>
                <td className="px-6 py-4">{csaladtag.Kapcsolat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
