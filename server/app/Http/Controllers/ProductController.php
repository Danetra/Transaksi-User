<?php

namespace App\Http\Controllers;
use App\Models\Product;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index()
    {
        $product = Product::getProduct();
        if(count($product) > 0)
        {
            return response()->json([
                'status' => 200,
                'data' => $product
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Data Empty'
            ], 400);
        }
    }

    public function create(Request $request)
    {
        $option = 'insert';
        $form = $this->productForm($request, $option);
        $create = Product::insert($form);
        if($create)
        {
            return response()->json([
                'status' => 200,
                'message' => 'Insert Success'
            ], 200);
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Insert Failed'
            ], 401);
        }
    }

    public function edit($id)
    {
        $data = Product::getProductById($id);
        if($data)
        {
            return response()->json([
                'status' => 200,
                'data' => $data
            ], 200);
        }else{
            return response()->json([
                'status' => 403,
                'message' => 'Data Not Found'
            ], 403);
        }
    }

    public function update(Request $request)
    {
        $option = 'update';
        $form = $this->updateProductForm($request, $option);
        $update = Product::whereId($request->input('id'))->update($form);
        if($update)
        {
            return response()->json([
                'status' => 200,
                'message' => 'Update Success'
            ], 200);
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Update Failed'
            ], 401);
        }
    }

    public function delete($id)
    {
        $delete = Product::find($id)->delete();
        if($delete)
        {
            return response()->json([
                'status' => 200,
                'message' => 'Delete Success'
            ], 200);
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Delete Failed'
            ], 401);
        }
    }

    private function productValidate($request, $option)
    {
        if($option == 'insert')
        {
            return $this->validate($request, [
                'name' => 'required',
                'price' => 'required',
                'stock' => 'required'
            ]);
        }else if($option == 'update')
        {
            return $this->validate($request, [
                'name' => 'required',
                'price' => 'required',
                'stock' => 'required',
                'id' => 'required'
            ]);
        }
    }

    private function productForm($request, $option)
    {
        $validate = $this->productValidate($request, $option);

        $name = $request->input('name');
        $price = (int)$request->input('price');
        $stock = (int)$request->input('stock');
        $description = $request->input('description');

        $form = [
            'name' => $name,
            'price' => $price,
            'stock' => $stock,
            'description' => $description,
            'created_at' => date("Y-m-d H:i:s")
        ];
        return $form;
    }

    private function updateProductForm($request, $option)
    {
        $validate = $this->productValidate($request, $option);

        $id = $request->input('id');
        $name = $request->input('name');
        $price = (int)$request->input('price');
        $stock = (int)$request->input('stock');
        $description = $request->input('description');
        // dd($price);

        $form = [
            'name' => $name,
            'price' => $price,
            'stock' => $stock,
            'description' => $description,
            'updated_at' => date("Y-m-d H:i:s"),
            'id' => $id
        ];
        return $form;

    }
}
