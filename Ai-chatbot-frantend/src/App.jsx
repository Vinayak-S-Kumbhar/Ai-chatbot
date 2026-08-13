import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
