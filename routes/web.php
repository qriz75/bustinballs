<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.welcome');
});

Route::get('/game', function () {
    return view('pages.game');
});
Route::get('/settings', function () {
    return view('pages.settings');
});
Route::get('/highscores', function () {
    return view('pages.highscores');
});
Route::get('/instructions', function () {
    return view('pages.instructions');
});
Route::get('/stats', function () {
    return view('pages.stats');
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
