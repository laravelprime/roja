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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('short_desc')->nullable();
            $table->text('description')->nullable();
            $table->string('city');
            $table->string('neighbourhood');
            $table->enum('type', ['room', 'house']);
            $table->decimal('rent', 10, 2);
            $table->decimal('deposit', 10, 2)->nullable();
            $table->string('suitable_for')->nullable();
            $table->string('availability_date')->nullable();
            $table->enum('status', ['available', 'rented'])->default('available');
            $table->string('contact_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
