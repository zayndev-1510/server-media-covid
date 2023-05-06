/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});

function preview(event) {
    var berkas = event.target;
    var ext = berkas.value.substring(berkas.value.lastIndexOf(".") + 1);
    if (ext != "jpg") {
        swal({
            text: "Format file tidak mendukung",
            icon: "warning",
        });
    } else {
        
        var loadimg = document.getElementById("muatsampul");
        loadimg.src = URL.createObjectURL(event.target.files[0]);
    }
}

var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    fun.nama_lengkap = "Zayn";
    var guru = document.getElementsByClassName("guru");
    var dataguru = [];
    fun.btnsimpan = false;
    fun.btnperbarui = false;
    fun.filefoto=false;
    fun.openFile = () => {
        document.getElementById("file").click();
    };

    fun.dataGuru = () => {
        $("#cover-spin").show();
        dataguru = [];
        service.dataGuru((row) => {
            for (var i in row) {
                var x = row[i];
                if (x.ttl != null) {
                    var str = x.ttl.split(",");
                    x.tempat_lahir = str[0];
                    x.tanggal_lahir = str[1];
                } else {
                    x.tempat_lahir = "-";
                    x.tanggal_lahir = "-";
                }

                dataguru.push(x);
            }
            fun.dataguru = dataguru;
            $("#cover-spin").hide();
        });
    };
    fun.clear = () => {
        for (var i = 0; i < guru.length; i++) {
            guru[i].value = "";
        }
    };
    fun.dataGuru();
    fun.tambahData = () => {
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.ket = "Tambah Guru";
        fun.btnsimpan = true;
    };

    fun.detail = (row) => {
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.ket = "Perbarui Guru";
        fun.btnperbarui = true;
        fun.id = row.id;
        var data = [
            row.nip,
            row.nama,
            row.tempat_lahir,
            row.tanggal_lahir,
            row.jenis_kelamin,
            row.id_agama,
            row.id_jabatan,
            row.pendidikan,
            row.nomor_hp,
            row.email,
            row.alamat,
        ];
        for (var i in data) {
            guru[i].value = data[i];
        }
    };
    fun.save = () => {
        var val = [
            guru[0].value,
            guru[1].value,
            guru[2].value,
            guru[3].value,
            guru[4].value,
            guru[5].value,
            guru[6].value,
            guru[7].value,
            guru[8].value,
            guru[9].value,
            guru[10].value,
        ];
        const str = val[2] + "," + val[3];
        const obj = {
            nip: val[0],
            nama: val[1],
            ttl: str,
            jenis_kelamin: val[4],
            id_agama: val[5],
            id_jabatan: val[6],
            pendidikan: val[7],
            nomor_hp: val[8],
            email: val[9],
            alamat: val[10],
        };
        $("#cover-spin").show();
        service.saveGuru(obj, (row) => {
            $("#cover-spin").hide();
            if (row == 1) {
                swal({
                    text: "Data Guru ini telah disimpan",
                    icon: "success",
                }).then(function (e) {
                    fun.clear();
                });
            } else if(row==2) {
                swal({
                    text: "Data Guru ini gagal disimpan",
                    icon: "error",
                }).then(function (e) {});
            }
            else{
                swal({
                    text: "Data Guru ini gagal disimpan",
                    icon: "error",
                }).then(function (e) {});
            }
        });
    };
    fun.perbarui = () => {
        $("#cover-spin").show();
        var val = [
            guru[0].value,
            guru[1].value,
            guru[2].value,
            guru[3].value,
            guru[4].value,
            guru[5].value,
            guru[6].value,
            guru[7].value,
            guru[8].value,
            guru[9].value,
            guru[10].value,
        ];
        const str = val[2] + "," + val[3];
        const obj = {
            nip: val[0],
            nama: val[1],
            ttl: str,
            jenis_kelamin: val[4],
            id_agama: val[5],
            id_jabatan: val[6],
            pendidikan: val[7],
            nomor_hp: val[8],
            email: val[9],
            alamat: val[10],
            foto: "",
            id: fun.id,
        };
        service.updateGuru(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Data Guru ini telah diperbarui",
                    icon: "success",
                }).then(function (e) {
                    fun.clear();
                });
            } else {
                swal({
                    text: "Data Guru ini gagal diperbarui",
                    icon: "error",
                }).then(function (e) {});
            }
        });
    };
    fun.kembali = () => {
        fun.checkedtambah = false;
        fun.checkedtable = false;
        fun.btnsimpan = false;
        fun.btnperbarui = false;
        fun.filefoto=false;
        fun.dataGuru();
    };
    fun.aturFoto=(row)=>{
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.filefoto=true;
        fun.id=row.id;
        fun.ket="Atur Foto"
    }
   
    fun.hapus = (row) => {
        $("#cover-spin").show();
        const obj = {
            id: row.id,
        };
        service.deleteGuru(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Data Guru ini telah dihapus",
                    icon: "success",
                }).then(function (e) {
                    fun.dataGuru();
                });
            } else {
                swal({
                    text: "Data Guru ini gagal dihapus",
                    icon: "error",
                }).then(function (e) {});
            }
        });
    };

    fun.editFoto=()=>{
        var file=document.getElementById("file");
        var fd_berkas = new FormData();
        fd_berkas.append("file", file.files[0]);
        $("#cover-spin").show();
        service.uploadFotoGuru(fd_berkas, (res) => {
            const obj={
                id:fun.id,
                foto:res.data
            };
            service.updateGuru(obj,(respon)=>{
                $("#cover-spin").hide();
                if(respon>0){
                    swal({
                        text:"Foto Berhasil diperbarui",
                        icon:"success"
                    })
                }
            })
        });
    }
});
