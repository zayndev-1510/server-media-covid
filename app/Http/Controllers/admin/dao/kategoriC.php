<?php

namespace App\Http\Controllers\admin\dao;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class kategoriC extends Controller
{
    public function loadData(){

        $data=DB::table("tbl_kategori")->select("*")->get();
        $newdata[]=[
            "id"=>0,
            "nama_kategori"=>"Semua"
        ];

        $datanew=[];
        foreach ($data as $key => $value) {
            $datanew[]=$value;
        }

        $result=array_merge($newdata,$datanew);
        echo json_encode($result);
    }


}
