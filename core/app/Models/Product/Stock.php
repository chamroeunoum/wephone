<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    /**
     * Relationships
     */
    public function product(){
        return $this->belongsTo(\App\Models\Product\Product::class,'product_id','id');
    }
    public function attributeVariant(){
        return $this->belongsTo(\App\Models\Product\attributeVariant::class,'attribute_variant_id','id');
    }
    public function unit(){
        return $this->belongsTo(\App\Models\Product\Unit::class,'unit_id','id');
    }
    public function transactions(){
        return $this->hasMany(\App\Models\Product\StockTransaction::class,'stock_id','id');
    }
}
