<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\AuthRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Events\UserCreated;

class AuthRepository implements AuthRepositoryInterface {
    public function login($request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid User',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
        ]);

    }
    public function register($request){
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'contact' => 'required|numeric',
            'gender' => 'required',
            'address' => 'required',
            'landmark' => 'required',
            'city' => 'required',
            'zipcode' => 'required|numeric',
            'state' => 'required',
            'country' => 'required',
            'password' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'contact' => $request->contact,
            'gender' => $request->gender,
            'user_type' => "User",
            'address' => $request->address,
            'landmark' => $request->landmark,
            'city' => $request->city,
            'zipcode' => $request->zipcode,
            'state' => $request->state,
            'country' => $request->country,
            'password' => Hash::make($request->password),
        ],event(new UserCreated($request['email'])));
        
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully'
        ]);
    }
    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }
}