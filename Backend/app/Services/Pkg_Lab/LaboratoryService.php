<?php

namespace App\Services\Pkg_Lab;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Lab\LaboratoryRepository;

class LaboratoryService extends BaseService
{
    public function __construct(LaboratoryRepository $laboratoryRepository)
    {
        parent::__construct($laboratoryRepository);
    }
}
