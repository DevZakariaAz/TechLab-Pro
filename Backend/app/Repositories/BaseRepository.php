<?php

namespace App\Repository;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class BaseRepository implements RepositoryContract
{
    /**
     * The model instance.
     *
     * @var Model
     */
    protected Model $model;
    /**
     * The relations to be eager loaded.
     *
     * @var mixed
     */
    protected mixed $relations = null;


    /**
     * BaseRepository constructor.
     *
     * @param Model $model The model instance to handle data operations.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    /**
     * Set the relations to be eager loaded.
     *
     * @param array $relations
     * @return void
     */
    public function setRelations(array $relations)
    {
        $this->relations = $relations;
    }
    /**
     * Get all the models from the database.
     *
     * @return Collection
     */
    public function all(array $condition = null): Collection
    {
        if($this->relations == null && $condition == null) return $this->model->all();
        $model = $this->model;
        if($this->relations != null) $model = $model->with($this->relations);
        if($condition != null) {
            if (count($condition) === 3) {
                if (isset($condition[0]) && is_string($condition[0]) && !method_exists($this->model, $condition[0])) {
                    // Direct where clause on the model
                    $model = $model->where($condition[0], $condition[1], $condition[2]);
                } else {
                    // Relationship query
                    $model = $model->whereHas($condition[0], function($query) use ($condition) {
                        $query->where($condition[1], $condition[2]);
                    });
                }
            }
        }
        return $model->get();
    }

    /**
     * Get a specific model from database
     *
     * @param int $id
     * @return mixed
     */
    public function find(int $id): mixed
    {
        if($this->relations != null)
            return $this->model->with($this->relations)->findOrFail($id);
        return $this->model->findOrFail($id);
    }

    /**
     * create a new model into database.
     *
     * @param array $data
     * @return mixed
     */
    public function create(array $data): mixed
    {
        return $this->model->create($data);
    }

    /**
     * update a model data in database.
     *
     * @param int $id
     * @param array $data
     * @return void
     */
    public function update(int $id, array $data): void
    {
        $model = $this->find($id);
        $model->update($data);
    }

    /**
     * deletes a model from database
     *
     * @param int $id
     * @return void
     */
    public function delete(int $id): bool
    {
        return $this->model->destroy($id);
    }

    public function count(): int
    {
        return $this->model->count();
    }
}
