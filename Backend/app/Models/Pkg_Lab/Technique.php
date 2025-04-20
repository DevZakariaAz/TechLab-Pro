<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Technique extends Model
{
    protected $fillable = ['title', 'image', 'description','laboratory_id', 'category_id'];
    public function users()
    {
        return $this->belongsToMany(User::class, 'assignments')
            ->withTimestamps();
    }

    public function favoredByUsers()
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
        return $this->belongsToMany(Step::class, 'step_technique');
    }
}
