<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = ['id'];
    protected $casts = [
        'images' => 'array'
    ];
    public function units(){
        return $this->hasMany(\App\Models\Product\Product::class,'id','product_id');
    }
    public function stock(){
        return $this->hasMany(\App\Models\Product\Product::class,'id','product_id');
    }
}
