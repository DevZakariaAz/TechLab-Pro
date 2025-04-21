<?php

namespace App\Http\Controllers\Api\Pkg_Quiz;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\AnswerRequest;
use App\Services\Pkg_Quiz\AnswerService;

class AnswerController extends BaseController
{
    public function __construct(AnswerService $laboratoryService)
    {
        parent::__construct($laboratoryService);
    }


    public function store(AnswerRequest $request)
    {
        $validated = $request->validated();

        $category = $this->service->create($validated);

        return response()->json(
            ['status'=>true,
            'data'=>$category,
            'message' => 'Création réussie'],
            201);
    }

    public function update(AnswerRequest $request, $id)
    {
        $item = $this->service->find($id);
        if (!$item) {
            return response()->json(
                ['status' => false,
                'message' => 'Réponse non trouvée'],
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
