import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
