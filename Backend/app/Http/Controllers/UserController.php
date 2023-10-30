<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = validator($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                // Hash the password
                'password' => Hash::make($request->password),
            ]);

            // Create token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return response
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }
    }

    /**
     * Login a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = validator($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        } else {
            // Find user
            $user = User::where('email', $request->email)->first();

            // Check password
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'This informations does not match our records.'
                ], 401);
            }

            // Create token
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return response
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }
    }

    /**
     * Logout a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function logout(Request $request)
    {
        // Revoke token
        $request->user()->tokens()->delete();

        // Return response
        return response()->json([
            'message' => 'Logged out',
        ]);
    }
}
