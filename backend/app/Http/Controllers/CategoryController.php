<?php

namespace App\Http\Controllers;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryRepository;
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }
    public function add(Request $request){
        $response = $this->categoryRepository->add($request);
        return $response;
    }
    public function edit(Request $request){
        $response = $this->categoryRepository->edit($request);
        return $response;
    }
    public function delete(Request $request){
        $response = $this->categoryRepository->delete($request);
        return $response;
    }
    public function fetch(){
        $response = $this->categoryRepository->fetch();
        return $response;
    }
}
