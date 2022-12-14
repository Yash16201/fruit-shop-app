<?php

namespace App\Repositories;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface{
    public function get(){
        try{
            $users = User::all();
            return response()->json([
                'status' => 'success',
                'Users' => $users,
                'message' => 'Users fetched successfully'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 'failed',
                'message' => 'No users found'
            ]); 
        }
    }
}