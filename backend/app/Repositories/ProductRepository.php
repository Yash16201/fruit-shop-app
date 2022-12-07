<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductDetails;
use App\Repositories\Interfaces\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface{
    public function add($request){
        $request->validate([
            'name' => 'required'
        ]); 
        try{
            $product = new Product;
            $product->name = $request->name;
            $product->category_id = $request->category_id;
            $product->status = "Active";
            
            if($product->save()){
                $productid = $product->id;
                $file = $request->file('image');
                if(isset($file)){
                    $filename = date('YmdHi').$file->getClientOriginalName();
                    $ProductDetails = new ProductDetails;
                    $ProductDetails->product_id = $productid;
                    $ProductDetails->description = $request->description;
                    $ProductDetails->image = $file;
                    $ProductDetails->price = $request->price;
                    $file-> move(public_path('public/Image'), $filename);
                    $ProductDetails->save();
                }else{
                    $ProductDetails = new ProductDetails;
                    $ProductDetails->product_id = $productid;
                    $ProductDetails->description = $request->description;
                    $ProductDetails->price = $request->price;
                    if($ProductDetails->save()){
                        return response()->json([
                            'status' => 'success',
                            'message' => 'Product created successfully'
                        ]);
                    }
                }
            }
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }  
    }
    public function edit($request){
        $request->validate([
            'name' => 'required',
            'price' => 'required'
        ]); 
        try{
            $product = Product::where('id','=',$request->id)->update([
                'name' => $request->name,
                'category_id' => $request->category_id,
            ]);
            if($product){
                $file = $request->file('image');
                if(isset($file)){
                    $filename = date('YmdHi').$file->getClientOriginalName();
                    $product_details = ProductDetails::where('product_id','=',$request->id)->update([
                        'description' => $request->description,
                        'image' => $filename,
                        'price' => $request->price
                    ]);
                    $file-> move(public_path('public/Image'), $filename);
                }else{
                    $product_details = ProductDetails::where('product_id','=',$request->id)->update([
                        'description' => $request->description,
                        'price' => $request->price
                    ]);
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }  
    }
    public function delete($request){
        try{
            $product = Product::where('id','=',$request->id)->update([
                'status' => 'Inactive',
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        } 
    }

    public function fetch(){
        try{
            $Product = Product::active()->with('detail')->get();
            return response()->json([
                'status' => 'success',
                'Products' => $Product,
                'message' => 'Product fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }
    public function fetchById($request){
        try{
            $ProductByID = Product::particular($request->id)->with('detail')->get();
            return response()->json([
                'status' => 'success',
                'product' => $ProductByID,
                'message' => 'Category fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }
    public function fetchByName($request){
        try{
            $product = Product::named($request->name)->with('detail')->get();
            return response()->json([
                'status' => 'success',
                'products' => $product,
                'message' => 'Product fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }
    public function fetchByCategory($request){
        try{
            $product = Product::categorized($request->category_id)->with('detail')->get();
            return response()->json([
                'status' => 'success',
                'products' => $product,
                'message' => 'Product fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }
}