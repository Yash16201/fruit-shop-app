<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DispatchDetails extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'full_name',
        'email',
        'contact',
        'user_type',
        'address',
        'landmark',
        'city',
        'zip',
        'state',
        'country',
        'instructions'
    ];
    public function order(){
        return $this->belongsTo(Order::class);
    }
}
