<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Laboratory extends Model
{
    protected $fillable = ['title', 'image', 'description'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function techniques()
    {
        return $this->hasMany(Technique::class);
    }
}
