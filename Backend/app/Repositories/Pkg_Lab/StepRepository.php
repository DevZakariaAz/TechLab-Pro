<?php

namespace App\Repositories\Pkg_Lab;

use App\Models\Pkg_Lab\Step;
use App\Repositories\Base\BaseRepository;

class StepRepository extends BaseRepository
{
    public function __construct(Step $tag)
    {
        parent::__construct($tag);
    }
}
