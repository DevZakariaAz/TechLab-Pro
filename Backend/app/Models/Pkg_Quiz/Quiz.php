<?php

namespace App\Models\Pkg_Quiz;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['tip','description'];
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
