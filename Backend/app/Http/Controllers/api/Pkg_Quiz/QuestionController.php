<?php

namespace App\Http\Controllers\Api\Pkg_Quiz;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\QuestionRequest;
use App\Services\Pkg_Quiz\QuestionService;

class QuestionController extends BaseController
{
    public function __construct(QuestionService $laboratoryService)
    {
        parent::__construct($laboratoryService);
    }


    public function store(QuestionRequest $request)
    {
        $validated = $request->validated();

        $category = $this->service->create($validated);

        return response()->json(
            ['status'=>true,
            'data'=>$category,
            'message' => 'Création réussie'],
            201);
    }

    public function update(QuestionRequest $request, $id)
    {
        $item = $this->service->find($id);
        if (!$item) {
            return response()->json(
                ['status' => false,
                'message' => 'Laboratory non trouvée'],
                404);
        }
        $validated = $request->validated();
        $item = $this->service->update($id, $validated);
        return response()->json(
            [
            'status' => true,
            'data' => $item,
            'message' => 'Mise à jour réussie',
            ],200
        );
    }
}
