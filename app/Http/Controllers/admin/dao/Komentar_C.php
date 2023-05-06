<?php

namespace App\Http\Controllers\admin\dao;

use App\Models\Komentar_M;
use App\Models\TblMedia;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class Komentar_C extends Controller
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
            return "sedetik";
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
    public function loadDataKomentar(Request $r){
        $data=DB::table("tbl_komentar as k")->where("k.id_video",$r->id_video)->where("k.parent_id",0)->select("*")->get();

        $lastTime = date("Y-m-d H:i:s");
        foreach ($data as $key => $value) {
        $temp_tgl = $value->tgl . " " . $value->waktu;
        $tgl_format = $this->facebook_time_ago($temp_tgl);
        $data[$key]->tgl_format = $tgl_format." yang lalu";
        }
        echo json_encode($data);
    }

    public function kirimKomentar(Request $r){
        date_default_timezone_set("Asia/Makassar");
        echo date_default_timezone_get();
        $data=[
            "parent_id"=>0,
            "sub_parent_id"=>0,
            "nama_komentar"=>$r->nama_komentar,
            "komentar"=>$r->komentar,
            "tgl"=>date("Y-m-d"),
            "waktu"=>date("H:i:s"),
            "id_video"=>$r->id_video,
            "id_pengguna"=>$r->id_pengguna
        ];

        $cekkoment=DB::table("tbl_video")->where("id",$r->id_video)->select("*")->get();
        $nilaikoment=0;
        if(count($cekkoment)>0){
            $nilaikoment=$cekkoment[0]->komen+1;
        }else{
            $nilaikoment=1;
        }
        $y=TblMedia::where("id",$r->id_video)->update([
            "komen"=>$nilaikoment
        ]);
        if($y){
            $x=Komentar_M::create($data);
            if($x){
                echo json_encode([
                    "val"=>1
                ]);
            }else{
                echo json_encode([
                    "val"=>0
                ]);
            }
        }
    }

    public function kirimKomentarReply(Request $r){
        date_default_timezone_set("Asia/Makassar");
        echo date_default_timezone_get();
        $cekkoment=DB::table("tbl_video")->where("id",$r->id_video)->select("*")->get();
        $ceksubparent=DB::table("tbl_komentar")->where("parent_id",$r->parent_id)->get();
        $nilaikoment=0;
        $nilaisubparent=0;
        if(count($cekkoment)>0){
            $nilaikoment=$cekkoment[0]->komen+1;
        }else{
            $nilaikoment=1;
        }
        if(count($ceksubparent)>0){
            $nilaisubparent=$ceksubparent[0]->sub_parent_id+1;
        }
        else{
            $nilaisubparent=1;
        }
        $y=TblMedia::where("id",$r->id_video)->update([
            "komen"=>$nilaikoment
        ]);
        if($y){

            Komentar_M::where("id",$r->parent_id)->update([
                "reply"=>1
            ]);

            $data=[
                "parent_id"=>$r->parent_id,
                "sub_parent_id"=>$nilaisubparent,
                "nama_komentar"=>$r->nama_komentar,
                "komentar"=>$r->komentar,
                "tgl"=>date("Y-m-d"),
                "waktu"=>date("H:i:s"),
                "id_video"=>$r->id_video,
                "id_pengguna"=>$r->id_pengguna
            ];
            $x=Komentar_M::create($data);
            if($x){
                echo json_encode([
                    "val"=>1
                ]);
            }else{
                echo json_encode([
                    "val"=>0
                ]);
            }
        }
    }



    public function loadReply(Request $r){
        $data=DB::table("tbl_komentar as k")->where("k.parent_id",$r->id)->select("*")->get();

        $lastTime = date("Y-m-d H:i:s");
        foreach ($data as $key => $value) {
        $temp_tgl = $value->tgl . " " . $value->waktu;
        $tgl_format = $this->facebook_time_ago($temp_tgl);
        $data[$key]->tgl_format = $tgl_format." yang lalu";

        }


        echo json_encode($data);
    }
}
