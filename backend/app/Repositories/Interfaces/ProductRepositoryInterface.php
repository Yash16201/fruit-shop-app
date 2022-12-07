<?php

namespace App\Repositories\Interfaces;


interface ProductRepositoryInterface{
    public function add($request);
    public function edit($request);
    public function delete($request);
    public function fetch();
    public function fetchById($request);
    public function fetchByName($request);
    public function fetchByCategory($request);
}