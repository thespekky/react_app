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
      <div className="w-full h-auto">
        <h2 className="p-5 float-right">családtagok</h2>
      </div>
      <div className="relative w-full overflow-x-auto flex justify-end">
        <table className="w-1/5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-4 border-gray-700 pb-3">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 mt-3">
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
