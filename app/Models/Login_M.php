<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Login_M extends Model
{
    use HasFactory;
    protected $table="tbl_login";
    protected $primaryKey="id";
    public $timestamps = false;
    protected $fillable = ["id","id_pengguna","sandi","lvl","tgl_buat","username"];
}
