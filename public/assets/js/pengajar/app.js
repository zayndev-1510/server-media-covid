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
    fun.guru="Pilih Guru";
    fun.mapel="Pilih Mata Pelajaran";
    fun.kelas="Pilih Kelas";
    fun.id_tahun_ajaran=0;
    fun.id=0;
    var id_guru=0;
    var id_kelas=0;
    var id_mapel=0;
    var mapel=document.getElementsByClassName("mapel");
    fun.dataPengajar=()=>{
        $("#cover-spin").show();
        service.dataPengajar(row=>{
           fun.datapengajar=row;
           $("#cover-spin").hide();
        })
      
    }
    fun.dataPengajar();

    fun.tambahData=()=>{
        fun.ket="Tambah Pengajar";
        fun.checkedtambah=true;
        fun.btnsimpan=true;
        fun.btnperbarui=false;
    }

    fun.pilihGuru=()=>{
        fun.ket="Atur Guru";
        fun.checktahun=true;
        fun.checkguru=true;
        service.dataGuru(row=>{
            fun.dataguru=row;
        })
    }

    fun.getGuru=(row)=>{
        fun.guru=row.nama;
        id_guru=row.id;
        fun.selesai();
    }

    fun.pilihKelas=()=>{
        fun.ket="Atur Kelas";
        fun.checktahun=true;
        fun.checkkelas=true;
        service.dataKelas(row=>{
            fun.datakelas=row;
        })
    }

    fun.getKelas=(row)=>{
        fun.kelas=row.ket;
        id_kelas=row.id;
        fun.selesai();
    }

    fun.pilihMapel=()=>{
        fun.ket="Atur Mata Pelajaran";
        fun.checktahun=true;
        fun.checkmapel=true;
        service.dataMapel(row=>{
            fun.datamapel=row;
        })
    }

    fun.getMapel=(row)=>{
        id_mapel=row.id;
        fun.mapel=row.ket;
        fun.selesai();
    }

    fun.detail=(row)=>{
        id_guru=row.id_guru;
        id_mapel=row.id_mapel;
        id_kelas=row.id_kelas;
        fun.guru=row.nama_guru;
        fun.kelas=row.nama_kelas;
        fun.mapel=row.nama_mapel;
        fun.checkedtambah=true;
        fun.btnsimpan=false;
        fun.btnperbarui=true; 
        fun.id=row.id;
    }

    fun.selesai=()=>{
        fun.checktahun=false;
        fun.checkguru=false;
        fun.checkmapel=false;
        fun.checkkelas=false;
        fun.ket="Tambah Pengajar";
    }

    fun.kembali=()=>{
        fun.guru="Pilih Guru";
        fun.kelas="Pilih Kelas";
        fun.mapel="Pilih Mata Pelajaran";
        fun.ket="Pilih Tahun Ajaran";
        fun.checkedtambah=false;
        fun.dataPengajar();
    }

    fun.save=()=>{
     
        var obj={
            id_guru:id_guru,
            id_kelas:id_kelas,
            id_mapel:id_mapel
        };
        $("#cover-spin").show();
        service.savePengajar(obj,(row)=>{
            $("#cover-spin").hide();
            if(row>0){
                swal({
                    text:"Pengajar Ini Berhasil Di Simpan",
                    icon:"success"
                });
                fun.guru="Pilih Guru";
                fun.mapel="Pilih Mata Pelajaran";
                fun.kelas="Pilih Kelas";
               
            }
            else{
                swal({
                    text:"Pengajar ini gagal disimpan",
                    icon:"error"
                })
            }
        })
    }

    fun.perbarui=()=>{
        $("#cover-spin").show();
        const obj={
            id:fun.id,id_kelas:id_kelas,
            id_mapel:id_mapel,id_guru:id_guru
        }
        service.updatePengajar(obj,(row)=>{
            $("#cover-spin").hide();
            if(row>0){
                swal({
                    text:"Pengajar Ini Berhasil Di Perbarui",
                    icon:"success"
                });
            }
            else{
                swal({
                    text:"Pengajar Ini Gagal Di Perbarui",
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
        service.deletePengajar(obj,(e)=>{
            $("#cover-spin").hide();
            if(e>0){
                swal({
                    text:"Pengajar Ini Berhasil Di Hapus",
                    icon:"success"
                });
                fun.dataPengajar();
            }else{
                swal({
                    text:"Pengajar Ini Gagal Di Hapus",
                    icon:"error"
                });
            }
        });
    }
});
