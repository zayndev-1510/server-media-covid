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
    fun.getLengthData=(row)=>{
        return row.length;
    }
    fun.detailSiswa=(row)=>{
        fun.nisn=row.nism;
        fun.nama_siswa=row.nama_siswa;
        fun.jenis_kelamin=row.jenis_kelamin;
        fun.checkedtable=true;
        fun.ket="Raport Siswa";
        const x=row.nama_kelas.split(" ");
        fun.kelas=x[1];
        $("#cover-spin").show();

        service.dataRaport(row.id_siswa,(res)=>{
            const datanilai=res.datanilai;
            const datamapel=res.datamapel;
            for(var i in datamapel){
                datamapel[i].data=[];
                for(var j in datanilai){
                    if(datamapel[i].id==datanilai[j].id_mapel){
                        datamapel[i].data.push(datanilai[j]);
                    }
                }
            }
            fun.datanilai=datamapel;
            $("#cover-spin").hide();

        })
    }

    fun.kembali=()=>{
        fun.checkedtable=false;
    }
});
