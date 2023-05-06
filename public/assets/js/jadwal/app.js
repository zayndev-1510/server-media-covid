/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});
var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    fun.checkedtambah = false;
    fun.checktahun = false;
    fun.pengajar = "Pilih Pengajar";
    fun.hari = "Atur Hari";
    fun.id_tahun_ajaran = 0;
    fun.id = 0;
    var id_pengajar = 0;
    var hari = "";
    fun.jam_masuk = "Atur Jam Masuk";
    fun.jam_keluar = "Atur Jam Keluar";
    fun.datahari = [
        { nama: "Senin" },
        { nama: "Selasa" },
        { nama: "Rabu" },
        { nama: "Kamis" },
        { nama: "Jumat" },
        { nama: "Sabtu" },
    ];
    fun.jadwal = {
        senin: [],
        selesa: [],
        rabu: [],
        kamis: [],
        jumat: [],
        sabtu: [],
    };
    fun.dataJadwal = () => {
        service.dataJadwal((row) => {
            var datatemp = row;
            var datahari = fun.datahari;
            for (var i in datahari) {
                var a = datahari[i];
                datahari[i].data = [];
                datahari[i].x = 0;
                var y = 1;
                for (var j in datatemp) {
                    var b = datatemp[j];
                    if (a.nama == b.hari) {
                        datahari[i].data.push(b);
                        datahari[i].x = y;
                        y++;
                    }
                }
            }
            fun.datajadwal = datahari;
        });
    };
    fun.aturJamMasuk = () => {
        fun.checkjam_in = true;
        fun.checktahun = true;
        fun.ket = "Atur Jam Masuk";
    };

    fun.aturJamKeluar = () => {
        fun.checkjam_out = true;
        fun.checktahun = true;
        fun.ket = "Atur Jam Keluar";
    };
    fun.dataJadwal();

    fun.tambahData = () => {
        fun.ket = "Tambah Jadwal";
        fun.checkedtambah = true;
        fun.btnsimpan = true;
        fun.btnperbarui = false;
    };

    fun.pilihPengajar = () => {
        fun.ket = "Atur Pengajar";
        fun.checktahun = true;
        fun.checkpengajar = true;
        service.dataPengajar((row) => {
            fun.datapengajar = row;
        });
    };
    fun.getPengajar = (row) => {
        fun.pengajar =
            row.nama_guru + " " + row.nama_mapel + " " + row.nama_kelas;
        id_pengajar = row.id;
        fun.selesai();
    };
    fun.pilihHari = () => {
        fun.ket = "Atur Hari";
        fun.checktahun = true;
        fun.checkhari = true;
    };
    fun.getHari = (row) => {
        fun.hari = "Hari " + row.nama;
        hari = row.nama;
        fun.selesai();
    };
    fun.detail = (row) => {
        fun.checkedtambah = true;
        fun.pengajar =
            row.nama_guru + " " + row.nama_matpel + " " + row.nama_kelas;
        id_pengajar = row.id;
        fun.btnsimpan = false;
        fun.btnperbarui = true;
        fun.id = row.id;
        fun.hari = row.hari;
        fun.jam_masuk = row.jam_masuk;
        fun.jam_keluar = row.jam_keluar;
        id_pengajar = row.id_pengajar;
        $("#jam_masuk").val(row.jam_masuk);
        $("#jam_keluar").val(row.jam_keluar);
    };

    fun.selesai = () => {
        fun.checkpengajar = false;
        fun.checkhari = false;
        fun.checktahun = false;
        fun.checkjam_in = false;
        fun.ket = "Tambah Jadwal";
    };

    fun.kembali = () => {
        fun.jam_masuk = $("#jam_masuk").val();
        fun.pengajar = "Pilih Pengajar";
        fun.hari = "Atur Hari";
        fun.jam_masuk = "Atur Jam Masuk";
        fun.jam_keluar = "Atur Jam Keluar";
        fun.checkedtambah = false;
        fun.dataJadwal();
    };

    fun.aturJam = (a) => {
        if (a == 0) {
            fun.jam_masuk = $("#jam_masuk").val();
            fun.selesai();
        } else {
            fun.jam_keluar = $("#jam_keluar").val();
            fun.selesai();
        }
    };
    fun.save = () => {
        var obj = {
            id_pengajar: id_pengajar,
            hari: hari,
            jam_masuk: $("#jam_masuk").val(),
            jam_keluar: $("#jam_keluar").val(),
        };
        service.saveJadwal(obj, (row) => {
            if (row > 0) {
                swal({
                    text: "Data Ini Berhasil Di Simpan",
                    icon: "success",
                });
                fun.pengajar = "Pilih Pengajar";
            } else {
                swal({
                    text: "Data ini gagal disimpan",
                    icon: "error",
                });
            }
        });
    };

    fun.perbarui = () => {
        var obj = {
            id_pengajar: id_pengajar,
            hari: hari,
            jam_masuk: $("#jam_masuk").val(),
            jam_keluar: $("#jam_keluar").val(),
            id: fun.id,
        };
        service.updateJadwal(obj, (row) => {
            if (row > 0) {
                swal({
                    text: "Data Ini Berhasil Di Perbarui",
                    icon: "success",
                });
            } else {
                swal({
                    text: "Data Ini Gagal Di Perbarui",
                    icon: "error",
                });
            }
        });
    };
    fun.hapus = (row) => {
        const obj = {
            id: row.id,
        };
        service.deleteJadwal(obj, (e) => {
            if (e > 0) {
                swal({
                    text: "Data Ini Berhasil Di Hapus",
                    icon: "success",
                });
                fun.dataJadwal();
            } else {
                swal({
                    text: "Pengajar Ini Gagal Di Hapus",
                    icon: "error",
                });
            }
        });
    };
});
