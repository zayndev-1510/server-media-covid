<?php

namespace App\Http\Controllers\admin\dao;

use App\Models\Login_M;
use App\Models\Pengguna_M;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;

class Pengguna_C extends Controller
{

    public function daftarAkun(Request $r)
    {
        $id_pengguna = substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyz"), 0, 12);
        $sandi = Crypt::encryptString($r->sandi);
        $data = [
            "id" => $id_pengguna, "nama_lengkap" => $r->nama_lengkap,
            "alamat" => $r->alamat, "nomor_telepon" => $r->nomor_telepon,
            "tgl_buat" => date("Y-m-d"), "waktu_buat" => date("H:i:s")
        ];
        $x = Pengguna_M::create($data);
        if ($x) {
            $datalogin = [
                "id_pengguna" => $id_pengguna, "sandi" => $sandi,
                "lvl" => 1, "tgl_buat" => date("Y-m-d"), "username" => $r->username
            ];
            Login_M::create($datalogin);
            echo json_encode([
                "val" => 1,
                "id" => $id_pengguna
            ]);
        } else {
            echo json_encode([
                "val" => 0,
                "id" => ""
            ]);
        }
    }

    public function uploadFoto(Request $r)
    {
        $uploadPath = public_path('akun/' . $r->id_pengguna);

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
            $dataupdate = [
                "foto_profil" => $rename
            ];
            Pengguna_M::where("id", $r->id_pengguna)->update($dataupdate);
            return response()->json(
                [
                    'val' => 1,
                    'message' => "Upload image berhasil",
                    'data' => $rename
                ]
            );
        }

        return response()->json(
            [
                'val' => 0,
                'message' => "Upload gagal",
            ]
        );
    }

    public function dataPengguna(Request $r)
    {
        $data = DB::table("tbl_pengguna as pengguna")->join("tbl_login as login", "pengguna.id", "=", "login.id_pengguna")
            ->select(
                "pengguna.id",
                "login.username",
                "pengguna.nama_lengkap",
                "pengguna.alamat",
                "pengguna.nomor_telepon",
                "pengguna.tgl_buat",
                "pengguna.waktu_buat",
                "pengguna.foto_profil"
            )->get();

        echo json_encode($data);
    }

    public function profilPengguna(Request $r)
    {

        $data = DB::table("tbl_pengguna as pengguna")->join("tbl_login as login", "pengguna.id", "=", "login.id_pengguna")
            ->where("pengguna.id", $r->id_pengguna)
            ->select(
                "pengguna.id",
                "login.username",
                "pengguna.nama_lengkap",
                "pengguna.alamat",
                "pengguna.nomor_telepon",
                "pengguna.tgl_buat",
                "pengguna.waktu_buat",
                "pengguna.foto_profil"
            )->first();

        echo json_encode($data);
    }

    public function profilAdmin(Request $r)
    {

        $data = DB::table("tbl_admin as pengguna")->join("tbl_login as login", "pengguna.id", "=", "login.id_pengguna")
            ->where("pengguna.id", $r->id_pengguna)
            ->select(
                "pengguna.id",
                "login.username",
                "pengguna.nama_lengkap",
                "pengguna.alamat",
                "pengguna.nomor_telepon",
                "pengguna.tgl_buat",
                "pengguna.waktu_buat",
                "pengguna.foto_profil"
            )->first();

        echo json_encode($data);
    }

    public function timeDiff($firstTime, $lastTime): string
    {
        $firstTime = strtotime($firstTime);
        $lastTime = strtotime($lastTime);

        $difference = $lastTime - $firstTime;

        $data['years'] = abs(floor($difference / 31536000));
        $data['days'] = abs(floor(($difference - ($data['years'] * 31536000)) / 86400));
        $data['hours'] = abs(floor(($difference - ($data['years'] * 31536000) - ($data['days'] * 86400)) / 3600));
        $data['minutes'] = abs(floor(($difference - ($data['years'] * 31536000) - ($data['days'] * 86400) - ($data['hours'] * 3600)) / 60));

        $timeString = '';

        if ($data['years'] > 0) {
            $timeString .= $data['years'] . " tahun, ";
        }

        if ($data['days'] > 0) {
            $timeString .= $data['days'] . " hari, ";
        }

        if ($data['hours'] > 0) {
            $timeString .= $data['hours'] . " jam, ";
        }

        if ($data['minutes'] > 0) {
            $timeString .= $data['minutes'] . " menit";
        }

        return $timeString;
    }

    public function tesdoang()
    {
        $firstTime = "2022-01-02 01:50:00";
        $lastTime = "2022-01-02 03:00:00";
        $hasil = $this->timeDiff($firstTime, $lastTime);
        echo $hasil;
    }
}
