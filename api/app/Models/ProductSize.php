<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    protected $fillable = [
        'product_id',
        'size',
        'price',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function stock()
    {
        return $this->hasOne(Stock::class, 'product_size_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'product_size_id');
    }
}
