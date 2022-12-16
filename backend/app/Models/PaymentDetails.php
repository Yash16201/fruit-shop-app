<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'payment_type',
        'payment_id',
        'payment_status'
    ];
    public function order(){
        return $this->belongsTo(Order::class);
    }
}
