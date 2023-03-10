<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    //
    public function index()
    {
        $home = 'Data Andalan Utama Lumen Api ';
        return $home;
    }
    public function show()
    {
        $user = User::getUser();
        return response()->json([
            'status' => 200,
            'data' => $user
        ]);
    }

    public function login(Request $request)
    {
        $form = $this->validateLogin($request);
        $username = $form[0];
        $password = $form[1];

        $check = User::where('username', '=', $username)->first();
        // dd($check);
        if($check)
        {
            if(Hash::check($password, $check['password']))
            {
                $response = [
                    'code' => 200,
                    'token_type' => 'bearer',
                    'token' => $check->createToken('user')->accessToken,
                    'time' => 3600,
                    'user' => $check['name'],
                    'created_at' => $check['created_at']
                ];
                return response()->json($response, 200);

            }else{
                $response = [
                    'code' => 401,
                    'message' => 'Password is not valid',
                ];
                return response()->json($response, 401);
            }
        }else{
            $response = [
                'code' => 400,
                'message' => 'Account is not found',
            ];
            return response()->json($response, 401);
        }

    }

    public function register(Request $request)
    {
        $validate = $this->validateRegister($request);
        $username = $request->input('username');
        $check = User::checkUser($username);
        // dd($check);
        if($check)
        {
            $response = [
                'code' => 402,
                'message' => 'User is exist',
            ];
            return response()->json($response, 402);
        }
        else{
            $post = array(
                'name' => $request->input('name'),
                'username' => $request->input('username'),
                'password' => Hash::make($request->input('password')),
                'created_at' => date("Y-m-d H:i:s")
            );
            $regist = User::insert($post);
            $response = [
                'code' => 201,
                'message' => 'Regist Successed'
            ];
            return response()->json($response, 201);
        }
    }

    private function validateRegister($request)
    {
        return $this->validate($request, [
            'name' => 'required',
            'username' => 'required',
            'password' => 'required'
        ]);

    }

    private function validateLogin($request)
    {
        $validate = [
            'username' => 'required',
            'password' => 'required'
        ];
        $this->validate($request, $validate);

        $username = $request->input('username');
        $password = $request->input('password');

        return [$username, $password];
    }
}
