<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\AuthRepositoryInterface;

class AuthController extends Controller
{
    private $authRepository;
    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }
    public function login(Request $request)
    {
        $response = $this->authRepository->login($request);
        return $response;
    }
    public function register(Request $request){
        $response = $this->authRepository->register($request);
        return $response;
    }
    public function logout()
    {
        $response = $this->authRepository->logout();
        return $response;
    }
}
