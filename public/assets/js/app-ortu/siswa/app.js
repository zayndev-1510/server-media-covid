/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});

var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var datasiswa=[];
    fun.header_title=true;
    var id_pengguna=$("#id_pengguna_temp").val();
    fun.dataSiswa=()=>{
        $("#cover-spin").show();
        service.dataSiswa(id_pengguna,row=>{
            datasiswa=row;
            fun.datasiswa=datasiswa;
            $("#cover-spin").hide();
        })
        
    }
    fun.dataSiswa();

    fun.detailSiswa=(row)=>{
        fun.nisn=row.nism;
        fun.nama_siswa=row.nama_siswa;
        fun.ttl=row.tempat_lahir+" "+row.tgl_lahir;
        fun.jenis_kelamin=row.jenis_kelamin;
        fun.agama=row.nama_agama;
        fun.checkedtable=true;
        fun.ket="Detail Siswa";
    }

    fun.kembali=()=>{
        fun.checkedtable=false;
    }
});
