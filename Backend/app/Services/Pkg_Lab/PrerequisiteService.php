<?php

namespace App\Services\Pkg_Lab;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Lab\PrerequisiteRepository;

class PrerequisiteService extends BaseService
{
    public function __construct(PrerequisiteRepository $prerequisiteRepository)
    {
        parent::__construct($prerequisiteRepository);
    }
}
