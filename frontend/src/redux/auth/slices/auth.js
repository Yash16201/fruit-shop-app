import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service"

const getUser = JSON.parse(sessionStorage.getItem("user"));

export const register = createAsyncThunk("auth/register",
    async (data, thunkAPI) => {
      try {
        const response = await AuthService.register(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
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
export const login = createAsyncThunk("auth/login",
    async (data, thunkAPI) => {
      try {
        const user_data = await AuthService.login(data);
        return { user: user_data };
      } catch (error) {
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

const initialState = getUser ? { isLoggedIn:true, user:getUser } : { isLoggedIn: false, user: null }

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(register.rejected, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action ) => {
            state.isLoggedIn = true;
        });
        builder.addCase(login.rejected, (state, action ) => {
            state.isLoggedIn = false;
        });
        builder.addCase(logout.fulfilled, (state, action ) => {
            state.isLoggedIn = false;
            state.user = null;
        });
    },
    
});
  
const { reducer } = authSlice;
export default reducer;
