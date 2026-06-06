<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveRecording extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'titulo',
        'duration',
        'size',
        'url'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
