import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="bg-[#fff] p-[20px] w-full min-h-screen box-border">
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
