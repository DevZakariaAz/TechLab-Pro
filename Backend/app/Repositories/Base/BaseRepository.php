<?php

namespace App\Repositories\Base;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements RepositoryContract

{
    /**
     * The model instance.
     *
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all models.
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Find a model by its ID.
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create a new model.
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * Update an existing model by ID.
     */
    public function update($id, array $attributes)
    {
        $model = $this->find($id);

        if ($model) {
            $model->update($attributes);
            return $model;
        }

        return null;
    }

    /**
     * Delete a model by ID.
     */
    public function delete($id)
    {
        $model = $this->find($id);

        if ($model) {
            return $model->delete();
        }
        return false;
    }
}
