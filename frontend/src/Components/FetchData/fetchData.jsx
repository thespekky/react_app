import Cookies from "universal-cookie";
const cookies = new Cookies();
export async function Register(path, body) {
  try {
    const response = await fetch(
      "http://localhost:" + process.env.VITE_PORT + path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("userData").authtoken}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      return { msg: "Hiba a regisztráció során" };
    }
    const data = await response.json();
    return data;
  } catch (e) {
    return { msg: "Kritikus hiba" };
  }
}
