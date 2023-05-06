/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});

function preview(event, a) {
    var berkas = event.target;
    var ext = berkas.value.substring(berkas.value.lastIndexOf(".") + 1);
    if (ext != "jpg") {
        swal({
            text: "Format file tidak mendukung",
            icon: "warning",
        });
    } else {
        if (a == 1) {
            const loadimg = document.getElementById("muatsampul1");
            loadimg.src = URL.createObjectURL(event.target.files[0]);
        } else {
            const loadimg = document.getElementById("muatsampul2");
            loadimg.src = URL.createObjectURL(event.target.files[0]);
        }
    }
}

var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    fun.datasiswa = [];
    var id_pengguna = $("#id_pengguna_temp").val();
    var pengajar_temp=$("#pengajar_temp");
    var tahun_temp=$("#tahun_temp");
    var id_kelas=0;
    fun.showaksi=false;
    var id_pengajar=0;
    var datanilai=[];
    var datamatpel=[];
    var id_siswa=0;
    var datatahun = [
        {
            id: 0,
            ket: "Pilih Tahun Akademik",
            semester: "",
            tgl: "",
            status: "",
        },
    ];
    var datapengajar = [
        {
            id: 0,
            ket: "Pilih Mata Pelajaran",
        },
    ];
    fun.ta="-";
    fun.kelas="-";
    fun.matpel="-";
    fun.jmlsiswa="-";
    fun.checkbtn=false;
    fun.ketform="Atur Nilai";
    $("#cover-spin").show();
    service.dataTahunAkademik((row) => {
        for (var i in row) {
            var data = row[i];
            datatahun.push(row[i]);
        }
        fun.datatahun = datatahun;
    });
    service.dataPengajar((row) => {
        for (var i in row) {
            let data = row[i];
            if (data.id_guru == id_pengguna) {
                datapengajar.push(row[i]);
                id_pengajar=row[0].id;
            }
        }
        $("#cover-spin").hide();
        fun.datapengajar = datapengajar;
    });
    
    fun.viewData=()=>{
        $("#cover-spin").show();
        datatahun.filter(row=>{
            if(row.id==tahun_temp.val()){
               fun.ta=row.ket;
            }
        })
        datapengajar.filter(row=>{
            if(row.id==pengajar_temp.val()){
                fun.kelas=row.nama_kelas;
                fun.matpel=row.nama_mapel;
                id_kelas=row.id_kelas;
            }
        })
        service.dataSiswa(row=>{
            var data=row;
           const datasiswa=data.filter(e=>{
                if((e.id_tahun_ajaran==tahun_temp.val()) && (e.id_kelas==id_kelas)){
                    return e;
                }
            })
            fun.datasiswa=datasiswa;
            $("#cover-spin").hide();
            fun.jmlsiswa=datasiswa.length;
        })
    }

    fun.aturNilai=(row)=>{
       
        fun.nama_lengkap=row.nama_siswa;
        fun.nama_orangtua=row.nama_ayah+"/"+row.nama_ibu;
        fun.showaksi=true;
        fun.ket="Tambah Nilai";
        id_siswa=row.id_siswa;
        service.dataNilaiById(id_pengajar,row.id_siswa,(e)=>{
            datanilai=e;
            fun.datanilai=datanilai;
        });
    }

    fun.editData=(row)=>{
        fun.indikator=row.indikator;
        fun.ulasan=row.ulasan;
        fun.nilai=row.nilai;
        fun.checkbtn=true;
        fun.id=row.id;
        fun.ketform="Perbarui Nilai";
    }

    fun.saveData=(row)=>{
        const obj={
            id_pengajar:id_pengajar,ulasan:fun.ulasan,
            nilai:fun.nilai,indikator:fun.indikator,id_siswa:id_siswa
        }
        $("#cover-spin").show();
        service.saveNilai(obj,res=>{
            $("#cover-spin").hide();
            if(res>0){
                swal({
                    text:"Berhasil ditambahkan",
                    icon:"success"
                }).then((e)=>{
                    service.dataNilaiById(id_pengajar,id_siswa,(e)=>{
                        datanilai=e;
                        fun.indikator="";
                        fun.ulasan="";
                        fun.nilai=0;
                        fun.datanilai=datanilai;
                    });
                })
            }
        });
    }

    fun.perbaruiData=()=>{
        const obj={
            id_pengajar:id_pengajar,ulasan:fun.ulasan,id:fun.id,
            nilai:fun.nilai,indikator:fun.indikator,id_siswa:id_siswa
        }
        $("#cover-spin").show();
        service.updateNilai(obj,res=>{
            $("#cover-spin").hide();
            if(res>0){
                swal({
                    text:"Berhasil diperbarui",
                    icon:"success"
                }).then((e)=>{
                    service.dataNilaiById(id_pengajar,id_siswa,(e)=>{
                        datanilai=e;
                        fun.indikator="";
                        fun.ulasan="";
                        fun.nilai=0;
                        fun.datanilai=datanilai;
                        fun.ketform="Atur Nilai";
                    });
                })
            }
        });
    }

    fun.hapusData=(row)=>{
        $("#cover-spin").show();
        service.deleteNilai(row.id,res=>{
            $("#cover-spin").hide();
            if(res>0){
                swal({
                    text:"Berhasil dihapus",
                    icon:"success"
                }).then((e)=>{
                    service.dataNilaiById(id_pengajar,id_siswa,(e)=>{
                        datanilai=e;
                        fun.indikator="";
                        fun.ulasan="";
                        fun.nilai=0;
                        fun.datanilai=datanilai;
                    });
                })
            }
        });
    }

    fun.tambahData=()=>{
        fun.ketform="Tambah Data";
        fun.indikator="";
        fun.nilai=0;
        fun.ulasan=0;
        fun.checkbtn=false;
    }
});
