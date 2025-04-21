<?php

namespace App\Http\Controllers\Api;

use App\Services\Base\BaseService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Pkg_Lab\Category;
use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Http\FormRequest;

abstract class BaseController extends Controller
{
    protected $service;

    public function __construct(BaseService $service)
    {
        $this->service = $service;
    }

    // index
    public function index()
    {
        $items = $this->service->all();
        return response()->json($items);
    }

    // show
    public function show($id)
    {
        $item = $this->service->find($id);

        if (!$item) {
            return response()->json(['message' => 'Élément non trouvé'], 404);
        }

        return response()->json($item);
    }

    // delete
    public function destroy($id)
    {
        $item = $this->service->find($id);

        if (!$item) {
            return response()->json(['message' => 'Élément non trouvé'], 404);
        }

        $this->service->delete($id);

        return response()->json(['message' => 'Suppression réussie']);
    }

    // public function store(FormRequest $request)
    // {
    //     $validated = $request->validated();

    //     $this->service->create($validated);

    //     return response()->json(['message' => 'Création réussie'], 201);
    // }

    // public function update(FormRequest $request, $id)
    // {
    //     $validated = $request->validated();

    //     $item = $this->service->find($id);

    //     if (!$item) {
    //         return response()->json(['message' => 'Élément non trouvé'], 404);
    //     }

    //     $this->service->update($id, $validated);

    //     return response()->json(['message' => 'Mise à jour réussie']);
    // }


}
