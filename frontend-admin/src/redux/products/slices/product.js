import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import ProductService from "../service/product.service"
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const add = createAsyncThunk("product/add",
    async (data, thunkAPI) => {
      try {
        const response = await ProductService.add(data);
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
          if(message.price){
            toast.error(`${message.price}`,{
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

export const edit = createAsyncThunk("product/edit",
    async (data, thunkAPI) => {
      try {
        const response = await ProductService.edit(data);
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

export const deleteproduct = createAsyncThunk("product/delete",
    async (data) => {
      try {
        const response = await ProductService.deleteProduct(data);
        toast.success(`${response.data.message}`,{
          position:"top-right",
        })
        return response.data;
      } catch (error) {
        toast.error(`${error.response.data.message}`,{
          position:"top-right",
        })
      }
    }
);

export const fetch = createAsyncThunk("product/fetch",
    async (thunkAPI) => {
      try {
        const product_data = await ProductService.fetch();
        return { product: product_data.data.Products };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);
export const fetchbyid = createAsyncThunk("product/fetchbyid",
    async (data, thunkAPI) => {
      try {
        const product_data = await ProductService.fetchbyid(data);
        return { product: product_data.data.product };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);
export const fetchbyname = createAsyncThunk("product/fetchbyname",
    async (data, thunkAPI) => {
      try {
        const product_data = await ProductService.fetchbyname(data);
        return { product: product_data.data.products };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);

export const fetchbycategory = createAsyncThunk("product/fetchbycategory",
    async (data, thunkAPI) => {
      try {
        const product_data = await ProductService.fetchbycategory(data);
        return { product: product_data.data.products };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);

const initialState = {
    product: [],
    isDone: false,
    productbyid :[]
}

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(add.fulfilled, (state, action ) => {
            state.isDone = true;
        });
        builder.addCase(add.rejected, (state, action ) => {
            state.isDone = false;
        });
        builder.addCase(edit.fulfilled, (state, action ) => {
          state.isDone = true;
        });
        builder.addCase(edit.rejected, (state, action ) => {
          state.isDone = false;
        });
        builder.addCase(fetch.fulfilled, (state, action ) => {
            state.product = action.payload.product;
        });
        builder.addCase(fetch.rejected, (state, action ) => {
            state.product = [];
        });
        builder.addCase(fetchbyid.fulfilled, (state, action ) => {
            state.productbyid = action.payload.product;
        });
        builder.addCase(fetchbyid.rejected, (state, action ) => {
            state.productbyid = [];
        });
        builder.addCase(fetchbyname.fulfilled, (state, action ) => {
            state.product = action.payload.product;
        });
        builder.addCase(fetchbyname.rejected, (state, action ) => {
            state.product = [];
        });
        builder.addCase(fetchbycategory.fulfilled, (state, action ) => {
            state.product = action.payload.product;
        });
        builder.addCase(fetchbycategory.rejected, (state, action ) => {
            state.product = [];
        });     
    },  
});

const { reducer } = productSlice;
export default reducer;

