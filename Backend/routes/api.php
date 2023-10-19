<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductsCartController;

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

Route::get('/products', [ProductsController::class, 'index']);
Route::get('/product/{product}', [ProductsController::class, 'show']);

Route::get('/carts', [ProductsCartController::class, 'index']);
Route::post('/cart', [ProductsCartController::class, 'store']);
Route::delete('/cart/decrement/{productId}', [ProductsCartController::class, 'decrement']);
Route::delete('/cart/{productId}', [ProductsCartController::class, 'destroy']);
Route::delete('/cart', [ProductsCartController::class, 'destroyAll']);
