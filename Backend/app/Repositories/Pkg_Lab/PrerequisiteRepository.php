<?php

namespace App\Repositories\Pkg_Lab;

use App\Models\Pkg_Lab\Prerequisite;
use App\Repositories\Base\BaseRepository;

class PrerequisiteRepository extends BaseRepository
{
    public function __construct(Prerequisite $prerequisite)
    {
        parent::__construct($prerequisite);
    }
}
