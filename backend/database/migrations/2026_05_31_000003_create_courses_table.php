<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('titulo');
            $table->text('descripcion');
            $table->string('nivel'); // Principiante, Intermedio, Avanzado
            $table->string('duracion');
            $table->decimal('precio', 8, 2);
            $table->integer('descuento')->default(0); // en %
            $table->string('imagen_gradient');
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->integer('total_estudiantes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
