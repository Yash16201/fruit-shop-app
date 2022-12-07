import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import CategoryService from "../services/category.service"

export const fetchCategory = createAsyncThunk("category/fetch",
    async (thunkAPI) => {
      try {
        const category_data = await CategoryService.fetch();
        return { category: category_data.data.categories };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);

const initialState = {
    category: []
}

const CategorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action ) => {
            state.category = action.payload.category;
        });
        builder.addCase(fetchCategory.rejected, (state, action ) => {
            state.product = [];
        });     
    },  
});

const { reducer } = CategorySlice;
export default reducer;