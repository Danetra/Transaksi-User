<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Transactions extends Model
{
    //
    protected $table = 'transactions';
    protected $fillable = [
        'reference_no', 'price', 'quantity', 'payment_amount', 'product_id', 'created_at'
    ];

    public static function getTransactions()
    {
        $product = DB::select("SELECT transactions.reference_no reference, transactions.price product_price, transactions.quantity quantity, transactions.payment_amount payment_amount, products.name product_name, products.stock product_stock, transactions.created_at created FROM transactions inner join products on transactions.product_id = products.id");
        return $product;
    }

    public static function getProductsDetail($id)
    {
        $transactions = DB::select("SELECT * FROM products where id=$id");
        return $transactions;
    }


}
