import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import UserService from "../services/user.service";

export const fetchUsers = createAsyncThunk("user/fetch",
    async (thunkAPI) => {
      try {
        const user_data = await UserService.getAllUsers();
        return { user: user_data.data.Users };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);
const initialState = {
    message: '',
    user:[],
}
const UserSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action ) => {
          state.user = action.payload.user;
        });
        builder.addCase(fetchUsers.rejected, (state, action ) => {
          state.message = 'Error';
        });
    },  
});

const { reducer } = UserSlice;
export default reducer;

