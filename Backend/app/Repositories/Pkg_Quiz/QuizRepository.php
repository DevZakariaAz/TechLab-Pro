<?php

namespace App\Repositories\Pkg_Quiz;

use App\Models\Pkg_Quiz\Quiz;
use App\Repositories\Base\BaseRepository;

class QuizRepository extends BaseRepository
{
    public function __construct(Quiz $quiz)
    {
        parent::__construct($quiz);
    }
}
