<?php

use App\Http\Controllers\admin\dao\kategoriC;
use App\Http\Controllers\admin\dao\Komentar_C;
use App\Http\Controllers\admin\dao\Media_C;
use App\Http\Controllers\admin\dao\Pengguna_C;
use App\Http\Controllers\Login_C;

use Illuminate\Support\Facades\Route;


route::prefix("app")->group(function(){

    route::get("coba",[Pengguna_C::class,"tesdoang"]);
    route::get("data-video",[Media_C::class,"dataVideo"]);


    route::get("cek-reaksi-love/{id1}/{id2}",[Media_C::class,"cekReaksiLove"]);
    route::get("data-pengguna",[Pengguna_C::class,"dataPengguna"]);
    route::post("data-video-user",[Media_C::class,"dataVideoUser"]);

    route::post("data-komentar-user",[Komentar_C::class,"loadDataKomentar"]);

    route::post("data-komentar-reply",[Komentar_C::class,"loadReply"]);

    route::post("kirim-komentar",[Komentar_C::class,"kirimKomentar"]);
    route::post("kirim-komentar-reply",[Komentar_C::class,"kirimKomentarReply"]);
    route::post("detail-video-user",[Media_C::class,"detailVideoUser"]);




    route::post("upload-video",[Media_C::class,"uploadVideo"]);
    route::post("daftar-akun",[Pengguna_C::class,"daftarAkun"]);
    route::post("upload-foto",[Pengguna_C::class,"uploadfoto"]);
    route::post("login-akun",[Login_C::class,"loginAkun"]);
    route::post("cek-akun",[Login_C::class,"cekAkun"]);

    route::post("data-video-user",[Media_C::class,"dataVideoUser"]);
    route::post("feedback-video",[Media_C::class,"feedBackVideo"]);
    route::post("feedback-love",[Media_C::class,"feedBackVideoLove"]);
    route::post("delete-video",[Media_C::class,"deleteVideo"]);

    route::post("profil-pengguna",[Pengguna_C::class,"profilPengguna"]);
    route::post("profil-admin",[Pengguna_C::class,"profilAdmin"]);

    route::get("data-kategori",[kategoriC::class,"loadData"]);

    route::post("detail-penonton",[Media_C::class,"detailPenonton"]);


});


?>
