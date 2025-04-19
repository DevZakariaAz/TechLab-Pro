<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;

class Prerequisite extends Model
{
    public function techniques()
    {
        return $this->belongsToMany(Technique::class,'prerequisite_technique');
    }
}
