import Home from "./pages/Home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

function App() {
  return <div>{routes}</div>;
}

export default App;
