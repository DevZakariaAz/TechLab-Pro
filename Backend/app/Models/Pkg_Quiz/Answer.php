<?php

namespace App\Models\Pkg_Quiz;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['answer'];

    public function questions()
    {
        return $this->belongsToMany(Answer::class, 'options')
        ->withPivot('is_correct');
    }
}
