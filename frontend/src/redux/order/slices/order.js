import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import OrderService from "../services/order.service"
import Swal from "sweetalert2";

export const addOrder = createAsyncThunk("order/add",
    async (data, thunkAPI) => {
      try {
        const add_order = await OrderService.add(data);
        return  add_order;
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

export const get = createAsyncThunk("order/fetch",
    async (data, thunkAPI) => {
      try {
        const order_data = await OrderService.get(data);
        return { order: order_data.data.Orders };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);

export const track = createAsyncThunk("order/track",
    async ({id,user_id}, thunkAPI) => {
      try {
        const order_data = await OrderService.track(id,user_id);
        // console.log(order_data.data.Order[0].detail[0].product.name)
        return { order: order_data.data.Order };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);


const initialState = {
    message: '',
    order:[],
    trackOrder:[]
}

const OrderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addOrder.fulfilled, (state, action ) => {
            state.message = action.payload.data.message;
        });
        builder.addCase(addOrder.rejected, (state, action ) => {
            state.message = action.payload.data.message;
        });
        builder.addCase(get.fulfilled, (state, action ) => {
          state.order = action.payload.order;
        });
        builder.addCase(get.rejected, (state, action ) => {
          state.order = [];
        });
        builder.addCase(track.fulfilled, (state, action ) => {
          state.trackOrder = action.payload.order;
        });
        builder.addCase(track.rejected, (state, action ) => {
          state.trackOrder = [];
        });     
    },  
});

const { reducer } = OrderSlice;
export default reducer;