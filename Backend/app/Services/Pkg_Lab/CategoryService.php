<?php

namespace App\Services\Pkg_Lab;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Lab\CategoryRepository;

class CategoryService extends BaseService
{
    public function __construct(CategoryRepository $categoryRepository)
    {
        parent::__construct($categoryRepository);
    }
}
