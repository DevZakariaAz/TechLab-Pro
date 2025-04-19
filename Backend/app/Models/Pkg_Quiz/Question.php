<?php

namespace App\Models\Pkg_Quiz;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
    public function answers()
    {
        return $this->belongsToMany(Answer::class, 'options')
        ->withPivot('is_correct');
    }
}
