import axios from "axios";

const getAllUsers = async() => {
    return await axios.get('http://localhost:8000/api/users');
}

const UserService = {
    getAllUsers
}

export default UserService;