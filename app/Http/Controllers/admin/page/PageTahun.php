<?php

namespace App\Http\Controllers\admin\page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
class PageTahun extends Controller
{
    public function index(){
       
        if(isset($_COOKIE["userid"])){
            $userid=Crypt::decryptString($_COOKIE["userid"]);
            $datalogin=DB::table("tbl_admin")->where("id",$userid)->select()->get();
            $agama=DB::table("tbl_agama")->select("*")->get();
            $kelas=DB::table("tbl_ruangan")->select("*")->get();
            $tahunajaran=DB::table("tbl_tahun_ajaran")->select("*")->get();
            $data=(Object)[
                "keterangan"=>"Data Tahun Ajaran"
            ];
            return view("admin.tahun_ajaran",compact("datalogin",'data'));
        }
        else{
            return redirect("admin/login");
        }
    }
}
