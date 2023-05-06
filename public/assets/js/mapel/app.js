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
    fun.tahun = "Pilih Tahun Ajaran";
    fun.id_tahun_ajaran = 0;
    fun.id = 0;
    var datamapel = [];
    var j = 0;
    var mapel = document.getElementsByClassName("mapel");
    fun.dataMapel = () => {
        $("#cover-spin").show();
        service.dataMapel((row) => {
            datamapel = row;
            service.dataTahun((respon) => {
                const data = [];
                for (var i in respon) {
                    const e = respon[i];
                    if (e.status == 1) {
                        data.push(e);
                    }
                }
                const x = datamapel.filter((row) => {
                    if (row.id_tahun_ajaran==data[0].id) {
                        return row;
                    }
                });
        
                fun.jmlmatpel = x.length;
                fun.ta = data[0].ket;
                fun.semester=data[0].semester;
                fun.datatahun2 = respon;
                fun.datamapel=x;
            });
            $("#cover-spin").hide();

        });
    };
    fun.dataMapel();
    fun.tambahData = () => {
        fun.ket = "Tambah Pelajaran";
        fun.checkedtambah = true;
        fun.btnsimpan = true;
        fun.btnperbarui = false;
    };
    fun.detail = (row) => {
        fun.id = row.id;
        mapel[0].value = row.ket;
        fun.checkedtambah = true;
        fun.btnsimpan = false;
        fun.btnperbarui = true;
        service.dataTahun((respon) => {
            var res = respon.filter((e) => {
                if (row.id_tahun_ajaran == e.id) {
                    return e;
                }
            });
            fun.tahun =
                "Tahun Ajaran " + res[0].ket + " Semester " + res[0].semester;
            fun.id_tahun_ajaran = row.id_tahun_ajaran;
        });
    };
    fun.setTahunAkademik = () => {
        fun.checktahun = true;
        fun.checkedtambah = true;
        fun.ket = "Tahun Ajaran";
        service.dataTahun((respon) => {
            fun.datatahun2 = respon;
            fun.datatahun = [];
        });
        j = 1;
    };
    fun.pilihTahun = () => {
        fun.checktahun = true;
        fun.ket = "Tahun Ajaran";
        service.dataTahun((respon) => {
            fun.datatahun = respon;
            fun.datatahun2 = [];
        });
    };
    fun.selesai = () => {
        if (j == 0) {
            fun.checktahun = false;
            fun.ket = "Tambah Pelajaran";
        } else {
            fun.checktahun = false;
            fun.checkedtambah = false;
            j = 0;
        }
    };
    fun.getTahun = (row) => {
        if (j == 0) {
            fun.tahun = "Tahun Ajaran " + row.ket + " Semester " + row.semester;
            fun.id_tahun_ajaran = row.id;
            fun.checktahun = false;
            fun.ket = "Tambah Pelajaran";
        } else {
            fun.ta=row.ket;
            fun.checktahun=false;
            fun.checkedtambah=false;
            const x = datamapel.filter((res) => {
                if (res.id_tahun_ajaran == row.id) {
                    return row;
                }
            });
            
            fun.jmlmatpel = x.length;
            fun.ta = row.ket;
            fun.semester=row.semester;
            fun.datamapel=x;
            j=0;
        }
    };
    fun.kembali = () => {
        mapel[0].value = "";
        fun.ket = "Pilih Tahun Ajaran";
        fun.checkedtambah = false;
        fun.dataMapel();
    };

    fun.save = () => {
        $("#cover-spin").show();
        var data = [mapel[0].value];
        var obj = {
            ket: data[0],
            id_tahun_ajaran: fun.id_tahun_ajaran,
        };
        service.saveMapel(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Mata Pelajaran Ini Berhasil Di Simpan",
                    icon: "success",
                });
                mapel[0].value = "";
                fun.tahun = "Pilih Tahun Ajaran";
                fun.dataMapel();
            } else {
                swal({
                    text: "Mata Pelajaran ini gagal disimpan",
                    icon: "error",
                });
            }
        });
    };

    fun.perbarui = () => {
        $("#cover-spin").show();
        const obj = {
            ket: mapel[0].value,
            id_tahun_ajaran: fun.id_tahun_ajaran,
            id: fun.id,
        };
        service.updateMapel(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Mata Pelajaran Ini Berhasil Di Perbarui",
                    icon: "success",
                });
                fun.dataMapel();
            } else {
                swal({
                    text: "Mata Pelajaran Ini Gagal Di Perbarui",
                    icon: "error",
                });
            }
        });
    };

    fun.hapus = (row) => {
        $("#cover-spin").show();
        const obj = {
            id: row.id,
        };
        service.deleteMapel(obj, (e) => {
            $("#cover-spin").hide();
            if (e > 0) {
                swal({
                    text: "Mata Pelajaran Ini Berhasil Di Hapus",
                    icon: "success",
                });
                fun.dataMapel();
            } else {
                swal({
                    text: "Mata Pelajaran Ini Gagal Di Hapus",
                    icon: "error",
                });
            }
        });
    };
});
