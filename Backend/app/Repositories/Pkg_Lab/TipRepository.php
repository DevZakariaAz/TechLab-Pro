<?php

namespace App\Repositories\Pkg_Lab;

use App\Models\Pkg_Lab\Tip;
use App\Repositories\Base\BaseRepository;

class TipRepository extends BaseRepository
{
    public function __construct(Tip $tag)
    {
        parent::__construct($tag);
    }
}
