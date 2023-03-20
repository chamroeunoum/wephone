<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockTransactionType extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];

    public function stockTransactions(){
        return $this->hasMany(\App\Models\Product\StockTransaction::class,'transaction_type_id','id');
    }
}
