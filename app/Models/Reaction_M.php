<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction_M extends Model
{
    use HasFactory;
    protected $table="tbl_reaction";
    protected $primaryKey="id";
    public $timestamps = false;
    protected $fillable = ["id","id_video","id_pengguna","love"];
}
