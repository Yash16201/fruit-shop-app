import axios from "axios";

const getAllOrders = async() => {
    return await axios.get('http://localhost:8000/api/orders');
}

const updateStatus = async(id,status) => {
    return await axios.post('http://localhost:8000/api/updateorderstatus',{"id":id,"status":status});
}
const updatePayment = async(id,status) => {
    return await axios.post('http://localhost:8000/api/updatepaymentstatus',{"id":id,"status":status});
}

const OrderService = {
    getAllOrders, updateStatus, updatePayment
}

export default OrderService;