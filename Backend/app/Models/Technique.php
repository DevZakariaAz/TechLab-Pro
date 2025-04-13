<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Technique extends Model
{
    protected $fillable = ['title', 'subtitle', 'description', 'rate', 'completed', 'image'];
}
