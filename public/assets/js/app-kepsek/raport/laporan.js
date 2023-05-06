/*jshint esversion: 6 */
var app = angular.module("homeApp", ["ngRoute"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
   
    const datanilai=JSON.parse(localStorage.getItem("dataraport"));
    const dataraport=datanilai.raport;
    const dataprofil=datanilai.profil;
    fun.nama_siswa=dataprofil.nama_siswa;
    fun.nama_orangtua=dataprofil.nama_ayah+"/"+dataprofil.nama_ibu;
    fun.nama_kelas=dataprofil.nama_kelas;
    fun.datanilai=dataraport;
    print();
});
