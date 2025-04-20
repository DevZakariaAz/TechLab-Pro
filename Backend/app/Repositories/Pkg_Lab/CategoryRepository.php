<?php

namespace App\Repositories\Pkg_Lab;

use App\Models\Pkg_Lab\Category;
use App\Repositories\Base\BaseRepository;

class CategoryRepository extends BaseRepository
{
    public function __construct(Category $category)
    {
        parent::__construct($category);
    }
}
