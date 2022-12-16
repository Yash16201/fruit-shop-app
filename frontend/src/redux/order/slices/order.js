import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import OrderService from "../services/order.service"
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const addOrder = createAsyncThunk("order/add",
    async (data, thunkAPI) => {
      try {
        const add_order = await OrderService.add(data);
        console.log(add_order)
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

export const validate = createAsyncThunk("order/validate",
    async (data, thunkAPI) => {
      try {
        const validate = await OrderService.validate(data);
        if(validate.data.status===422){
          const message = validate.data.errors;
          if(message.full_name){
            toast.error(`${message.full_name}`,{
              position:"top-right",
            })
          }
          if(message.email){
            toast.error(`${message.email}`,{
              position:"top-right",
            })
          }
          if(message.contact){
            toast.error(`${message.contact}`,{
              position:"top-right",
            })
          }
          if(message.address){
            toast.error(`${message.address}`,{
              position:"top-right",
            })
          }
          if(message.landmark){
            toast.error(`${message.landmark}`,{
              position:"top-right",
            })
          }
          if(message.city){
            toast.error(`${message.city}`,{
              position:"top-right",
            })
          }
          if(message.zipcode){
            toast.error(`${message.zipcode}`,{
              position:"top-right",
            })
          }
          if(message.state){
            toast.error(`${message.state}`,{
              position:"top-right",
            })
          }
          if(message.country){
            toast.error(`${message.country}`,{
              position:"top-right",
            })
          }
        }
        return validate;
      } catch (error) {
          Swal.fire({
            text:error.response.data.message,
            icon:"error"
          })
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
    validationstatus:'',
    order:[],
    trackOrder:[]
}

const OrderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(validate.fulfilled, (state, action ) => {
            state.validationstatus = action.payload.data.status;
        });
        builder.addCase(validate.rejected, (state, action ) => {
            state.validationstatus = action.payload;
        });
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