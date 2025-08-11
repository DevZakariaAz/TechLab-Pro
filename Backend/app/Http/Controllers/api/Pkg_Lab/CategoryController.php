<?php

namespace App\Http\Controllers\Api\Pkg_Lab;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\CategoryRequest;
use App\Services\Pkg_Lab\CategoryService;

class CategoryController extends BaseController
{
    public function __construct(CategoryService $categoryService)
    {
        parent::__construct($categoryService);
    }

    public function store(CategoryRequest $request)
    {
        $validated = $request->validated();

        $category = $this->service->create($validated);

        return response()->json(
            ['status'=>true,
            'data'=>$category,
            'message' => 'Création réussie'],
            201);
    }


    public function update(CategoryRequest $request, $id)
    {
        $item = $this->service->find($id);
        if (!$item) {
            return response()->json(
                ['status' => false,
                'message' => 'Catégorie non trouvée'],
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
