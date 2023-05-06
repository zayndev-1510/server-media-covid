/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});

var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var dataraport=[];
    fun.header_title=true;
    
    fun.dataSiswa=()=>{
        service.dataSiswa(row=>{
            fun.datasiswa=row;
        });
    }
    fun.dataSiswa();
    fun.getLengthData=(row)=>{
        return row.length;
    }
    fun.detailSiswa=(row)=>{
        dataraport={
            profil:row,
            raport:[]
        }
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
            dataraport.raport=datamapel;
            localStorage.setItem("dataraport",JSON.stringify(dataraport));
            $("#cover-spin").hide();
          

        })
    }
    fun.cetakData=()=>{
        window.location.href="http://localhost:8000/kepala-sekolah/page/raport/cetak";
    }

    fun.kembali=()=>{
        fun.checkedtable=false;
    }
});
