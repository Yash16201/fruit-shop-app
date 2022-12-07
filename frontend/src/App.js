import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Fruit from "./Components/Fruit";
import Contact from "./Components/Contact";
import Auth from "./Components/Auth"
import Cart from "./Components/Cart";
import Buy from "./Components/Buy";
import ViewFruit from "./Components/ViewFruit";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyOrder from "./Components/MyOrder";
import TrackOrder from "./Components/TrackOrder";



function App() {
  
  return (
    <>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/shop" element={<Fruit/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/buyit" element={<Buy/>}/>
        <Route path="/myorders" element={<MyOrder/>}/>
        <Route path="/fruit/:id" element={<ViewFruit/>}/>
        <Route path="/track/:id" element={<TrackOrder/>}/>
      </Routes>
    </>
  );
}

export default App;
