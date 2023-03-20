<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitConvention extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    /**
     * Relationships
     */
    public function product(){
        return $this->belongsTo(\App\Models\Product\Product::class,'product_id','id');
    }
    public function bunit(){
        return $this->belongsTo(\App\Models\Product\Unit::class,'bunit_id','id');
    }
    public function sunit(){
        return $this->belongsTo(\App\Models\Product\Unit::class,'sunit_id','id');
    }
}
