<?php

namespace App\Repositories\Interfaces;


interface OrderRepositoryInterface{
    public function add($request);
    public function getOrders($request);
    public function getAllOrders();
    public function trackOrder($request);
    public function updateStatus($request);
    public function updatePaymentStatus($request);
}