<?php

namespace App\Http\Controllers\Api\Pkg_Lab;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\PrerequisiteRequest;
use App\Services\Pkg_Lab\PrerequisiteService;

class PrerequisiteController extends BaseController
{
    public function __construct(PrerequisiteService $prerequisiteService)
    {
        parent::__construct($prerequisiteService);
    }

    public function store(PrerequisiteRequest $request)
    {
        $validated = $request->validated();

        $category = $this->service->create($validated);

        return response()->json(
            ['status'=>true,
            'data'=>$category,
            'message' => 'Création réussie'],
            201);
    }


    public function update(PrerequisiteRequest $request, $id)
    {
        $item = $this->service->find($id);
        if (!$item) {
            return response()->json(
                ['status' => false,
                'message' => 'Prerequisite non trouvée'],
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
