<?php

use App\Http\Controllers\admin\page\Pagedashboard;
use App\Http\Controllers\guru\page\Pagedashboard as guruPage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\page\Pageguru;
use App\Http\Controllers\admin\page\Pagejadwal;
use App\Http\Controllers\admin\page\Pagelogin;
use App\Http\Controllers\admin\page\Pagemapel;
use App\Http\Controllers\admin\page\Pageorangtua;
use App\Http\Controllers\admin\page\Pagepengajar;
use App\Http\Controllers\admin\page\Pagepengguna;
use App\Http\Controllers\admin\page\Pageruangan;
use App\Http\Controllers\admin\page\Pagesekolah;
use App\Http\Controllers\admin\page\PageSiswa;
use App\Http\Controllers\admin\page\PageTahun;
use App\Http\Controllers\admin\dao\Logincontroller;
use App\Http\Controllers\kepala_sekolah\page\PageDashboard as KepalaPageDashBoard;
use App\Http\Controllers\kepala_sekolah\page\PageLaporan as LaporanKepalaSekolah;
use App\Http\Controllers\kepala_sekolah\page\PageLaporan;
use App\Http\Controllers\orangtua\page\Orangtuapage;
use App\Http\Controllers\PageHome;

route::get("/",[PageHome::class,"index"]);
route::get("/daftar",[PageHome::class,"daftar"]);
route::get("/cekdaftar",[PageHome::class,"cekhasil"]);
route::get("/detail-kegiatan",[PageHome::class,"detailKegiatan"]);
route::get("/profil-sekolah",[PageHome::class,"profil"]);
route::get("/tata-tertib",[PageHome::class,"tata_tertib"]);
route::get("/kegiatan-sekolah",[PageHome::class,"kegiatan_sekolah"]);


Route::prefix('admin')->group(function () {

    route::get("/page/guru",[Pageguru::class,"index"]);
    route::get("/page/orangtua",[Pageorangtua::class,"index"]);
    route::get("/page/siswa",[PageSiswa::class,"index"]);
    route::get("/page/mapel",[Pagemapel::class,"index"]);
    route::get("/page/pengajar",[Pagepengajar::class,"index"]);
    route::get("/page/jadwal",[Pagejadwal::class,"index"]);
    route::get("/page/tahun-akademik",[PageTahun::class,"index"]);
    route::get("/page/dashboard",[Pagedashboard::class,"index"]);
    route::get("page/sekolah",[Pagesekolah::class,"index"]);
    route::get("/page/ruangan",[Pageruangan::class,"index"]);
    route::get("page/pengguna",[Pagepengguna::class,"index"]);
    route::get("page/akun",[Pagedashboard::class,"akun"]);
    route::get("page/kepala-sekolah",[Pagedashboard::class,"kepalaSekolah"]);
    route::get("login",[Pagelogin::class,"index"]);
    route::get("logout",[Logincontroller::class,"logout"]);
    route::get("page/calon-siswa",[Pagedashboard::class,"calon"]);
});

Route::prefix('guru')->group(function () {
    route::get("/page/dashboard",[guruPage::class,"index"]);
    route::get("/page/tahun-akademik",[guruPage::class,"tahun_akademik"]);
    route::get("/page/ruangan",[guruPage::class,"ruangan"]);
    route::get("/page/matpel",[guruPage::class,"mapel"]);
    route::get("/page/jadwal",[guruPage::class,"jadwal"]);
    route::get("/page/siswa",[guruPage::class,"siswa"]);
    route::get("/page/nilai",[guruPage::class,"nilai"]);
    route::get("/page/raport",[guruPage::class,"raport"]);
    route::get("logout",[Logincontroller::class,"logout"]);  
});

Route::prefix('orangtua')->group(function () {
    route::get("/page/dashboard",[Orangtuapage::class,"index"]);
    route::get("/page/ruangan",[Orangtuapage::class,"ruangan"]);
    route::get("/page/tahun-akademik",[Orangtuapage::class,"tahun_akademik"]);
    route::get("/page/matpel",[Orangtuapage::class,"mapel"]);
    route::get("/page/jadwal",[Orangtuapage::class,"jadwal"]);
    route::get("/page/siswa",[Orangtuapage::class,"siswa"]);
    route::get("/page/nilai",[Orangtuapage::class,"nilai"]);
    route::get("/page/raport",[Orangtuapage::class,"raport"]);
    route::get("logout",[Logincontroller::class,"logout"]);  
});

Route::prefix("kepala-sekolah")->group(function(){
    route::get("/page/dashboard/",[KepalaPageDashBoard::class,"index"]);
    route::get("/page/jadwal/",[KepalaPageDashBoard::class,"jadwal"]);
    route::get("/page/siswa/",[KepalaPageDashBoard::class,"siswa"]);
    route::get("/page/siswa/laporan/{a}/{b}",[LaporanKepalaSekolah::class,"laporan"]);
    
    route::get("/page/raport/",[KepalaPageDashBoard::class,"raport"]);
    route::get("/page/raport/cetak",[PageLaporan::class,"laporanRaport"]);

    route::get("/page/ruangan",[KepalaPageDashBoard::class,"ruangan"]);
    route::get("/page/tahun-akademik",[KepalaPageDashBoard::class,"tahun_akademik"]);
    route::get("/page/matpel",[KepalaPageDashBoard::class,"mapel"]); 
});



?>
