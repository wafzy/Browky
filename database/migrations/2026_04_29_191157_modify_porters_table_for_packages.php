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
        Schema::table('porters', function (Blueprint $table) {
            $table->dropColumn('experience_years');
            $table->string('slug')->unique()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('porters', function (Blueprint $table) {
            $table->integer('experience_years')->default(0);
            $table->dropColumn('slug');
        });
    }
};
