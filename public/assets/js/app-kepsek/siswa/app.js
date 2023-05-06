/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});

var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;

    service.dataTahunAkademik(row=>{
        fun.datatahun=row;
    })
    service.dataKelas(row=>{
        fun.datakelas=row;
    })

    fun.lihatData=()=>{
        $("#cover-spin").show();
        service.dataSiswa(fun.tahun_akademik,fun.kelas,row=>{
            $("#cover-spin").hide();
            fun.datasiswa=row;
        });
    }

    fun.cetakData=()=>{
        $("#cover-spin").show();
        window.location.href="http://localhost:8000/kepala-sekolah/page/siswa/laporan/"+fun.tahun_akademik+"/"+fun.kelas;
    }

    fun.detailSiswa=(row)=>{
        fun.nisn=row.nism;
        fun.nama_siswa=row.nama_siswa;
        fun.ttl=row.tempat_lahir+" "+row.tgl_lahir;
        fun.jenis_kelamin=row.jenis_kelamin;
        fun.agama=row.nama_agama;
        fun.checkedtable=true;
        fun.ket="Detail Siswa";
    }
});
