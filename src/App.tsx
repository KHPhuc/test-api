import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick={true}
        pauseOnFocusLoss={true}
        hideProgressBar={true}
      />
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
