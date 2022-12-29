<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\DispatchDetails;
use App\Models\PaymentDetails;
use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Events\OrderPlaced;
use Illuminate\Support\Facades\Validator;
class OrderRepository implements OrderRepositoryInterface{
    public function validateOrder($request){
        $Validator = Validator::make($request->all(),[
            'full_name' => 'required',
            'email' => 'required',
            'contact' => 'required|numeric',
            'address' => 'required',
            'landmark' => 'required',
            'city' => 'required',
            'zipcode' => 'required|numeric',
            'state' => 'required',
            'country' => 'required',
        ]);
        if($Validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$Validator->messages()
            ]);
        }else {
            return response()->json([
                'status'=>200,
                'message'=>"Done"
            ]);
        }
    }
    public function add($request){
        try{
            $Order = Order::create([
                'user_id' => $request->user_id,
                'total_products_amount' => $request->total_products_amount,
                'tax' => $request->tax,
                'delivery_charge' => $request->delivery_charge,
                'totalwithtax' => $request->totalwithtax,
            ]);
            if($Order){
                $Products = json_decode($request->Details);
                foreach($Products as $detail){
                    $OrderDetails = OrderDetails::create([
                        'order_id' => $Order->id,
                        'product_id' => $detail->id,
                        'total_quantity' => $detail->Quantity,
                        'total_amount' => $detail->TotalPrice
                    ]);
                }
                $Dispatch = DispatchDetails::create([
                    'order_id' => $Order->id,
                    'full_name' => $request->full_name,
                    'email' => $request->email,
                    'contact' => $request->contact,
                    'address' => $request->address,
                    'landmark' => $request->landmark,
                    'city' => $request->city,
                    'zip' => $request->zipcode,
                    'state' => $request->state,
                    'country' => $request->country,
                ]);  

                $Payment = PaymentDetails::create([
                    'order_id' => $Order->id,
                    'payment_type' => $request->payment_type,
                    'payment_id' => $request->payment_id,
                    'payment_status' => $request->payment_status
                ],event(new OrderPlaced($request->email)));

                if($Payment){
                    return response()->json([
                        'status' => 'success',
                        'message' => 'Ordered successfully',
                    ]);
                }         
            } 
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }

    public function getOrders($request){
        try{
            $Orders = Order::Orders($request->user_id)->with('detail')->get();
            return response()->json([
                'status' => 'success',
                'Orders' => $Orders,
                'message' => 'Orders fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => 'No orders found'
            ]); 
        }
    }

    public function getAllOrders(){
        try{
            $Orders = Order::with('detail','dispatch','payment')->get();
            return response()->json([
                'status' => 'success',
                'Orders' => $Orders,
                'message' => 'Orders fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => 'No orders found'
            ]); 
        }
    }
    public function trackOrder($request){
        try{
            // $Orders = Order::track($request->id,$request->user_id)->with('detail')->get();
            $Orders = OrderDetails::where('order_id', $request->id)->with('product.detail')->get();
            return response()->json([
                'status' => 'success',
                'Order' => $Orders,
                'message' => 'Orders fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }
    public function updateStatus($request){
        try{
            $Orders = Order::where('id', $request->id)->update([
                'status' => $request->status
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Status updated successfully'
            ]);
            
            
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }
    public function updatePaymentStatus($request){
        try{
            $Orders = PaymentDetails::where('order_id', $request->id)->update([
                'payment_status' => $request->status
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Payment status updated successfully'
            ]);
            // $Orders = Order::track($request->id,$request->user_id)->with('detail')->get();
            
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]);  
        }
    }
}