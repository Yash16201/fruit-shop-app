import axios from "axios";

const login = async (data) => {
    return axios.post('http://localhost:8000/api/login',data).then((res)=>{
        // setToken(res.data.user, res.data.access_token);
        if (res.data.authorisation.token) {
            sessionStorage.setItem('adtoken',res.data.authorisation.token);
            sessionStorage.setItem('admin',JSON.stringify(res.data.user));
        }
        return res.data;
    })  
}
const logoutUser = async () =>{
    sessionStorage.clear();
}

const AuthService = {
    login,
    logoutUser
}

export default AuthService;