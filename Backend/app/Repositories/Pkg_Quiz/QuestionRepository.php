<?php

namespace App\Repositories\Pkg_Quiz;

use App\Models\Pkg_Quiz\Question;
use App\Repositories\Base\BaseRepository;

class QuestionRepository extends BaseRepository
{
    public function __construct(Question $question)
    {
        parent::__construct($question);
    }
}
