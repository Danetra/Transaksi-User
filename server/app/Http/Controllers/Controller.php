<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="My First API Documentation",
 *     version="0.1",
 *      @OA\Contact(
 *          email="info@yeagger.com"
 *      ),
 * ),
 * @OA\Get(
 *     path="/",
 *     @OA\Response(response="200", description="An example endpoint")
 * )
 */

class Controller extends BaseController
{
    //
}
