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
    var orangtua=document.getElementsByClassName("orangtua");
    var dataguru = [];
    fun.btnsimpan = false;
    fun.btnperbarui = false;
    fun.filefoto=false;
    fun.openFile = () => {
        document.getElementById("file").click();
    };

    fun.dataOrangTua=()=>{
        $("#cover-spin").show();
        service.dataOrangTua(row=>{
           fun.dataorangtua=row;
           $("#cover-spin").hide();
        });
    }

    fun.dataOrangTua();

    fun.clear = () => {
        for (var i = 0; i < orangtua.length; i++) {
            orangtua[i].value = "";
        }
    };
   
    fun.tambahData = () => {
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.ket = "Tambah Orang Tua";
        fun.btnsimpan = true;
    };

    fun.detail = (row) => {
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.ket = "Perbarui Orang Tua";
        fun.btnperbarui = true;
        fun.id = row.id;
        var data = [
            row.nik_ayah,row.nama_ayah,row.tempat_lahir_ayah,row.tgl_lahir_ayah,row.id_agama_ayah,row.pekerjaan_ayah,
            row.nik_ibu,row.nama_ibu,row.tempat_lahir_ibu,row.tgl_lahir_ibu,row.id_agama_ibu,row.pekerjaan_ibu,row.alamat
            
        ];
        for (var i in data) {
           orangtua[i].value=data[i];
        }
    };

    fun.save = () => {
        $("#cover-spin").show();
        var val = [
            orangtua[0].value,orangtua[1].value,orangtua[2].value,orangtua[3].value,orangtua[4].value,orangtua[5].value,
            orangtua[6].value,orangtua[7].value,orangtua[7].value,orangtua[9].value,orangtua[10].value,orangtua[11].value,
            
        ];
        const obj = {
            nik_ayah:orangtua[0].value,nama_ayah:orangtua[1].value,tempat_lahir_ayah:orangtua[2].value,
            tgl_lahir_ayah:orangtua[3].value,pekerjaan_ayah:orangtua[5].value,id_agama_ayah:orangtua[4].value,
            nik_ibu:orangtua[6].value,nama_ibu:orangtua[7].value,tempat_lahir_ibu:orangtua[8].value,
            tgl_lahir_ibu:orangtua[9].value,pekerjaan_ibu:orangtua[11].value,id_agama_ibu:orangtua[10].value,
            alamat:orangtua[12].value,id:fun.id
        };
        service.saveOrangTua(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Data ini telah disimpan",
                    icon: "success",
                }).then(function (e) {
                    fun.clear();
                });
            } else {
                swal({
                    text: "Data ini gagal disimpan",
                    icon: "error",
                }).then(function (e) {});
            }
        });
    };

    fun.perbarui = () => {
        $("#cover-spin").show();
        var val = [
            orangtua[0].value,orangtua[1].value,orangtua[2].value,orangtua[3].value,orangtua[4].value,orangtua[5].value,
            orangtua[6].value,orangtua[7].value,orangtua[7].value,orangtua[9].value,orangtua[10].value,orangtua[11].value,
        ];
        const obj = {
            nik_ayah:orangtua[0].value,
            nama_ayah:orangtua[1].value,
            tempat_lahir_ayah:orangtua[2].value,
            tgl_lahir_ayah:orangtua[3].value,
            pekerjaan_ayah:orangtua[5].value,
            id_agama_ayah:orangtua[4].value,
            nik_ibu:orangtua[6].value,
            nama_ibu:orangtua[7].value,
            tempat_lahir_ibu:orangtua[8].value,
            tgl_lahir_ibu:orangtua[9].value,
            pekerjaan_ibu:orangtua[11].value,
            id_agama_ibu:orangtua[10].value,
            alamat:orangtua[12].value,
            id:fun.id  
        };
        service.updateOrangTua(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Data ini telah diperbarui",
                    icon: "success",
                }).then(function (e) {
                });
            } else {
                swal({
                    text: "Data ini gagal diperbarui",
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
        fun.dataOrangTua();
        fun.clear();
    };
   
    fun.hapus = (row) => {
        const obj = {
            id: row.id,
        };
        $("#cover-spin").show();
        service.deleteOrangTua(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Data ini telah dihapus",
                    icon: "success",
                }).then(function (e) {
                    fun.dataOrangTua();
                });
            } else {
                swal({
                    text: "Data Tua gagal dihapus",
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
