<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface{
    public function add($request){
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]); 
        try{
            $category = Category::create([
                'name' => $request->name,
                'description' => $request->description,
                'status' => 'Active'
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Category created successfully'
            ]);
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
            'description' => 'required',
        ]); 
        try{
            $category = Category::where('id','=',$request->id)->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Category updated successfully'
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
            $category = Category::where('id','=',$request->id)->update([
                'status' => 'Inactive',
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Category deleted successfully'
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
            $category = Category::active()->get();
            return response()->json([
                'status' => 'success',
                'categories' => $category,
                'message' => 'Category fetched successfully'
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
            $category = Category::particular($request->id)->get();
            return response()->json([
                'status' => 'success',
                'categories' => $category,
                'message' => 'Category fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => $e->getMessage()
            ]); 
        }
    }

}

