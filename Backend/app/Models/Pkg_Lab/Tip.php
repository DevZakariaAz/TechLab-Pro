<?php

namespace App\Models\Pkg_Lab;

use Illuminate\Database\Eloquent\Model;

class Tip extends Model
{
    protected $fillable = ['tip','description'];
    public function steps()
    {
        return $this->belongsToMany(Step::class, 'step_tip')
                    ->withPivot('duration');
    }
}
$technique = Technique::with('steps')->find(2);
return $technique->steps;
