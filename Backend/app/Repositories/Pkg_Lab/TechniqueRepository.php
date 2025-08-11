<?php

namespace App\Repositories\Pkg_Lab;

use App\Models\Pkg_Lab\Technique;
use App\Repositories\Base\BaseRepository;

class TechniqueRepository extends BaseRepository
{
    public function __construct(Technique $technique)
    {
        parent::__construct($technique);
    }
}
