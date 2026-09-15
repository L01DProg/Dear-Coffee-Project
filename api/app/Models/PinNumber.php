<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class PinNumber extends Model
{   
    Use HasApiTokens;
    
    protected $fillable = [
        'pin_number'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
