<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;

class Step extends Model
{
    public function techniques()
    {
        return $this->belongsToMany(Technique::class, 'step_technique');
    }

    public function tips()
    {
        return $this->belongsToMany(Tip::class, 'step_tip')
        ->withPivot('duration');
    }
}
