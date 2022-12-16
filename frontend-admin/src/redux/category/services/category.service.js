import axios from "axios";

const fetch = async() => {
    return await axios.get('http://localhost:8000/api/category');
}

const add = async(data) => {
    return await axios.post('http://localhost:8000/api/addcategory',data);
}

const edit = async(data) => {
    return await axios.post('http://localhost:8000/api/editcategory',data);
}

const fetchById = async(data) => {
    return await axios.post('http://localhost:8000/api/categorybyid',{"id":data});
}

const deleteCategory = async(data) => {
    return await axios.post('http://localhost:8000/api/deletecategory',{"id":data});
}

const CategoryService = {
    fetch,add,edit,fetchById,deleteCategory
}

export default CategoryService;