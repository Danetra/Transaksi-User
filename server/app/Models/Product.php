<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Product extends Model
{
    //
    protected $table = 'products';
    protected $fillable = [
        'name', 'price', 'stock', 'description', 'created_at'
    ];

    public static function getProduct()
    {
        $product = DB::select("SELECT * FROM products");
        return $product;
    }

    public static function getProductById($id)
    {
        $data = DB::select("SELECT * FROM products WHERE id=$id");
        return $data;
    }
}
