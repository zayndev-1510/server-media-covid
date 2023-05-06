/*jshint esversion: 6 */
$(document).ready( function () {
    $('#dataTable').DataTable();
} );
var app = angular.module("homeApp", ['ngRoute','datatables']);


app.controller("homeController", function ($scope, service) {

    var fun = $scope;
    var service = service ;
    var id_pengguna = $("#id_pengguna_temp").val();
    fun.id_guru=id_pengguna;
    const waktu=new Date();
    const day=waktu.getDay();
    service.dataJadwal(day,row=>{
        fun.datajadwal=row.jadwal;
    })
   
});
