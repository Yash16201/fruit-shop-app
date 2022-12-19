import './App.css';
import Home from './Components/Home';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import AddCategory from './Components/Categories/AddCategory';
import ManageCategories from './Components/Categories/ManageCategories';
import EditCategory from './Components/Categories/EditCategory';
import AddProduct from './Components/Products/AddProduct';
import EditProduct from './Components/Products/EditProduct';
import ManageProduct from './Components/Products/ManageProduct';
import ManageOrder from './Components/ManageOrder';
import ViewUser from './Components/ViewUser';
import Login from './Components/Auth/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const navigate = useNavigate();
  const Admin = sessionStorage.getItem("admin");
  if(!Admin){
    console.log('notlogged');
    return <Login/>
  }
  return (
    <div className="container-fluid position-relative d-flex p-0">
      <ToastContainer/>
      <Sidebar/>
      <div className='content'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addcategory" element={<AddCategory/>}/>
          <Route path="/editcategory/:id" element={<EditCategory/>}/>
          <Route path="/categories" element={<ManageCategories/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/editproduct/:id" element={<EditProduct/>}/>
          <Route path="/products" element={<ManageProduct/>}/>
          <Route path="/orders" element={<ManageOrder/>}/>
          <Route path="/users" element={<ViewUser/>}/>
        </Routes>
      </div>
      <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></Link>
    </div>
  );
}

export default App;
