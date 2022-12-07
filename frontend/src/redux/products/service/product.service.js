import axios from "axios";

const fetch = async() => {
    return await axios.get('http://localhost:8000/api/product');
}

const fetchbyid = async(data) => {
    return await axios.post('http://localhost:8000/api/productbyid',{"id":data});
}

const fetchbyname = async(data) => {
    return axios.post('http://localhost:8000/api/productbyname',{"name":data})
}

const fetchbycategory = async (data) => {
    return axios.post('http://localhost:8000/api/productbycategory',{"category_id":data});
}

const ProductService = {
    fetch, fetchbyid , fetchbyname,  fetchbycategory
}

export default ProductService;