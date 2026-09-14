<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class QrToken extends Model
{
    use HasApiTokens;
    
    protected $fillable = [
        'token',
        'is_active',
        'expires_at'
    ];
}
