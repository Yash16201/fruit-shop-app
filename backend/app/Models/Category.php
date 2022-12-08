<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'status'
    ];
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }
    public function scopeParticular($query,$value)
    {
        return $query->where('id',$value)->where('status', 'Active');
    }
    public function product(){
        return $this->hasOne(Product::class, 'category_id', 'id');
    }
}
