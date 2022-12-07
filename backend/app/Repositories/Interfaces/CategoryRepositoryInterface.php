<?php

namespace App\Repositories\Interfaces;


interface CategoryRepositoryInterface{
    public function add($request);
    public function edit($request);
    public function delete($request);
    public function fetch();
}