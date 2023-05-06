/*jshint esversion: 6 */
var app = angular.module("homeApp", ["ngRoute"]);
app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var len = 0;

    $("#cover-spin").show();
    service.dataKepsek((row) => {
        const x = row.data[0];
        const y = row.dataakun;
        len = y;
        if (y == 0) {
            fun.cek = true;
            fun.username = "-";
            fun.sandi = "-";
        } else {
            fun.id_akun = y[0].id;
            fun.username = y[0].username;
            fun.sandi = y[0].sandiasli;
        }
        fun.id_pengguna = x.id;
        fun.nama_lengkap = x.nama;
        fun.alamat = x.alamat;
        fun.email = x.email;
        fun.jenis_kelamin = x.jenis_kelamin;
        fun.nomor_hp = x.nomor_hp;
        $("#cover-spin").hide();
    });

    fun.simpan = () => {
        if (len == 0) {
            const obj = {
                username: fun.username,
                id_pengguna: fun.id_pengguna,
                sandi: fun.sandi,
                nama_lengkap: fun.nama_lengkap,
                hak_akses: 3,
            };
            $("#cover-spin").show();
            service.savePengguna(obj, (row) => {
                $("#cover-spin").hide();
                if (row > 0) {
                    swal({
                        text: "Perbarui data akun kepala sekolah berhasil",
                        icon: "success",
                    });
                } else {
                    swal({
                        text: "Ada kesalahan !",
                        icon: "error",
                    });
                }
            });
        } else {
            const obj = {
                username: fun.username,
                id_pengguna: fun.id_pengguna,
                sandi: fun.sandi,
                nama_lengkap: fun.nama_lengkap,
                hak_akses: 3,
                id: fun.id_akun,
            };
            $("#cover-spin").show();
            service.updatePengguna(obj, (row) => {
                $("#cover-spin").hide();
                if (row > 0) {
                    swal({
                        text: "Perbarui data akun kepala sekolah berhasil",
                        icon: "success",
                    });
                } else {
                    swal({
                        text: "Ada kesalahan !",
                        icon: "error",
                    });
                }
            });
        }
    };
});
