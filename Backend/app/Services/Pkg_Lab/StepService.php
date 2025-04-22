<?php

namespace App\Services\Pkg_Lab;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Lab\StepRepository;

class StepService extends BaseService
{
    public function __construct(StepRepository $stepRepository)
    {
        parent::__construct($stepRepository);
    }
}
