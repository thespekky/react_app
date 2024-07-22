//import './App.css'
import "./Css/app.css";
import { AuthProvider } from "./Components/AuthContext/AuthContext.jsx";
import { AlertPRovider } from "./Components/Alert/alert.context.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home/home.jsx";
import Reg from "./Components/Pages/Reg/reg.jsx";
import Login from "./Components/Pages/Login/login.jsx";
import Logout from "./Components/Pages/Logout/logout.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <AlertPRovider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/reg" element={<Reg />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </AlertPRovider>
      </AuthProvider>
    </>
  );
}

export default App;
