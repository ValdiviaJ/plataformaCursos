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
            'history' => 'nullable|array',
        ]);

        $userMessage = $request->input('message');
        $history = $request->input('history', []);

        $apiKey = env('GEMINI_API_KEY');

        if (empty($apiKey)) {
            // Smart local mockup fallback if API key is not configured
            return $this->getMockResponse($userMessage);
        }

        // Format history for Gemini API
        $contents = [];
        foreach ($history as $msg) {
            $role = isset($msg['sender']) && $msg['sender'] === 'user' ? 'user' : 'model';
            $text = $msg['text'] ?? '';
            if (!empty($text)) {
                $contents[] = [
                    'role' => $role,
                    'parts' => [
                        ['text' => $text]
                    ]
                ];
            }
        }

        // Append the current message
        $contents[] = [
            'role' => 'user',
            'parts' => [
                ['text' => $userMessage]
            ]
        ];

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}", [
                'contents' => $contents,
                'systemInstruction' => [
                    'parts' => [
                        [
                            'text' => "Eres 'Tutor Virtual CodeMaster', un tutor de programación experto, amable y servicial para la plataforma de educación CodeMaster. Tu misión es responder dudas de desarrollo de software (React, Laravel, Docker, APIs, bases de datos, etc.) con explicaciones concisas y ejemplos de código limpios. Agrega emoticonos para hacerlo interactivo y amigable. Si el usuario te saluda, dale la bienvenida calurosamente."
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'No pude generar una respuesta en este momento.';
                return $this->sendResponse(['reply' => $reply], 'Respuesta generada correctamente');
            }

            Log::error('Gemini API Error: ' . $response->body());
            return $this->sendError('Error de comunicación con la API de IA.', ['details' => $response->json()]);

        } catch (\Exception $e) {
            Log::error('Exception in ChatbotController: ' . $e->getMessage());
            return $this->sendError('Ocurrió un error al procesar tu solicitud.');
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
