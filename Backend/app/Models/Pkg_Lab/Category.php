<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description'];
    public function techniques()
    {
        return $this->hasMany(Technique::class);
    }
}
