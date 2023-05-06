/*jshint esversion: 6 */
$(document).ready( function () {
    $('#dataTable').DataTable();
} );
var app = angular.module("homeApp", ['ngRoute','datatables']);


app.controller("homeController", function ($scope, service) {

    var fun = $scope;
    var service = service ;
    var ruangan=document.getElementsByClassName("ruangan")
    fun.checkedtambah=false;

    fun.dataRuangan=()=>{
        service.dataRuangan(row=>{
            fun.dataruangan=row;
        });
    }
    fun.dataRuangan();

    fun.clear=()=>{
        for(var i=0;i<ruangan.length;i++){
            ruangan[i].value="";
        }
    }

    fun.dataRuangan();

    fun.tambahData=()=>{
        fun.checkedtambah=true;
        fun.ket="Tambah Ruangan";
        fun.btnsimpan=true;
        fun.btnperbarui=false;
    }
    
    fun.kembali=()=>{
        fun.checkedtambah=false;
        fun.btnsimpan=false;
        fun.btnperbarui=false;
        fun.clear();
        fun.dataRuangan();
    }

    fun.save=()=>{
        const obj={
            ket:ruangan[0].value,kategori:ruangan[1].value
        }
        $("#cover-spin").show();
        service.saveRuangan(obj,(row)=>{
            $("#cover-spin").hide();
            if(row>0){
                swal({
                    text:"Data ini berhasil disimpan",
                    icon:"success"
                });
                fun.clear();
            }else{
                swal({
                    text:"Data ini gagal disimpan",
                    icon:"error"
                })
            }
        });
    }

    fun.detail=(row)=>{
        fun.id=row.id;
        ruangan[0].value=row.ket;
        ruangan[1].value=row.kategori;
        fun.btnperbarui=true;
        fun.btnsimpan=false;
        fun.checkedtambah=true;
    }

    fun.perbarui=()=>{
        const obj={
            ket:ruangan[0].value,kategori:ruangan[1].value,id:fun.id
        }
        $("#cover-spin").show();
        service.updateRuangan(obj,(row)=>{
            $("#cover-spin").hide();
            if(row>0){
                swal({
                    text:"Data ini berhasil diperbarui",
                    icon:"success"
                })
            }else{
                swal({
                    text:"Data ini gagal diperbarui",
                    icon:"error"
                })
            }
        });
    }

    fun.hapus=(row)=>{
        const obj={
            id:row.id
        }
        $("#cover-spin").show();
        service.deleteRuangan(obj,(e)=>{
            $("#cover-spin").hide();
            if(e>0){
                swal({
                    text:"Data in berhasil dihapus",
                    icon:"success"
                })
                fun.dataRuangan();
            }else{
                swal({
                    text:"Data ini gagal disimpan",
                    icon:"error"
                })
            }
        })
    }

    
   
});
