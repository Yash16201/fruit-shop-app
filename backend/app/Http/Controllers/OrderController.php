<?php

namespace App\Http\Controllers;
use App\Repositories\Interfaces\OrderRepositoryInterface;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private $orderRepository;
    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }
    public function validateOrder(Request $request){
        $response = $this->orderRepository->validateOrder($request);
        return $response;
    }
    public function add(Request $request){
        $response = $this->orderRepository->add($request);
        return $response;
    }
    public function getAllOrders(){
        $response = $this->orderRepository->getAllOrders();
        return $response;
    }
    public function getOrders(Request $request){
        $response = $this->orderRepository->getOrders($request);
        return $response;
    }
    public function trackOrder(Request $request){
        $response = $this->orderRepository->trackOrder($request);
        return $response;
    }
    public function updateStatus(Request $request){
        $response = $this->orderRepository->updateStatus($request);
        return $response;
    }
    public function updatePaymentStatus(Request $request){
        $response = $this->orderRepository->updatePaymentStatus($request);
        return $response;
    }
}
