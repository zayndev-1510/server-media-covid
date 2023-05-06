<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengguna_M extends Model
{
    use HasFactory;
    protected $table="tbl_pengguna";
    protected $primaryKey="id";
    public $timestamps = false;
    protected $fillable = ["id","nama_lengkap","alamat","nomor_telepon","foto_profil","tgl_buat","waktu_buat"];
}
