/*jshint esversion: 6 */


var app = angular.module("homeApp", ["ngRoute"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;

    var detail = JSON.parse(localStorage.getItem("detail"));

    fun.judul = detail.judul;
    fun.deskripsi = detail.deskripsi;
    fun.video = "http://localhost:8000/video/" + detail.video;
    fun.foto = fun.thumbnail;
    var player = videojs(document.querySelector('.video-js'));
    player.src({
        src: fun.video,
        type: 'video/mp4' /*video type*/,
      
    });

    player.play();
});
