import axios from "axios";

const add = async(data) => {
    return await axios.post('http://localhost:8000/api/addproduct',data);
}

const edit = async(data) => {
    return await axios.post('http://localhost:8000/api/editproduct',data);
}

const deleteProduct = async(data) => {
    return await axios.post('http://localhost:8000/api/deleteproduct',{"id":data});
}


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
    add, edit, deleteProduct, fetch, fetchbyid , fetchbyname,  fetchbycategory
}

export default ProductService;