<?php

use App\Http\Controllers\Landlord\PropertyController;
use App\Http\Controllers\FilePondUploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::post('upload', [FilePondUploadController::class, 'store']);

    Route::group([
        'prefix' => 'landlord',
        'as' => 'landlord.',
    ],function () {
        Route::resource('properties', PropertyController::class)
            ->only(['index', 'store']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
