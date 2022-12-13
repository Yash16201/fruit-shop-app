<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\ModelsOrderDetails;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'total_products_amount',
        'tax',
        'delivery_charge',
        'totalwithtax'   
    ];
    public function user(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function detail(){
        return $this->hasMany(OrderDetails::class, 'order_id', 'id');
    }
    public function dispatch(){
        return $this->hasOne(DispatchDetails::class, 'order_id', 'id');
    }
    public function payment(){
        return $this->hasOne(PaymentDetails::class, 'order_id', 'id');
    }
    public function scopeOrders($query,$value)
    {
        return $query->where('user_id', $value)->with('detail','dispatch','payment');
    }
    public function scopeTrack($query,$value, $value2)
    {
        return $query->where('id', $value)->where('user_id', $value2)->with('detail','detail.product.detail','dispatch','payment');
    }
}
