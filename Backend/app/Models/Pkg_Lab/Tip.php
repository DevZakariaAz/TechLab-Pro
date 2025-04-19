<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;

class Tip extends Model
{
    public function steps()
    {
        return $this->belongsToMany(Tip::class, 'step_tip')
        ->withPivot('duration');
    }
}
