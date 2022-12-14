<?php

namespace App\Repositories\Interfaces;

interface AuthRepositoryInterface{
    public function login($request);
    public function register($request);
    public function logout();
}