import { Routes, Route } from "react-router-dom";

import Kitchen from "./pages/Kitchen";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Admin from "./Admin/Dashboard";
import AdminPin from "./Admin/AdminPin";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/admin-pin" element={<AdminPin />} />
      </Routes>
    </>
  );
}

export default App;
