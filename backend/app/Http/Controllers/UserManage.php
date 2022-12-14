<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserManage extends Controller
{
    private $userRepository;
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function get(){
        $response = $this->userRepository->get();
        return $response;   
    }
}
