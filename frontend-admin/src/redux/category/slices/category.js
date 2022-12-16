import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import CategoryService from "../services/category.service"
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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

export const fetchById = createAsyncThunk("category/fetchbyid",
    async (data,thunkAPI) => {
      try {
        const category_data = await CategoryService.fetchById(data);
        return { category: category_data.data.categories };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);

export const addcategory = createAsyncThunk("category/add",
    async (data,thunkAPI) => {
      try {
        const response = await CategoryService.add(data);
        toast.success(`${response.data.message}`,{
          position:"top-right",
        })
        return response.data;
      } catch (error) {
        if(error.response.status===422){
          const message = error.response.data.errors 
          // thunkAPI.dispatch(setMessage(message));
          if(message.name){
            toast.error(`${message.name}`,{
              position:"top-right",
            })
          }
          if(message.description){
            toast.error(`${message.description}`,{
              position:"top-right",
            })
          }
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

export const editCategory = createAsyncThunk("category/edit",
    async (data,thunkAPI) => {
      try {
        const response = await CategoryService.edit(data);
        toast.success(`${response.data.message}`,{
          position:"top-right",
        })
        return response.data;
      } catch (error) {
        if(error.response.status===422){
          const message = error.response.data.errors 
          // thunkAPI.dispatch(setMessage(message));
          if(message.name){
            toast.error(`${message.name}`,{
              position:"top-right",
            })
          }
          if(message.description){
            toast.error(`${message.description}`,{
              position:"top-right",
            })
          }
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

export const deleteCategory = createAsyncThunk("category/delete",
    async (data,thunkAPI) => {
      try {
        const response = await CategoryService.deleteCategory(data);
        toast.success(`${response.data.message}`,{
          position:"top-right",
        })
        return response.data;
      } catch (error) {
        if(error.response.status===422){
          const message = error.response.data.errors 
          // thunkAPI.dispatch(setMessage(message));
          if(message.name){
            toast.error(`${message.name}`,{
              position:"top-right",
            })
          }
          if(message.description){
            toast.error(`${message.description}`,{
              position:"top-right",
            })
          }
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

const initialState = {
    category: [],
    isDone : false
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
        builder.addCase(addcategory.fulfilled, (state, action ) => {
          state.isDone = true;
        });
        builder.addCase(addcategory.rejected, (state, action ) => {
          state.product = false;
        }); 
        builder.addCase(editCategory.fulfilled, (state, action ) => {
          state.isDone = true;
        });
        builder.addCase(editCategory.rejected, (state, action ) => {
          state.product = false;
        });
        builder.addCase(fetchById.fulfilled, (state, action ) => {
          state.category = action.payload.category;
        });
        builder.addCase(fetchById.rejected, (state, action ) => {
          state.category = [];
        }); 
        builder.addCase(deleteCategory.fulfilled, (state, action ) => {
          state.isDone = true;
        });
        builder.addCase(deleteCategory.rejected, (state, action ) => {
          state.product = false;
        }); 
    },  
});

const { reducer } = CategorySlice;
export default reducer;