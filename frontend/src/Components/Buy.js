import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { addOrder } from "../redux/order/slices/order";
import { afterPayment } from "../redux/cart/slices/cart";

const Buy = () => {
    const navigate = useNavigate();
    const  user  = JSON.parse(sessionStorage.getItem('user'));
    const { message } = useSelector((state) => state.message)
    const { cartItems,cartTotalAmount } = useSelector((state) => state.cart)
    const { isOrdered } = useSelector(state => state.order);
    const tax = cartTotalAmount * 5 / 100;
    const DeliveryCharge = cartTotalAmount * 10 / 100;
    const totalAmountToPay = cartTotalAmount + tax + DeliveryCharge;
    const dispatch = useDispatch();
    const [Name, setName] = useState(user.name);
    const [Email, setEmail] = useState(user.email);
    const [Contact, setContact] = useState(user.contact)
    const [Address, setAddress] = useState(user.address)
    const [Landmark, setLandmark] = useState(user.landmark)
    const [City, setCity] = useState(user.city)
    const [Zipcode, setZipcode] = useState(user.zipcode)
    const [State, setState] = useState(user.state)
    const [Country, setCountry] = useState(user.country)
    const Details = [];
    const handlesubmit = (e) =>{
        e.preventDefault();
        cartItems.forEach((item) => console.log(item))
        console.log();
        const data = new FormData();
        data.append('user_id',user.id);
        data.append('total_products_amount',cartTotalAmount);
        data.append('tax',tax);
        data.append('delivery_charge',DeliveryCharge);
        data.append('totalwithtax',totalAmountToPay);
        data.append('Details',JSON.stringify(cartItems));
        // cartItems.forEach((item) => data.append("Details[]", item))
        data.append('full_name',Name);
        data.append('email', Email);
        data.append('contact', Contact);
        data.append('address', Address);
        data.append('landmark',Landmark);
        data.append('city', City);
        data.append('zipcode', Zipcode);
        data.append('state', State);
        data.append('country', Country);
        // dispatch(addOrder(user_id,cartTotalAmount,tax,DeliveryCharge,totalAmountToPay,cartItems,Name,Email,Contact,Address,Landmark,City,Zipcode,State,Country)
        // )
        dispatch(addOrder(data))
        .unwrap()
        .then(() => {
            dispatch(afterPayment())
            navigate("/");
            window.location.reload();
        })
        .catch(() => {
            console.log('error');
        });
    }
  return (
    <div className='container mt-5'>
        <section className="contact_section layout_padding-bottom my-5">
            <form action="" onSubmit={handlesubmit}>
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
                <div className="contact_form-container">
                    <div className='row'>
                        <div className='col-md-4'>
                        <input type="text" placeholder="Full Name" name="name" value={Name} onChange={e=>setName(e.target.value)}/>
                        </div>
                        <div className='col-md-4'>
                        <input type="email" placeholder="Email" name="email" value={Email} onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div className='col-md-4'>
                        <input type="text" placeholder="Contact" name="contact" value={Contact} onChange={e=>setContact(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                        <input type="text" placeholder="Address" name="address" value={Address} onChange={e=>setAddress(e.target.value)}/>
                        </div>
                        <div className='col-md-6'>
                        <input type="text" placeholder="Landmark" name="landmark" value={Landmark} onChange={e=>setLandmark(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <input type="text" placeholder="City" name='city' value={City} onChange={e=>setCity(e.target.value)}/>
                        </div>
                        <div className='col-md-6'>
                            <input type="text" placeholder="Zip" name='zipcode' value={Zipcode} onChange={e=>setZipcode(e.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <input type="text" placeholder="State" name='state' value={State} onChange={e=>setState(e.target.value)}/>
                        </div>
                        <div className='col-md-6'>
                            <input type="text" placeholder="Country" name='country' value={Country} onChange={e=>setCountry(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="100%"><b>Item Total</b></td>
                                            <td width="90%"><b>₹{cartTotalAmount}</b></td>
                                        </tr>
                                        <tr>
                                            <td width="100%"><b>Tax Total</b></td>
                                            <td width="90%"><b>₹{tax}</b></td>
                                        </tr>
                                        <tr>
                                            <td width="100%"><b>Delivery Charges</b></td>
                                            <td width="90%"><b>₹{DeliveryCharge}</b></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td width="100%"><b>Total amount to pay</b></td>
                                            <td width="90%"><b>₹{totalAmountToPay}</b></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='row my-3'>
                        <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 class="card-title">Payment Type</h5>
                                <select className='form-select' name="gender">
                                    <option value="Male" selected>Cash On Delivery</option>
                                </select>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <button type="submit"> Buy </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
  )
}

export default Buy