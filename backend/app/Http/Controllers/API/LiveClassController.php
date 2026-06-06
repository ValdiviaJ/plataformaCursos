<?php

namespace App\Http\Controllers\API;

use App\Models\LiveClass;
use App\Models\LiveChatMessage;
use App\Models\LiveRecording;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LiveClassController extends BaseController
{
    public function getActive()
    {
        $activeClass = LiveClass::where('is_active', true)
                                ->with(['course', 'user'])
                                ->latest()
                                ->first();

        return $this->sendResponse($activeClass, 'Clase en vivo obtenida.');
    }

    public function start(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'titulo' => 'required|string|max:255',
        ]);

        // Deactivate any existing active class first
        LiveClass::where('is_active', true)->update(['is_active' => false, 'ended_at' => now()]);

        $liveClass = LiveClass::create([
            'course_id' => $request->course_id,
            'user_id' => Auth::id(),
            'titulo' => $request->titulo,
            'is_active' => true,
            'started_at' => now(),
        ]);

        return $this->sendResponse($liveClass->load(['course', 'user']), 'Clase en vivo iniciada correctamente.');
    }

    public function updateStatus(Request $request)
    {
        $activeClass = LiveClass::where('is_active', true)->first();

        if (!$activeClass) {
            return $this->sendError('No hay ninguna clase activa actualmente.');
        }

        $activeClass->update([
            'is_sharing_screen' => $request->has('is_sharing_screen') ? $request->boolean('is_sharing_screen') : $activeClass->is_sharing_screen,
            'is_cam_on' => $request->has('is_cam_on') ? $request->boolean('is_cam_on') : $activeClass->is_cam_on,
        ]);

        return $this->sendResponse($activeClass, 'Estado de transmisión actualizado.');
    }

    public function end(Request $request)
    {
        $activeClass = LiveClass::where('is_active', true)->first();

        if (!$activeClass) {
            return $this->sendError('No hay ninguna clase activa actualmente.');
        }

        $activeClass->update([
            'is_active' => false,
            'ended_at' => now(),
        ]);

        // Simular la duración del video
        $duration = '1h 35m';
        $size = '380 MB';

        // Guardar la grabación automáticamente
        $recording = LiveRecording::create([
            'course_id' => $activeClass->course_id,
            'titulo' => 'Grabación: ' . $activeClass->titulo,
            'duration' => $duration,
            'size' => $size,
        ]);

        return $this->sendResponse($recording, 'Clase en vivo finalizada y grabación guardada.');
    }

    public function getChat($id)
    {
        $messages = LiveChatMessage::where('live_class_id', $id)
                                   ->with('user')
                                   ->oldest()
                                   ->get();

        return $this->sendResponse($messages, 'Mensajes del chat cargados.');
    }

    public function postChat(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = LiveChatMessage::create([
            'live_class_id' => $id,
            'user_id' => Auth::id(),
            'message' => $request->message,
        ]);

        return $this->sendResponse($message->load('user'), 'Mensaje enviado.');
    }

    public function getRecordings()
    {
        $recordings = LiveRecording::with('course')->latest()->get();
        return $this->sendResponse($recordings, 'Grabaciones recuperadas.');
    }
}
