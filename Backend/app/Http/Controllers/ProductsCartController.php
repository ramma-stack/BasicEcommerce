<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class ProductsCartController extends Controller
{
    public function index()
    {
        $carts = CartItem::with('product')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'carts' => $carts
        ]);
    }

    public function store(Request $request)
    {
        $cart = CartItem::where('product_id', $request->product_id);

        if ($cart->count()) {
            $cart->increment('quantity');
            $cart = $cart->first();
        } else {
            $cart = CartItem::forceCreate([
                'product_id' => $request->product_id,
                'quantity' => 1,
            ]);
        }

        return response()->json([
            'quantity' => $cart->quantity,
            'product' => $cart->product,
            'message' => 'Item added successfully'
        ]);
    }

    public function destroy($productId)
    {
        $item = CartItem::where('product_id', $productId)->delete();

        return response()->json([
            'item' => $item,
            'message' => 'Item removed successfully'
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
