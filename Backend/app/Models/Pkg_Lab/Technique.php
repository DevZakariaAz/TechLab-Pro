<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Technique extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class, 'assignments')
            ->withTimestamps();
    }

    public function favoredByTechnicians()
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->withTimestamps();
    }

    public function laboratory()
    {
        return $this->belongsTo(Laboratory::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function prerequisites()
    {
        return $this->belongsToMany(Prerequisite::class, 'prerequisite_technique');
    }

    public function steps()
    {
        return $this->belongsToMany(Technique::class, 'step_technique');
    }
}
