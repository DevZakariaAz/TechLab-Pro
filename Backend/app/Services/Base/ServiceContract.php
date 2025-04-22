<?php

namespace App\Services\Base;

interface ServiceContract
{

    public function all();
    public function find(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function count();
}
