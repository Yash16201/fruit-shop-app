import axios from "axios";

const fetch = async() => {
    return await axios.get('http://localhost:8000/api/category');
}

const CategoryService = {
    fetch
}

export default CategoryService;