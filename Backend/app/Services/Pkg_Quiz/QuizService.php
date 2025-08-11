<?php

namespace App\Services\Pkg_Quiz;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Quiz\QuizRepository;

class QuizService extends BaseService
{
    public function __construct(QuizRepository $quizRepository)
    {
        parent::__construct($quizRepository);
    }
}
