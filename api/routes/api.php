<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/login', [UserController::class, 'Login']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/register', [UserController::class, 'Register']);
    Route::post('/logout', [UserController::class, 'Logout']);
    Route::post('/product/create',[ProductController::class, 'createProduct']);
    Route::get('/product/view',[ProductController::class, 'show']);
    Route::delete('/product/delete/{id}',[ProductController::class, 'delete']);
    Route::post('/product/order',[ProductController::class, 'createOrder']);
    Route::prefix('/view')->group( function () {
        Route::get('/order-list',[UserController::class,'getOrdered']);
        Route::patch('/{order}/status', [UserController::class, 'editStatus']);
    });
});
