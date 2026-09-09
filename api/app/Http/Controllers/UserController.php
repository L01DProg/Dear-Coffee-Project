<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use function Laravel\Prompts\error;

class UserController extends Controller
{
    public function Register(Request $request)
    {
        $Authenticate = auth()->user();

        if (!$Authenticate || $Authenticate->role !== 'Admin') {
            return response()->json([
                'message' => 'Unauthorized Only Admin can register users',
            ], 403);
        }

        $validatedData = $request->validate([
            'username' => 'required|string|max:25',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role' => 'string'
        ]);



        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json([
            'message' => 'Register Successfully'
        ], 201);
    }

    public function Login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
            'role' => 'required',
        ]);


        $user = User::where('username', $request->username)
            ->where('role', $request->role)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Incorrect username or password'
            ], 403);
        }

        $token = $user->createToken('auth:token')->plainTextToken;

        return response()->json([
            'message' => 'Successful Log in',
            'token' => $token,
        ], 200);
    }

    public function Logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successful Logout'
        ], 200);
    }

    //cashier side
    public function getOrdered()
    {

        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized only admin and cashier will retrieve this data',
            ], 401);
        }

        $order = Order::orderBy('id', 'asc')->get();

        if (!$order) {
            return response()->json([
                'message' => 'No order yet',
            ], 404);
        }

        return response()->json([
            'message' => 'Retrieve Successfully',
            'order' => $order
        ], 200);
    }

    public function editStatus($orderId, Request $request)
    {

        $userAuth = auth()->user();

        if ($userAuth->role !== 'Admin' && $userAuth->role !== 'Cashier') {
            return response()->json([
                'message' => 'Unauthorized only Admin and Cashier can change status'
            ], 401);
        }

        $customerOrder = Order::find($orderId);

        if (!$customerOrder) {
            return response()->json([
                'message' => 'Invalid please try again'
            ], 404);
        }

        try {
            $request->validate([
                'status' => 'required|in:new,preparing,ready,completed'
            ]);
            
            $customerOrder->update($request->only('status'));

            return response()->json([
                'message' => 'Successfully update'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
