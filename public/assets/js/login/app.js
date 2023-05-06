/*jshint esversion: 6 */
var app = angular.module("homeApp", ["ngRoute"]);
app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var username=$("#username").val();
    var password=$("#password").val();
    fun.masuk=()=>{
        $("#cover-spin").show();
       var obj={
           username:fun.username,
           password:fun.password
       }
       service.prosesLogin(obj,(row)=>{
           $("#cover-spin").hide();
        if(row.message==1){
            swal({
                text:"Login Berhasil",
                icon:"success"
            }).then((e)=>{
                var hak_akses=row.data.hak_akses;
                if(hak_akses==1){
                    window.location.href="http://localhost:8000/admin/page/dashboard";
                }else if(hak_akses==2){
                    window.location.href="http://localhost:8000/guru/page/dashboard";
                }
                else if(hak_akses==3){
                    window.location.href="http://localhost:8000/orangtua/page/dashboard";
                }
                else if(hak_akses==4){
                    window.location.href="http://localhost:8000/kepala-sekolah/page/dashboard";
                }
            });

        }else if(row.message==2){
           swal({
               text:"Sandi masih salah",
               icon:"error"
           })
        }
        else{
            swal({
                text:"Username dan sandi masih salah",
                icon:"error"
            })
        }
       })
    }
});
