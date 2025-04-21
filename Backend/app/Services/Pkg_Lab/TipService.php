<?php

namespace App\Services\Pkg_Lab;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Lab\TipRepository;

class TipService extends BaseService
{
    public function __construct(TipRepository $tipRepository)
    {
        parent::__construct($tipRepository);
    }
}
