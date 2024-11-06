<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', Auth\LogoutController::class)->name('logout');

    Route::get('/items', Item\IndexController::class)->name('items.index');
    Route::post('/items', Item\CreateController::class)->name('items.create');
    Route::put('/items/{item}', Item\UpdateController::class)->name('items.update');
    Route::delete('/items/{item}', Item\DeleteController::class)->name('items.delete');
});

Route::post('/login', Auth\LoginController::class)->name('login');

Route::get('/teste', function () {
    return response()->json('teste');
});