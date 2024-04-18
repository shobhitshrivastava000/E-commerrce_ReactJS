import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import  { Toaster } from 'react-hot-toast';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (<div>
        <Toaster/>
        <div className="bg-slate-900 ">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
  </div>)
};

export default App;
