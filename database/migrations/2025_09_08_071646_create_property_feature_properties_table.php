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
        Schema::create('property_feature_properties', function (Blueprint $table) {
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('property_feature_id');
            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('property_feature_id')->references('id')->on('property_features')->onDelete('cascade');
            $table->primary(['property_id', 'property_feature_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_feature_properties');
    }
};
