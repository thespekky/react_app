import { useState } from "react";
//import './App.css'
import { AuthProvider } from "./Components/AuthContext/AuthContext.jsx";
import { useAuth } from "./Components/AuthContext/AuthContext.jsx";
import { AlertPRovider } from "./Components/Alert/alert.context.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <AlertPRovider>
          <div>
            <p>Hello Vite + React!</p>
            <p>
              <button
                type="button"
                onClick={() => setCount((count) => count + 1)}
              >
                count is: {count}
              </button>
            </p>
          </div>
        </AlertPRovider>
      </AuthProvider>
    </>
  );
}

export default App;
