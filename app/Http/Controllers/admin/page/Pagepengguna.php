<?php

namespace App\Http\Controllers\admin\page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
class Pagepengguna extends Controller
{
    public function index(){
        if(isset($_COOKIE["userid"])){
            $userid=Crypt::decryptString($_COOKIE["userid"]);
            $datalogin=DB::table("tbl_admin")->where("id",$userid)->select()->get();
            $data=(Object)[
                "keterangan"=>"Data Pengguna"
            ];
            return view("admin.pengguna",compact("datalogin",'data'));
        }
        else{
            return redirect("admin/login");
        }
    }
}
