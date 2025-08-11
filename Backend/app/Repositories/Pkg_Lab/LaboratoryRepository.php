<?php

namespace App\Repositories\Pkg_Lab;

use App\Models\Pkg_Lab\Laboratory;
use App\Repositories\Base\BaseRepository;

class LaboratoryRepository extends BaseRepository
{
    public function __construct(Laboratory $laboratory)
    {
        parent::__construct($laboratory);
    }
}
