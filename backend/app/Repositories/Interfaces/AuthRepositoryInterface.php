<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface AuthRepositoryInterface{
    public function login($request);
    public function register($request);
    public function logout();
}