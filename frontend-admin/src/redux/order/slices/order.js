import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../../messages/slices/message";
import OrderService from "../services/order.service"
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const get = createAsyncThunk("order/fetch",
    async (thunkAPI) => {
      try {
        const order_data = await OrderService.getAllOrders();
        return { order: order_data.data.Orders };
      } catch (error) {
        thunkAPI.dispatch(setMessage(error));
        return thunkAPI.rejectWithValue();
      }
    }
);

export const updateStatus = createAsyncThunk("order/updatestatus",
    async ({id,status}) => {
      try {
        const order_data = await OrderService.updateStatus(id,status);
        toast.success(`${order_data.data.message}`,{
          position:"top-right",
        })
        return order_data;
      } catch (error) {
        Swal.fire({
          text:error.response.data.message,
          icon:"error"
        })
      }
    }
);

export const updatePayment = createAsyncThunk("order/updatepayment",
    async ({id,status}, thunkAPI) => {
      try {
        const order_data = await OrderService.updatePayment(id,status);
        toast.success(`${order_data.data.message}`,{
          position:"top-right",
        })
        return order_data;
      } catch (error) {
        Swal.fire({
          text:error.response.data.message,
          icon:"error"
        })
      }
    }
);

const initialState = {
    message: '',
    order:[],
}

const OrderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(get.fulfilled, (state, action ) => {
          state.order = action.payload.order;
        });
        builder.addCase(get.rejected, (state, action ) => {
          state.order = [];
        });
        builder.addCase(updateStatus.fulfilled, (state, action ) => {
          state.message = "Done";
        });
        builder.addCase(updateStatus.rejected, (state, action ) => {
          state.message = "Error";
        });
        builder.addCase(updatePayment.fulfilled, (state, action ) => {
          state.message = "Done";
        });
        builder.addCase(updatePayment.rejected, (state, action ) => {
          state.message = "Error";
        });
    },  
});

const { reducer } = OrderSlice;
export default reducer;