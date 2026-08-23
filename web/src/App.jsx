import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Kitchen from "./pages/Kitchen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kitchen" element={<Kitchen />} />
      </Routes>
    </>
  );
}

export default App;
