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
        Schema::table('live_classes', function (Blueprint $table) {
            $table->boolean('is_sharing_screen')->default(false)->after('is_active');
            $table->boolean('is_cam_on')->default(false)->after('is_sharing_screen');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_classes', function (Blueprint $table) {
            $table->dropColumn(['is_sharing_screen', 'is_cam_on']);
        });
    }
};
