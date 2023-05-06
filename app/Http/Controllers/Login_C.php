<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
class Login_C extends Controller
{
    public function loginAkun(Request $r){
        $username=$r->username;
        $x=DB::table("tbl_login")->where("username",$username)->select("*")->get();
        if(count($x)>0){
            $data=$x[0];
            try {
                $unlockpassword=Crypt::decryptString($data->sandi);
                if($unlockpassword==$r->sandi){

                    echo json_encode([
                        "val"=>1,
                        "message"=>"success",
                        "id_pengguna"=>$x[0]->id_pengguna,
                        "lvl"=>$x[0]->lvl
                    ]);
                }
                else{
                    echo json_encode([
                        "val"=>2,
                        "message"=>"Password incorrect"
                    ]);
                }
            } catch (Exception $e) {
                echo json_encode([
                    "val"=>999,
                    "message"=>"You have error in ".$e->getMessage()
                ]);
            }
        }
        else{
            echo json_encode([
                "val"=>0,
                "data"=>[]
            ]);
        }
    }

    public function cekAkun(Request $r){
        $id_pengguna=$r->id_pengguna;
        $x=DB::table("tbl_login")->where("id_pengguna",$id_pengguna)->select("*")->get();
        if(count($x)>0){
            $data=$x[0];
            try {
               echo json_encode(
                    [
                        "val"=>1,
                        "data"=>$data
                    ]
                    );
            } catch (Exception $e) {
                echo json_encode([
                    "val"=>999,
                    "message"=>"You have error in ".$e->getMessage()
                ]);
            }
        }
        else{
            echo json_encode([
                "val"=>0,
                "data"=>[]
            ]);
        }

    }
}
