import Cookies from "universal-cookie";
const cookies = new Cookies();
export async function Logout(body) {
  try {
    await fetch("http://localhost:" + import.meta.env.VITE_PORT + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.log(e);
  }
}
export async function Register(path, body) {
  try {
    const response = await fetch(
      "http://localhost:" + import.meta.env.VITE_PORT + path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      return { message: "Hiba a regisztráció során", success: false };
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return { message: e.message };
  }
}
export async function LoginUser(path, body) {
  try {
    const response = await fetch(
      "http://localhost:" + import.meta.env.VITE_PORT + path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      return { message: "Hiba a belépés során", success: false };
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return { message: e.message };
  }
}
export async function GetAllData(path) {
  try {
    const response = await fetch(
      "http://localhost:" + import.meta.env.VITE_PORT + path,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            cookies.get("userData").authtoken
              ? cookies.get("userData").authtoken
              : null
          }`,
        },
      }
    );
    if (!response.ok) {
      return { message: "Hiba a lekérdezés során", success: false };
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return { message: e.message };
  }
}
