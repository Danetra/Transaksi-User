<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

$router->group(['prefix' => 'api/v1'], function () use($router){
    $router->get('/', 'UserController@index');
    $router->get('/user', 'UserController@show');
    $router->post('/login', 'UserController@login');
    $router->post('/register', 'UserController@register');

    $router->group(['prefix' => '/products', 'middleware' => 'auth'], function () use($router){
        $router->get('/', 'ProductController@index');
        $router->post('/create', 'ProductController@create');
        $router->get('/edit/{id}', 'ProductController@edit');
        $router->post('/update', 'ProductController@update');
        $router->delete('/delete/{id}', 'ProductController@delete');
    });
    $router->group(['prefix' => '/transactions', 'middleware' => 'auth'], function () use($router){
        $router->get('/', 'TransactionsController@index');
        $router->post('/create', 'TransactionsController@create');
    });
});
