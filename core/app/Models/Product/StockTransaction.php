<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockTransaction extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];

    public function stock(){
        return $this->belongsTo(\App\Models\Product\Stock::class,'stock_id','id');
    }
    public function type(){
        return $this->belongsTo(\App\Models\Product\StockTransactionType::class,'transaction_type_id','id');
    }
    public function user(){
        return $this->belongsTo(\App\Models\User::class,'user_id','id');
    }
}
