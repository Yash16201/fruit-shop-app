<?php

namespace App\Http\Controllers;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productRepository;
    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function add(Request $request){
        $response = $this->productRepository->add($request);
        return $response;
    }
    public function edit(Request $request){
        $response = $this->productRepository->edit($request);
        return $response;
    }
    public function delete(Request $request){
        $response = $this->productRepository->delete($request);
        return $response;
    }
    public function fetch(){
        $response = $this->productRepository->fetch();
        return $response;
    }
    public function fetchById(Request $request){
        $response = $this->productRepository->fetchById($request);
        return $response;
    }
    public function fetchByName(Request $request){
        $response = $this->productRepository->fetchByName($request);
        return $response;
    }
    public function fetchByCategory(Request $request){
        $response = $this->productRepository->fetchByCategory($request);
        return $response;
    }
}
