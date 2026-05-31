<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends BaseController
{
    /**
     * Handle user login authentication.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('CodeMasterToken')->plainTextToken;

            return $this->sendResponse([
                'user' => $user,
                'token' => $token
            ], 'Inicio de sesión exitoso.');
        }

        return $this->sendError('Credenciales inválidas.', [], 401);
    }

    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'estudiante',
        ]);

        $token = $user->createToken('CodeMasterToken')->plainTextToken;

        return $this->sendResponse([
            'user' => $user,
            'token' => $token
        ], 'Usuario registrado exitosamente.');
    }

    /**
     * Handle user logout and revoke tokens.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse([], 'Sesión cerrada correctamente.');
    }

    /**
     * Get authenticated user profile.
     */
    public function me(Request $request)
    {
        $user = $request->user();
        return $this->sendResponse($user, 'Perfil obtenido correctamente.');
    }

    /**
     * Update user profile.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $request->name,
        ]);

        return $this->sendResponse($user, 'Perfil actualizado correctamente.');
    }
}
