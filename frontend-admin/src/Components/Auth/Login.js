import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../../redux/auth/slices/auth";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
      data.append('email', Email);
      data.append('password', Password);
        dispatch(login(data))
        .unwrap()
        .then(() => {
            navigate("/"); 
        })
        .catch(() => {
            console.log('error');
        });
  }
  return (
    <div className="container-fluid position-relative d-flex p-0 my-5">
        <div className="container-fluid">
            <div className="row h-100 align-items-center justify-content-center" style={{minheight: "100vh"}}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <h3>Sign In</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email here" onChange={e=>setEmail(e.target.value)}/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" placeholder="Enter password here" onChange={e=>setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login