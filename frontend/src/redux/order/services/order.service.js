import axios from "axios";

const add = async(data) => {
    return await axios.post('http://localhost:8000/api/addorder',data);
}

const get = async(data) => {
    return await axios.post('http://localhost:8000/api/myorders',{"user_id":data});
}
const track = async(id,user_id) => {
    return await axios.post('http://localhost:8000/api/track',{"id":id,"user_id":user_id})
}

const OrderService = {
    add,get,track
}

export default OrderService;