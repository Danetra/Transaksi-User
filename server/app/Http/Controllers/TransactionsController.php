<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Transactions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class TransactionsController extends Controller
{
    //
    public function index()
    {
        $transactions = Transactions::getTransactions();
        if(count($transactions) > 0)
        {
            return response()->json([
                'status' => 200,
                'data' => $transactions
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
        $transactions = $this->transactions($request);
        // dd($transactions);
        DB::beginTransaction();

        try {
            //code...
            Transactions::insert($transactions[0]);
            Product::whereId((int)$request->input('product_id'))->update($transactions[1]);
            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'Transctions Will Be Proccess'
            ], 200);

        } catch (\Throwable $th) {
            //throw $th;
            // dd($th);
            DB::rollback();
            return response()->json([
                'status' => 400,
                'message' => 'Transctions Failed'
            ], 400);
        }

    }

    private function transactionsValidate($request)
    {
        return $this->validate($request, [
            'quantity' => 'required',
            'product_id' => 'required',
        ]);
    }

    private function transactions($request)
    {
        $validate = $this->transactionsValidate($request);

        $key = "DATAUTAMA";
        $product = Transactions::getProductsDetail($request->input('product_id'));

        $quantity = $request->input('quantity');

        $stock = $product[0]->stock;

        $price = (int)$product[0]->price;

        $payment = $quantity * $price;

        $reduction = $stock - $quantity;

        $reference = Http::withHeaders([
            'X-API-KEY' => $key
        ])->post('https://pay.saebo.id/test-dau/api/v1/transactions', [
            'quantity' => $quantity,
            'price' => $price,
            'payment_amount' => $payment
        ]);
        $trans = json_decode($reference, true);
        $transaction = [
            'reference_no' => $trans['data']['reference_no'],
            'price' => $trans['data']['price'],
            'quantity' => $quantity,
            'payment_amount' => $trans['data']['payment_amount'],
            'product_id' => (int)$request->input('product_id'),
            'created_at' => date("Y-m-d H:i:s")
        ];

        $checkout = [
            'stock' => $reduction
        ];

        // dd($transaction);

        return [$transaction, $checkout];
    }
}
