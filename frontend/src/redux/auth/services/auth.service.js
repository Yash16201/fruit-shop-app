import axios from "axios";

const register = async (data) => {
    return axios.post('http://localhost:8000/api/register',data);
}
const login = async (data) => {
    return axios.post('http://localhost:8000/api/login',data).then((res)=>{
        // setToken(res.data.user, res.data.access_token);
        if (res.data.authorisation.token) {
            sessionStorage.setItem('token',res.data.authorisation.token);
            sessionStorage.setItem('user',JSON.stringify(res.data.user));
        }
        return res.data;
    })  
}
const logoutUser = async () =>{
    sessionStorage.clear();
}

const AuthService = {
    register,
    login,
    logoutUser
}

export default AuthService;