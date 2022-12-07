import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import ProductService from "../service/product.service"

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
    productbyid :[]
}

const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
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

