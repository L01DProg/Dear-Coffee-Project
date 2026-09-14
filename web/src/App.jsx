import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Kitchen from "./pages/Kitchen";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
