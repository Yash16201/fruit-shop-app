<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserManage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);
Route::post('logout', [AuthController::class,'logout']);

Route::controller(UserManage::class)->group(function () {
    Route::get('users', 'get');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('category', 'fetch');
    Route::post('addcategory', 'add');
    Route::post('editcategory', 'edit');
    Route::post('deletecategory', 'delete');
    Route::post('categorybyid', 'fetchById');  
}); 

Route::controller(OrderController::class)->group(function () {
    Route::post('validate', 'validateOrder'); 
    Route::post('addorder', 'add'); 
    Route::post('myorders', 'getOrders');
    Route::post('track', 'trackOrder');
    Route::get('orders', 'getAllOrders');
    Route::post('updateorderstatus', 'updateStatus');
    Route::post('updatepaymentstatus', 'updatePaymentStatus');
}); 

Route::controller(ProductController::class)->group(function () {
    Route::get('product', 'fetch');
    Route::post('productbyid', 'fetchById');
    Route::post('productbycategory', 'fetchByCategory');
    Route::post('productbyname', 'fetchByName');
    Route::post('addproduct', 'add');
    Route::post('editproduct', 'edit');
    Route::post('deleteproduct', 'delete');  
}); 


