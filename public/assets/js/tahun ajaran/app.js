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
    fun.hari="Atur Hari";
    fun.id=0;
    var data_input=document.getElementsByClassName("tahun_ajaran");
    fun.dataTahun=()=>{
        $("#cover-spin").show();
        service.dataTahun(row=>{
           fun.datatahun=row;
           $("#cover-spin").hide();
        })
    }
   
    fun.dataTahun();

    fun.tambahData=()=>{
        fun.ket="Tambah Tahun Akademik";
        fun.checkedtambah=true;
        fun.btnsimpan=true;
        fun.btnperbarui=false;
    }

    fun.clear=()=>{
        for(var i=0;i<data_input.length;i++){
            data_input[i].value="";
        }
    }
    fun.detail=(row)=>{
        fun.checkedtambah=true;
        fun.btnsimpan=false;
        fun.btnperbarui=true;
        fun.id=row.id;
        const data=[row.ket,row.semester,row.tgl,row.status];
        for(var i in data){
            data_input[i].value=data[i];
        }
     }
   
    fun.kembali=()=>{
        fun.checkedtambah=false;
        fun.btnperbarui=false;
        fun.btnsimpan=false;
        fun.dataTahun();
        fun.clear();
    }

    fun.save=()=>{
        var obj={
            ket:data_input[0].value,
            semester:data_input[1].value,
            tgl:data_input[2].value,
            status:data_input[3].value,
        };
        $("#cover-spin").show();
        service.saveTahun(obj,(row)=>{
            $("#cover-spin").hide();
            if(row>0){
                swal({
                    text:"Data Ini Berhasil Di Simpan",
                    icon:"success"
                });
                fun.clear();
            }
            else{
                swal({
                    text:"Data ini gagal disimpan",
                    icon:"error"
                })
            }
        })
    }

    fun.perbarui=()=>{
        var obj={
            ket:data_input[0].value,
            semester:data_input[1].value,
            tgl:data_input[2].value,
            status:data_input[3].value,
            id:fun.id
        };
        $("#cover-spin").show();
        service.updateTahun(obj,(row)=>{
            $("#cover-spin").hide();
            if(row>0){
                swal({
                    text:"Data Ini Berhasil Di Perbarui",
                    icon:"success"
                });
            }
            else{
                swal({
                    text:"Data Ini Gagal Di Perbarui",
                    icon:"error"
                })
            }
        })
    }
    fun.hapus=(row)=>{
        const obj={
            id:row.id
        }
        $("#cover-spin").show();
        service.deleteTahun(obj,(e)=>{
            $("#cover-spin").hide();
            if(e>0){
                swal({
                    text:"Data Ini Berhasil Di Hapus",
                    icon:"success"
                });
                fun.dataTahun();
            }else{
                swal({
                    text:"Data Ini Gagal Di Hapus",
                    icon:"error"
                });
            }
        });
    }
});
