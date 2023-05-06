<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komentar_M extends Model
{
    use HasFactory;
    protected $table="tbl_komentar";
    protected $primaryKey="id";
    public $timestamps = false;
    protected $fillable = ["id","id_pengguna","nama_komentar","parent_id",
    "sub_parent_id","tgl","waktu","komentar","id_video","reply"];
}
