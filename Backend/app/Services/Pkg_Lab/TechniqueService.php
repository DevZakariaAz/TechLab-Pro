<?php

namespace App\Services\Pkg_Lab;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Lab\TechniqueRepository;

class TechniqueService extends BaseService
{
    public function __construct(TechniqueRepository $techniqueRepository)
    {
        parent::__construct($techniqueRepository);
    }
}
