import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../redux/auth/slices/auth";
const Navbar = () => {
  const { isLoggedIn } =useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  return (
    <div>
        <div className="hero_area">
   
    <div className="brand_box">
      <a className="navbar-brand" href="/">
        <span>
          FRUIT SHOPEE
        </span>
      </a>
    </div>
   
    <section className=" slider_section position-relative">
      <div id="carouselExampleControls" className="carousel slide " data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="img-box">
              <img src="http://localhost:3000/external/images/slider-img.jpg" alt=""/>
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-box">
              <img src="http://localhost:3000/external/images/slider-img.jpg" alt=""/>
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-box">
              <img src="http://localhost:3000/external/images/slider-img.jpg" alt=""/>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="sr-only">Next</span>
        </a>
      </div>
    </section>
    
  </div>



  <section className="nav_section">
    <div className="container">
      <div className="custom_nav2">
        <nav className="navbar navbar-expand custom_nav-container ">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex  flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav  ">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">Buy Fruit(s) </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myorders">My Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact Us</Link>
                </li>
                {
                  isLoggedIn === false ?
                  <li className="nav-item">
                      <Link className="nav-link" to="/auth">Login</Link>
                  </li> :
                  <li className="nav-item">
                      <a className='nav-link' role="button" onClick={()=>{dispatch(logout())}}>Logout</a>
                      {/* <button className="btn btn-sm btn-secondary" onClick={()=>{dispatch(logout())}}>Logout</button> */}
                  </li>
                }
              </ul>
              <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
    </div>
  )
}

export default Navbar