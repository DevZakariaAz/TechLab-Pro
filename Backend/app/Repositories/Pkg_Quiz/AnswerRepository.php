<?php

namespace App\Repositories\Pkg_Quiz;

use App\Models\Pkg_Quiz\Answer;
use App\Repositories\Base\BaseRepository;

class AnswerRepository extends BaseRepository
{
    public function __construct(Answer $answer)
    {
        parent::__construct($answer);
    }
}
