<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function createProduct(Request $request)
    {

        $adminAuthentication = auth()->user();

        if (!$adminAuthentication || $adminAuthentication->role !== 'Admin') {
            return response()->json([
                'message' => 'Unauthorized Admin can only add product'
            ]);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:25',
            'category' => 'required',
            'image' => 'nullable|mimes:svg,jpg,png,jpeg',
            'sizes' => 'required|array|min:1',
            'sizes.*.size' => 'required|string',
            'sizes.*.price' => 'required|numeric|min:0',
            'sizes.*.stock' => 'required|integer|min:0',
        ]);

        $checkProduct = Product::where('name', $validatedData['name'])->first();

        if ($checkProduct) {
            return response()->json([
                'message' => $validatedData['name'] . 'already Exist',
            ], 409);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $path;
        }

        $product = Product::create([
            'name' => $validatedData['name'],
            'category' => $validatedData['category'],
            'image' => $validatedData['image'] ?? null,
        ]);

        foreach ($validatedData['sizes'] as $size) {
            $productSize = ProductSize::create([
                'product_id' => $product->id,
                'size' => $size['size'],
                'price' => $size['price'],
            ]);

            $stock = Stock::create([
                'product_size_id' => $productSize->id,
                'stock' => $size['stock'],
            ]);
        }



        return response()->json([
            'message' => 'Add new product successfully',
            'product' => $product->load('productSize.stock'),
        ], 201);
    }

    public function show()
    {
        $products = Product::with('productSize.stock')->get();

        return response()->json([
            'message' => 'Successfully retrieved products',
            'products' => $products
        ], 200);
    }

    public function delete($id)
    {
        $product = Product::where('id', $id)->delete();

        if (!$product) {
            return response()->json([
                'message' => 'Invalid to delete product'
            ], 404);
        }

        return response()->json([
            'message' => 'Delete Successfully'
        ], 200);
    }



    public function createOrder(Request $request)
    {

        $validated = $request->validate([
            'items' => 'required|array|min:1',

            'items.*.product_size_id' =>
            'required|exists:product_sizes,id',

            'items.*.quantity' =>
            'required|integer|min:1',
        ]);

        try {

            $order = DB::transaction(function () use ($validated) {

                $totalAmount = 0;


                $order = Order::create([
                    'total_amount' => 0,
                    'status' => 'new',
                ]);


                $order->order_number = '#' . str_pad($order->id, 6, '0', STR_PAD_LEFT);
                $order->save();

                foreach ($validated['items'] as $item) {


                    $productSize = ProductSize::with([
                        'product',
                        'stock'
                    ])->find($item['product_size_id']);


                    if (!$productSize) {
                        throw new \Exception('Invalid product size.');
                    }


                    $stock = $productSize->stock;


                    if (!$stock) {
                        throw new \Exception(
                            "Stock record not found for {$productSize->size}."
                        );
                    }


                    if ($stock->stock < $item['quantity']) {
                        throw new \Exception(
                            "Insufficient stock for {$productSize->product->name} - {$productSize->size}. Available stock: {$stock->stock}"
                        );
                    }


                    $price = $productSize->price;


                    $subtotal = $price * $item['quantity'];


                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $productSize->product_id,
                        'product_size_id' => $productSize->id,
                        'quantity' => $item['quantity'],
                        'price' => $price,
                        'subtotal' => $subtotal,
                    ]);


                    $stock->decrement(
                        'stock',
                        $item['quantity']
                    );


                    $totalAmount += $subtotal;
                }


                $order->update([
                    'total_amount' => $totalAmount,
                ]);

                return $order;
            });


            return response()->json([
                'message' => 'Order created successfully',
                'order_number' => $order->order_number,
                'order' => $order->load([
                    'items.product',
                    'items.productSize',
                    'items.productSize.stock',
                ])
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
