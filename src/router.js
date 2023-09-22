import Login from "./pages/Login";
import Cadastrations from "./pages/Cadastrations";
import Products from "./pages/Products";
import Home from "./pages/Home";

import Navbar from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom"

function Router(){
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/cadastros" element={<Cadastrations/>}/>
                <Route path="/produtos" element={<Products/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;