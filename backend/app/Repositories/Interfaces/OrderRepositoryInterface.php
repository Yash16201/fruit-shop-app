<?php

namespace App\Repositories\Interfaces;


interface OrderRepositoryInterface{
    public function add($request);
    public function getOrders($request);
    public function trackOrder($request);
}