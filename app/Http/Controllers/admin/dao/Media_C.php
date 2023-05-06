<?php

namespace App\Http\Controllers\admin\dao;

use App\Models\Reaction_M;
use App\Models\TblMedia;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Media_C extends Controller
{
    public function facebook_time_ago($timestamp)
    {
        $time_ago = strtotime($timestamp);
        $current_time = time();
        $time_difference = $current_time - $time_ago;
        $seconds = $time_difference;
        $minutes      = round($seconds / 60);           // value 60 is seconds
        $hours           = round($seconds / 3600);           //value 3600 is 60 minutes * 60 sec
        $days          = round($seconds / 86400);          //86400 = 24 * 60 * 60;
        $weeks          = round($seconds / 604800);          // 7*24*60*60;
        $months          = round($seconds / 2629440);     //((365+365+365+365+366)/5/12)*24*60*60
        $years          = round($seconds / 31553280);     //(365+365+365+365+366)/5 * 24 * 60 * 60
        if ($seconds <= 60) {
            return "sekarang";
        } else if ($minutes <= 60) {
            if ($minutes == 1) {
                return "semenit";
            } else {
                return "$minutes menit";
            }
        } else if ($hours <= 24) {
            if ($hours == 1) {
                return "sejam ";
            } else {
                return "$hours jam";
            }
        } else if ($days <= 7) {
            if ($days == 1) {
                return "kemarin";
            } else {
                return "$days hari";
            }
        } else if ($weeks <= 4.3) //4.3 == 52/12
        {
            if ($weeks == 1) {
                return "1 minggu";
            } else {
                return "$weeks minggu";
            }
        } else if ($months <= 12) {
            if ($months == 1) {
                return "1 bulan ";
            } else {
                return "$months bulan";
            }
        } else {
            if ($years == 1) {
                return "1 tahun";
            } else {
                return "$years tahun";
            }
        }
    }
    public function dataVideo()
    {
        $data = DB::table("tbl_video")->select("*")->get();
        $lastTime = date("Y-m-d H:i:s");
        foreach ($data as $key => $value) {
            $temp_tgl = $value->tgl_posting . " " . $value->waktu_posting;

            $tgl_format = $this->facebook_time_ago($temp_tgl);
            $data[$key]->tgl_format = $tgl_format." yang lalu";
        }
        echo json_encode($data);
    }

    public function dataVideoUser(Request $r)
    {
        $id_kategori=$r->id_kategori;
        if($id_kategori==0){
            $data = DB::table("tbl_video as video")->join("tbl_kategori as kategori","kategori.id","=","video.id_kategori")
            ->select("video.id","video.id_kategori","video.judul_video","video.video","video.tgl_posting",
            "video.waktu_posting","video.author","video.love","video.komen","video.lihat")->get();

        }
        else{
            $data = DB::table("tbl_video as video")->join("tbl_kategori as kategori","kategori.id","=","video.id_kategori")
            ->where("video.id_kategori",$id_kategori)->select("video.id","video.id_kategori","video.judul_video","video.video","video.tgl_posting",
            "video.waktu_posting","video.author","video.love","video.komen","video.lihat")->get();

        }
            $lastTime = date("Y-m-d H:i:s");
            foreach ($data as $key => $value) {
            $temp_tgl = $value->tgl_posting . " " . $value->waktu_posting;
            $tgl_format = $this->facebook_time_ago($temp_tgl);
            $value->selected=false;
            $value->tgl_format = $tgl_format." yang lalu";
        }
        echo json_encode($data);
    }

    public function detailVideoUser(Request $r){
        $data=DB::table("tbl_video")->where("id",$r->id_video)->select("*")->first();

        echo json_encode($data);
    }

    public function cekReaksiLove($id_video, $id_pengguna)
    {
        $data = DB::table("tbl_reaction")->where("id_video", $id_video)->where("id_pengguna", $id_pengguna)->select("*")->get();
        echo json_encode($data);
    }

    public function feedBackVideo(Request $r)
    {
        $id_pengguna = $r->id_pengguna;
        $id_video = $r->id_video;

        $x = DB::table("tbl_reaction")->where("id_video", $id_video)->where("id_pengguna", $id_pengguna)->select("*")->get();
        if (count($x) == 0) {
            $datareaksi = [
                "love" => 0,
                "id_pengguna" => $id_pengguna,
                "id_video" => $id_video
            ];
            $x = Reaction_M::create($datareaksi);
            if ($x) {

                $sum = 0;
                $datamedia = TblMedia::where("id", $id_video)->select("*")->get();
                $sum = $datamedia[0]->lihat + 1;
                TblMedia::where("id", $id_video)->update(
                    ["lihat" => $sum]
                );
                echo json_encode([
                    "val" => 1,
                ]);
            } else {
                echo json_encode([
                    "val" => 0
                ]);
            }
        }
    }
    public function feedBackVideoLove(Request $r)
    {
        $id_pengguna = $r->id_pengguna;
        $id_video = $r->id_video;
        $love = $r->love;

        $x = DB::table("tbl_reaction")->where("id_video", $id_video)->where("id_pengguna", $id_pengguna)->select("*")->get();
        if (count($x) > 0) {
            $datareaksi = [
                "love" => $love,
            ];
            $sum = 0;
            $x = Reaction_M::where("id_video", $id_video)->where("id_pengguna", $id_pengguna)->update($datareaksi);

            $datamedia = TblMedia::where("id", $id_video)->select("*")->get();
            if ($love == 1) {
                $sum = $sum + 1;
                $love_new = $datamedia[0]->love + $sum;
            } else if ($love == 0) {
                $sum = $sum + 1;
                $love_new = $datamedia[0]->love - 1;
            }

            TblMedia::where("id", $id_video)->update(
                ["love" => $love_new]
            );
            echo json_encode([
                "val" => 1,
            ]);
        }
    }

    public function uploadVideo(Request $r)
    {
        $uploadPath = public_path('video/');

        if (!File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        $file = $r->file('file');
        $explode = explode('.', $file->getClientOriginalName());
        $originalName = $explode[0];
        $extension = $file->getClientOriginalExtension();
        $rename = 'file_' . date('YmdHis') . '.' . $extension;
        $mime = $file->getClientMimeType();
        $filesize = $file->getSize();
        if ($file->move($uploadPath, $rename)) {
            $datavideo = [
                "judul_video" => $r->judul_video,
                "tgl_posting" => date("Y-m-d"),
                "waktu_posting" => date("H:i:s"),
                "video" => $rename,
                "author" => "admin",
                "love" => 0,
                "komen" => 0,
                "lihat" => 0,
                "id_kategori"=>$r->id_kategori
            ];
            $x = TblMedia::create($datavideo);
            if ($x) {
                return response()->json(
                    [
                        'val' => 1,
                        'message' => "Upload image berhasil",
                        'data' => $rename

                    ]
                );
            } else {
                return response()->json(
                    [
                        'val' => 0,
                        'message' => "Upload gagal",
                    ]
                );
            }
        }
    }

    public function deleteVideo(Request $r){

        $data=json_decode($r->data);
        foreach ($data as $key => $value) {
            # code...
            $id_video=$value;
            $x=TblMedia::where("id",$id_video)->delete();
            if($x){
                Reaction_M::where("id_video",$id_video)->delete();
                echo json_encode([
                    "val"=>1,
                ]);

            }
        }

    }

    public function detailPenonton(Request $r){
        $id_video=$r->id_video;
        $data=DB::table("tbl_reaction as reaksi")->
        join("tbl_pengguna as pengguna","pengguna.id","=","reaksi.id_pengguna")
        ->where("reaksi.id_video",$id_video)->select("pengguna.nama_lengkap","pengguna.foto_profil","pengguna.id")->get();

        echo json_encode($data);
    }
}
