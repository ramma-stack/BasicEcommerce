<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductsCartController;
use App\Http\Controllers\UserController;

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

// middleware json
Route::middleware('json')->group(function () {

    // middleware
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/products', [ProductsController::class, 'index']);
        Route::get('/product/{product}', [ProductsController::class, 'show']);

        Route::get('/carts', [ProductsCartController::class, 'index']);
        Route::post('/cart', [ProductsCartController::class, 'store']);
        Route::delete('/cart/decrement/{productId}', [ProductsCartController::class, 'decrement']);
        Route::delete('/cart/{productId}', [ProductsCartController::class, 'destroy']);
        Route::delete('/cart', [ProductsCartController::class, 'destroyAll']);
        Route::post('/logout', [UserController::class, 'logout']);
    });

    // User Routes
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
});
