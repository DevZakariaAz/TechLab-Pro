<?php

namespace App\Services\Pkg_Quiz;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Quiz\AnswerRepository;

class AnswerService extends BaseService
{
    public function __construct(AnswerRepository $answerRepository)
    {
        parent::__construct($answerRepository);
    }
}
