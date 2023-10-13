<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::where('title', 'like', "%$request->search%")
            ->orderBy('created_at', 'desc')->paginate(8);

        return response()->json([
            'products' => $products
        ]);
    }

    public function show(Product $product)
    {
        return response()->json([
            'product' => $product
        ]);
    }
}
