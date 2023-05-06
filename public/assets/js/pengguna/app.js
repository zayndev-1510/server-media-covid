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

    fun.username="Atur Username";
    fun.sandi="Atur Kata Sandi";
    fun.hak_akses="Atur Hak Akses";
    fun.nama_lengkap="Atur Nama Pengguna";
    fun.checkusername=false;
    fun.checksandi=false;
    fun.checknama=false;
    fun.checktahun=false;
    fun.hak_akses="Pilih Hak Akses";
    var id_pengguna=0;
    fun.dataPengguna=()=>{
        $("#cover-spin").show();
        service.dataPengguna(row=>{
            fun.datapengguna=row;
            $("#cover-spin").hide();
        });
    }

    fun.pilihUsername=()=>{
        fun.ket="Atur Username";
        fun.checkusername=true;
        fun.checktahun=true;
    }
    
    fun.pilihSandi=()=>{
        fun.ket="Atur Sandi"
        fun.checksandi=true;
        fun.checktahun=true;
    }
    
    fun.pilihPengguna=()=>{
        fun.ket="Pilih Hak Akses";
        fun.checknama=true;
        fun.checktahun=true;
    }

    fun.selesai=()=>{
        if(fun.username==""){
            fun.username="Atur Username";
        }else if(fun.sandi==""){
            fun.sandi="Atur Sandi";
        }
        
        fun.ket="Tambah Pengguna";
        fun.checktahun=false;
        fun.checkusername=false;
        fun.checksandi=false;
        fun.checknama=false;
    }
    fun.clearText=(a)=>{
        if((a==0) && (fun.username=="Atur Username")){
            fun.username="";
        }else if((a==1) && (fun.sandi=="Atur Sandi")){
            fun.sandi="";
        }
    }
    
    fun.kembali=()=>{
        fun.checktahun=false;
    }

    fun.dataPengguna();

    fun.clear=()=>{
        for(var i=0;i<ruangan.length;i++){
            ruangan[i].value="";
        }
    }

    fun.tambahData=()=>{
        fun.checkedtambah=true;
        fun.ket="Tambah Pengguna";
        fun.btnsimpan=true;
        fun.btnperbarui=false;
    }

    fun.getHakAkses=()=>{
        var hak_akses=$("#hak_akses").val();
        if(hak_akses==1){
            fun.checkguru=true;
            fun.checkorangtua=false;
            service.dataGuru(row=>{
                fun.dataguru=row;
            })
        }else if(hak_akses==2){
            fun.checkorangtua=true;
            fun.checkguru=false;
            service.dataOrtu(row=>{
                fun.dataortu=row;
            })
        }else{
            fun.checkorangtua=false;
            fun.checkguru=false;
        }
    }

    fun.getOrtu=(row)=>{
        id_pengguna=row.id;
        fun.nama_lengkap=row.nama_ayah;
        fun.selesai();
    }
    fun.getGuru=(row)=>{
        id_pengguna=row.id;
        fun.nama_lengkap=row.nama;
        fun.selesai();
    }
    
    fun.kembali=()=>{
        fun.checkedtambah=false;
        fun.btnsimpan=false;
        fun.btnperbarui=false;
        fun.clear();
        fun.dataPengguna();
    }

    fun.save=()=>{
        $("#cover-spin").show();
        const obj={
            hak_akses:fun.hak_akses,
            id_pengguna:id_pengguna,
            username:fun.username,
            sandi:fun.sandi,
            nama_lengkap:fun.nama_lengkap
        }
        service.savePengguna(obj,(row)=>{
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
        fun.username=row.username;
        fun.sandi=row.sandiasli;
        fun.hak_akses=row.hak_akses;
        fun.nama_lengkap=row.nama_lengkap;
        id_pengguna=row.id_pengguna;
        fun.btnperbarui=true;
        fun.btnsimpan=false;
        fun.checkedtambah=true;
    }

    fun.perbarui=()=>{
        $("#cover-spin").show();
        const obj={
            hak_akses:fun.hak_akses,
            id_pengguna:id_pengguna,
            username:fun.username,
            sandi:fun.sandi,
            nama_lengkap:fun.nama_lengkap,
            id:fun.id
        };
        service.updatePengguna(obj,(row)=>{
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
        $("#cover-spin").show();
        const obj={
            id:row.id
        }
        service.deletePengguna(obj,(e)=>{
            $("#cover-spin").hide();
            if(e>0){
                swal({
                    text:"Data in berhasil dihapus",
                    icon:"success"
                })
                fun.dataPengguna();
            }else{
                swal({
                    text:"Data ini gagal disimpan",
                    icon:"error"
                })
            }
        })
    }

    
   
});
