/*jshint esversion: 6 */
$(document).ready( function () {
    $('#dataTable').DataTable();
} );
var app = angular.module("homeApp", ['ngRoute','datatables']);


app.controller("homeController", function ($scope, service) {

    var fun = $scope;
    var service = service ;
    fun.checkedtambah=false;
    fun.checktahun=false;
    fun.pengajar="Pilih Pengajar";
    fun.hari="Atur Hari";
    fun.id_tahun_ajaran=0;
    fun.id=0;
    var id_pengajar=0;
    var hari="";
    fun.jam_masuk="Atur Jam Masuk";
    fun.jam_keluar="Atur Jam Keluar";
    fun.datahari=[
        {nama:"Senin"},
        {nama:"Selasa"},
        {nama:"Rabu"},
        {nama:"Kamis"},
        {nama:"Jumat"},
        {nama:"Sabtu"}
    ];
    fun.dataJadwal=()=>{
        service.dataJadwal(row=>{
          var datatemp=row; 
          var datahari=fun.datahari
          for(var i in datahari){
              var a=datahari[i];
              datahari[i].data=[];
              datahari[i].x=0;
              var y=1;
              for(var j in datatemp){
                  var b=datatemp[j];
                  if(a.nama==b.hari){
                      datahari[i].data.push(b);
                      datahari[i].x=y;
                      y++;
                  }
              }
          }
            fun.datajadwal=datahari;
        })
    }
    fun.dataJadwal();
   
});
