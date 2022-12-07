<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    public function orderdetail(){
        return $this->belongsTo(OrderDetails::class);
    }
    public function detail(){
        return $this->hasOne(ProductDetails::class, 'product_id', 'id');
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }
    public function scopeParticular($query,$value)
    {
        return $query->where('status', 'Active')->where('id', $value);
    }
    public function scopeNamed($query,$value)
    {
        return $query->where('status', 'Active')->where('name','LIKE','%'.$value.'%');
    }
    public function scopeCategorized($query,$value)
    {
        return $query->where('status', 'Active')->where('category_id', $value);
    }

}
