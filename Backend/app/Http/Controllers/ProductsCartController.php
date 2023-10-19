<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class ProductsCartController extends Controller
{
    public function index()
    {
        $carts = CartItem::with('productList')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'carts' => $carts
        ]);
    }

    public function store(Request $request)
    {
        $cart = CartItem::where('product_id', $request->id)->first();

        if ($cart) {
            $cart->increment('quantity');
        } else {
            $cart = CartItem::create([
                'product_id' => $request->id,
                'quantity' => 1,
            ]);
        }

        $cart = CartItem::with('productList')
            ->where('product_id', $request->id)
            ->first();

        return response()->json([
            'cart' => $cart,
            'id' => $request->id,
            'message' => 'Item added successfully'
        ]);
    }

    public function decrement($productId)
    {
        $cart = CartItem::where('id', $productId)->first();

        if ($cart->quantity > 1) {
            $cart->decrement('quantity');
        }

        return response()->json([
            'cart' => $cart,
            'message' => 'Item decremented successfully'
        ]);
    }

    public function destroy($productId)
    {
        $cart = CartItem::where('id', $productId)->delete();

        return response()->json([
            'cart' => $cart,
            'message' => 'cart removed successfully'
        ]);
    }

    public function destroyAll()
    {
        $emptyCarts = CartItem::truncate();

        return response()->json([
            'emptyCarts' => $emptyCarts,
            'message' => 'All items removed successfully'
        ]);
    }
}
