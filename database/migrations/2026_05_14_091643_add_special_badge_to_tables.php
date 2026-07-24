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
        Schema::table('products', function (Blueprint $table) {
            $table->string('special_badge')->nullable()->after('category');
        });
        Schema::table('porters', function (Blueprint $table) {
            $table->string('special_badge')->nullable()->after('status');
        });
        Schema::table('camping_packages', function (Blueprint $table) {
            $table->string('special_badge')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('special_badge');
        });
        Schema::table('porters', function (Blueprint $table) {
            $table->dropColumn('special_badge');
        });
        Schema::table('camping_packages', function (Blueprint $table) {
            $table->dropColumn('special_badge');
        });
    }
};
