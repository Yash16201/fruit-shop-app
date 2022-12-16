import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const Admin = JSON.parse(sessionStorage.getItem("admin"));
  return (
    <>
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                <Link to="/" className="navbar-brand mx-4 mb-3">
                    <h3 className="text-primary">Fruit Shop</h3>
                </Link>
                <div className="d-flex align-items-center ms-4 mb-4">
                    <div className="position-relative">
                        <img className="rounded-circle" src={ process.env.PUBLIC_URL + '/external/img/user.jpg'} alt="" style={{width: "40px", height: "40px"}}/>
                        <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0">{Admin.name}</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="navbar-nav w-100">
                    <Link to="/" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</Link>
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Categories</Link>
                        <div className="dropdown-menu bg-transparent border-0">
                            <Link to="/categories" className="dropdown-item">Manage Categories</Link>
                            <Link to="/addcategory" className="dropdown-item">Add Category</Link>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Products</Link>
                        <div className="dropdown-menu bg-transparent border-0">
                            <Link to="/products" className="dropdown-item">Manage Products</Link>
                            <Link to="/addproduct" className="dropdown-item">Add Product</Link>
                        </div>
                    </div>
                    <Link to="/orders" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Manage Orders</Link>
                    <Link to="/users" className="nav-item nav-link"><i className="fa fa-chart-bar me-2"></i>View Users</Link>

                </div>
            </nav>
        </div>
    </>
  )
}

export default Sidebar