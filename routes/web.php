<?php

use App\Http\Controllers\My\PropertyController as MyPropertyController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\FilePondUploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('properties', PropertyController::class)
    ->only(['index', 'show']);

Route::get('/contact', function () {
    return "Contacts Page";
})->name('contact');

Route::redirect('/dashboard', '/my/properties/')->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('upload', [FilePondUploadController::class, 'store']);

    Route::group([
        'prefix' => 'my',
        'as' => 'my.',
    ],function () {
        Route::resource('properties', MyPropertyController::class)
            ->only(['index', 'store', 'create', 'show']);

        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
