<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblMedia extends Model
{
    use HasFactory;
    protected $table="tbl_video";
    protected $primaryKey="id";
    public $timestamps = false;

    protected $fillable = ["id","love","komen","lihat","author","tgl_posting",
                            "waktu_posting","video","judul_video","id_kategori"];
}
