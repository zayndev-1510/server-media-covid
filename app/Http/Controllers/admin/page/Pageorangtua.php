<?php

namespace App\Http\Controllers\admin\page;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
class Pageorangtua extends Controller
{
    public function index(){
        if(isset($_COOKIE["userid"])){
            $userid=Crypt::decryptString($_COOKIE["userid"]);
            $datalogin=DB::table("tbl_admin")->where("id",$userid)->select()->get();
            $agama=DB::table("tbl_agama")->select("*")->get();
            $jabatan=DB::table("tbl_jabatan")->select("*")->get();
            $data=(Object)[
                "agama"=>$agama,
                "keterangan"=>"Data Orang Tua"
            ];
            return view("admin.orangtua",compact("datalogin",'data'));
        }
        else{
            return redirect("admin/login");
        }
    }
}
