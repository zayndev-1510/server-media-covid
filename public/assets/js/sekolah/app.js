/*jshint esversion: 6 */
$(document).ready( function () {
    $('#dataTable').DataTable();
} );
var app = angular.module("homeApp", ['ngRoute','datatables']);


app.controller("homeController", function ($scope, service) {

    var fun = $scope;
    var service = service ;
  
    service.dataSekolah(row=>{
        const x=row[0];
        fun.nspn=x.nspn;
        fun.alamat=x.alamat;
        fun.kode_pos=x.kode_pos;
        fun.kecamatan=x.kecamatan;
        fun.kota=x.kota;
        fun.provinsi=x.provinsi;
    })
   
});
