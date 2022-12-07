import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login, register } from "../redux/auth/slices/auth";

const Auth = () => {
  const navigate = useNavigate();
  const { message } = useSelector(state => state.message);
  
  const dispatch = useDispatch();
  const [AuthType, setAuthType] = useState('Login');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Contact, setContact] = useState('')
  const [Gender, setGender] = useState('')
  const [Address, setAddress] = useState('')
  const [Landmark, setLandmark] = useState('')
  const [City, setCity] = useState('')
  const [Zipcode, setZipcode] = useState('')
  const [State, setState] = useState('')
  const [Country, setCountry] = useState('')
  const [Password, setPassword] = useState('') 

  const changeType = (e) => {
    e.preventDefault();
    if(AuthType === 'Login'){
      setAuthType('Register')
    }else{
      setAuthType('Login')
    }
    
  }
  const authorize = (e) =>{
    e.preventDefault();
    if(AuthType === 'Login'){
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
    }else{
      const data = new FormData();
      data.append('name',Name);
      data.append('email', Email);
      data.append('contact', Contact);
      data.append('gender', Gender);  
      data.append('address', Address);
      data.append('landmark',Landmark);
      data.append('city', City);
      data.append('zipcode', Zipcode);
      data.append('state', State);
      data.append('country', Country)
      data.append('password', Password);
      dispatch(register(data))
        .unwrap()
        .then(() => {
            navigate("/");
            window.location.reload(); 
        })
        .catch(() => {
            console.log('error');
        });
    }
  }
  return (
    
    <div className='container'>
        <section className="contact_section layout_padding-bottom my-5">
          <form onSubmit={authorize}>
          {
            message &&(Object.keys(message).length > 0 && (
            <div className="row">
                <div className="col-12">
                <div className="alert alert-danger">
                    <ul className="mb-0">
                    {
                        Object.entries(message).map(([key, value])=>(
                        <li key={key}>{value}</li>   
                        ))
                    }
                    </ul>
                </div>
                </div>
            </div>
            ))
          }
            { AuthType === 'Login' ? <h2>Login</h2> : <h2>Register</h2>  }
            { AuthType === 'Login' ? <p>Dont have any account? <span> <button name='register' style={{backgroundColor:"#fd9e2e", color:"white"}} onClick={changeType}> Register Here </button>  </span></p> : <p>Already have an account? <span> <button name='register' style={{backgroundColor:"#fd9e2e", color:"white"}} onClick={changeType}> Login Here </button>  </span></p>}
              <div className="contact_form-container">
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="Full Name" name="name" onChange={e=>setName(e.target.value)}/> : ''}
                  </div>
                  <div>
                      <input type="email" placeholder="Email" name="email" onChange={e=>setEmail(e.target.value)} />                      
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="Contact" name="contact" onChange={e=>setContact(e.target.value)}/> : ''}                   
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="Address" name="address" onChange={e=>setAddress(e.target.value)}/> : ''}                   
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="Landmark" name="landmark" onChange={e=>setLandmark(e.target.value)}/> : ''}                    
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="City" name="city" onChange={e=>setCity(e.target.value)}/> : ''}                    
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="Zipcode" name="zipcode" onChange={e=>setZipcode(e.target.value)}/> : ''}                    
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="State" name="state" onChange={e=>setState(e.target.value)}/> : ''}                    
                  </div>
                  <div>
                    { AuthType === 'Register' ? <input type="text" placeholder="Country" name="country" onChange={e=>setCountry(e.target.value)}/> : ''}                    
                  </div>
                  <div>
                    { AuthType === 'Register' ? <> 
                    <select className='form-select' name="gender" onChange={e=>setGender(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    
                    </>  : ''}                    
                  </div>
                  <div>
                      <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)}/>
                  </div> 
                  <div>
                      <button type="submit">
                        Submit
                      </button>
                  </div>
              </div>
          </form>
        </section>
    </div>
  )
}

export default Auth