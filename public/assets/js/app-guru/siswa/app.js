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
            }
        }
        fun.datapengajar = datapengajar;
    });
    
    fun.viewData=()=>{
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
            fun.jmlsiswa=datasiswa.length;
        })
    }
});
