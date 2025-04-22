<?php

namespace App\Http\Controllers\Api\Pkg_Lab;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TechniqueRequest;
use App\Services\Pkg_Lab\TechniqueService;

class TechniqueController extends BaseController
{
    public function __construct(TechniqueService $techniqueService)
    {
        parent::__construct($techniqueService);
    }

    
    public function store(TechniqueRequest $request)
    {
        $validated = $request->validated();

        $category = $this->service->create($validated);

        return response()->json(
            ['status'=>true,
            'data'=>$category,
            'message' => 'Création réussie'],
            201);
    }


    public function update(TechniqueRequest $request, $id)
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
