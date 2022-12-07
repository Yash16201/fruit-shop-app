<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'description',
        'image',
        'price'
    ];
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
