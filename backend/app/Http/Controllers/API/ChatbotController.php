<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends BaseController
{
    /**
     * Handle the chatbot messaging request.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $userMessage = $request->input('message');
        $n8nUrl = config('services.n8n.chatbot_url');

        if (empty($n8nUrl)) {
            return $this->sendError('El servicio de chatbot de n8n no está configurado.');
        }

        // Usamos el ID del usuario autenticado como sessionId, si no está autenticado usamos un fallback único o de sesión
        $sessionId = auth()->check() ? auth()->id() : 'guest_session_' . session()->getId();

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($n8nUrl, [
                'chatInput' => $userMessage,
                'sessionId' => $sessionId,
            ]);

            if ($response->successful()) {
                Log::info('n8n Response Raw: ' . $response->body());
                $reply = $response->json('output') ?? $response->json('response') ?? $response->json('text') ?? $response->body() ?? 'No pude generar una respuesta en este momento.';
                return $this->sendResponse(['reply' => $reply], 'Respuesta generada correctamente por n8n');
            }

            Log::error('n8n Chatbot Webhook Error: ' . $response->body());
            return $this->sendError('Error de comunicación con el chatbot de n8n.');

        } catch (\Exception $e) {
            Log::error('Exception in ChatbotController: ' . $e->getMessage());
            return $this->sendError('Ocurrió un error al procesar tu solicitud con el chatbot.');
        }
    }

    /**
     * Get a mock response if no API key is provided.
     */
    private function getMockResponse($message)
    {
        $messageLower = strtolower($message);
        $reply = "No se ha configurado la variable GEMINI_API_KEY en el backend. ";

        if (str_contains($messageLower, 'token') || str_contains($messageLower, 'laravel')) {
            $reply .= "Para autenticar una API con Laravel Sanctum, debes emitir tokens usando:\n\n`\$token = \$user->createToken('auth_token')->plainTextToken;` \n\nEsto genera una cadena segura que el cliente enviará en las cabeceras HTTP como Bearer Token.";
        } elseif (str_contains($messageLower, 'docker') || str_contains($messageLower, 'caddy') || str_contains($messageLower, 'frankenphp')) {
            $reply .= "FrankenPHP utiliza un servidor web integrado Caddy. Tu archivo `Caddyfile` en la raíz se encarga de redireccionar todas las peticiones entrantes a `public/index.php`. Asegúrate de mapear el puerto 80 del contenedor al puerto local deseado en tu `docker-compose.yml`.";
        } elseif (str_contains($messageLower, 'react') || str_contains($messageLower, 'hooks')) {
            $reply .= "En React, los hooks como useState y useEffect te permiten usar estado y ciclo de vida en componentes funcionales. Recuerda no llamarlos dentro de bucles o condiciones.";
        } else {
            $reply .= "¡Hola! Recibí tu mensaje: \"{$message}\". Configura la API Key de Gemini en tu archivo .env (`GEMINI_API_KEY=tu_api_key`) para que pueda responder a cualquier tema de programación de forma inteligente. 🚀";
        }

        return $this->sendResponse(['reply' => $reply], 'Respuesta de simulación generada (API Key no configurada)');
    }
}
