<?php

namespace App\Services\Pkg_Quiz;

use App\Services\Base\BaseService;
use App\Repositories\Pkg_Quiz\QuestionRepository;

class QuestionService extends BaseService
{
    public function __construct(QuestionRepository $questionRepository)
    {
        parent::__construct($questionRepository);
    }
}
