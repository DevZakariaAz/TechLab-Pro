<?php

namespace App\Services\Base;

use App\Repositories\Base\BaseRepository;
use App\Repository\RepositoryContract;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class BaseService implements ServiceContract
{
    /**
     * The repository instance.
     *
     * @var RepositoryContract
     */
    protected $repository;

    /**
     * BaseService constructor.
     *
     * @param RepositoryContract $repository The repository instance to handle data operations.
     */
    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Retrieve all records, optionally with related models.
     *
     * @return mixed A collection of all records.
     */
    public function all(): mixed
    {
        return $this->repository->all();
    }

    /**
     * Find a specific record by its unique ID.
     *
     * @param int $id The unique identifier of the record.
     * @return mixed The found record or null if not found.
     */
    public function find(int $id): mixed
    {
        return $this->repository->find($id);
    }

    /**
     * Create a new record with validation.
     *
     * @param FormRequest $request The HTTP request containing input data.
     * @return bool True if creation is successful, false otherwise.
     */
    public function create(array $data)
    {
        $item = $this->repository->create($data);
        return $item;
    }

    /**
     * Update an existing record by its ID.
     *
     * @param int $id The unique identifier of the record.
     * @param FormRequest $request The HTTP request containing updated data.
     * @return void
     */
    public function update(int $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    /**
     * Delete a record by its unique ID.
     *
     * @param int $id The unique identifier of the record.
     * @return bool True if deletion was successful, false otherwise.
     */
    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function count(): int
    {
        return $this->repository->count();
    }

}
