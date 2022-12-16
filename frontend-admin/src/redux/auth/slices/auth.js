import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service"

const getAdmin = JSON.parse(sessionStorage.getItem("admin"));

export const login = createAsyncThunk("auth/login",
    async (data, thunkAPI) => {
      try {
        const user_data = await AuthService.login(data);
        return { user: user_data };
      } catch (error) {
        console.log(error)
        if(error.response.status===422){
            const message = error.response.data.errors 
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }else{
            Swal.fire({
              text:error.response.data.message,
              icon:"error"
            })
        }
      }
    }
);
export const logout = createAsyncThunk(
    "auth/logout", 
    () => {
        AuthService.logoutUser();
    }
);

const initialState = getAdmin ? { adminLoggedIn:true, admin:getAdmin } : { adminLoggedIn: false, admin: null }

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action ) => {
            state.adminLoggedIn = true;
        });
        builder.addCase(login.rejected, (state, action ) => {
            state.adminLoggedIn = false;
        });
        builder.addCase(logout.fulfilled, (state, action ) => {
            state.adminLoggedIn = false;
            state.admin = null;
        });
    },
    
});
  
const { reducer } = authSlice;
export default reducer;
