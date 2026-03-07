<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;




Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route::resource('users', UserController::class);
    Route::get('users', [UserController::class, 'index'])->name('users.index')->middleware('can:view users');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create')->middleware('can:create users');
    Route::post('users', [UserController::class, 'store'])->name('users.store')->middleware('can:create users');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit')->middleware('can:edit users');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update')->middleware('can:edit users');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy')->middleware('can:delete users');


    // Route::resource('permissions', PermissionController::class);
    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index')->middleware('can:view permissions');
    Route::get('permissions/create', [PermissionController::class, 'create'])->name('permissions.create')->middleware('can:create permissions');
    Route::post('permissions', [PermissionController::class, 'store'])->name('permissions.store')->middleware('can:create permissions');
    Route::get('permissions/{user}/edit', [PermissionController::class, 'edit'])->name('permissions.edit')->middleware('can:edit permissions');
    Route::put('permissions/{user}', [PermissionController::class, 'update'])->name('permissions.update')->middleware('can:edit permissions');
    Route::delete('permissions/{user}', [PermissionController::class, 'destroy'])->name('permissions.destroy')->middleware('can:delete permissions');

    // Route::resource('roles', RolesController::class);
    Route::get('roles', [RolesController::class, 'index'])->name('roles.index')->middleware('can:view roles');
    Route::get('roles/create', [RolesController::class, 'create'])->name('roles.create')->middleware('can:create roles');
    Route::post('roles', [RolesController::class, 'store'])->name('roles.store')->middleware('can:create role');
    Route::get('roles/{role}/edit', [RolesController::class, 'edit'])->name('roles.edit')->middleware('can:edit roles');
    Route::put('roles/{role}', [RolesController::class, 'update'])->name('roles.update')->middleware('can:edit roles');
    Route::delete('roles/{role}', [RolesController::class, 'destroy'])->name('roles.destroy')->middleware('can:delete roles');

});
require __DIR__.'/settings.php';
