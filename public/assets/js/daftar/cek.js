/*jshint esversion: 6 */
var app = angular.module("homeApp", ["ngRoute"]);
app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    $(".information-hasil").hide();
    var datasiswa=[];
    $("#c2").hide();
    fun.cekHasil = () => {
        const obj = {
            kode_daftar: $(".search").val()
        }
        service.cekHasil(obj, (e) => {
            
            $(".information-hasil").show(2000);
            const data = e.data;
            const agama = e.agama;
            datasiswa=data;
            const agama_anak = agama.filter(row => {
                return row.id == data.id_agama;
            })
            const agama_ayah = agama.filter(row => {
                return row.id = data.agama_ayah;
            })
            const agama_ibu = agama.filter(row => {
                return row.id == data.agama_ibu;
            })
            fun.akun=data.akun;
            const nama_hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            const nama_bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
                "September", "Oktober", "November", "Desember"
            ]

            const loadkk=document.getElementById("muatkk");
            const loadsiswa=document.getElementById("muatsiswa");
    
            loadkk.src="http://localhost:8000/siswa/"+data.nik+"/kk/"+data.foto_kk;
            loadsiswa.src="http://localhost:8000/siswa/"+data.nik+"/akun/"+data.foto_siswa;

            const temp_tgl = new Date((data.tgl_daftar));
            fun.tgl_daftar=nama_hari[temp_tgl.getDay()]+" "+temp_tgl.getDate()+" "+
            nama_bulan[temp_tgl.getMonth()]+" "+temp_tgl.getFullYear();
            fun.status=data.status;
            fun.nama_lengkap = data.nama_lengkap;
            fun.nik = data.nik;
            fun.tempat_lahir = data.tempat_lahir;
            fun.tgl_lahir = data.tgl_lahir;
            fun.agama_anak = agama_anak[0].ket;
            fun.warga_negara = data.warga_negara;
            fun.tinggal_bersama = data.tinggal_bersama;
            fun.anak_ke = data.anak_ke;
            fun.usia = data.usia;
            fun.alamat = data.alamat;
            fun.jenis_kelamin = data.jenis_kelamin;
            fun.tinggi_badan = data.tinggi_badan;
            fun.berat_badan = data.berat_badan;
            fun.jarak_tempuh = data.jarak_tempuh;
            fun.jumlah_saudara = data.jumlah_saudara;

            fun.nama_ayah = data.nama_ayah;
            fun.pekerjaan_ayah = data.pekerjaan_ayah;
            fun.tempat_lahir_ayah = data.tempat_lahir_ayah;
            fun.tgl_lahir_ayah = data.tgl_lahir_ayah;
            fun.nik_ayah = data.nik_ayah;
            fun.agama_ayah = agama_ibu[0].ket;

            fun.nama_ibu = data.nama_ibu;
            fun.pekerjaan_ibu = data.pekerjaan_ibu;
            fun.tempat_lahir_ibu = data.tempat_lahir_ibu;
            fun.tgl_lahir_ibu = data.tgl_lahir_ibu;
            fun.nik_ibu = data.nik_ibu;
            fun.agama_ibu = agama_ibu[0].ket;
        })
    }

    fun.lanjut=()=>{
        $("#c1").hide();
        $("#c2").show();
    }

    fun.aktifkan=()=>{
        const obj={
            akun:{
                kode_daftar:datasiswa.kode_daftar,
                akun:1,
                username:$("#username").val(),
                kata_sandi:$("#kata_sandi").val(),
                status:1,
                nama_lengkap:datasiswa.nama_ayah
            },
            siswa:{
                nik:datasiswa.nik,nama_siswa:datasiswa.nama_lengkap,jenis_kelamin:datasiswa.jenis_kelamin,
                foto_kk:datasiswa.foto_kk,foto_siswa:datasiswa.foto_siswa,id_tahun_ajaran:datasiswa.id_tahun_ajaran,
                tempat_lahir:datasiswa.tempat_lahir,tgl_lahir:datasiswa.tgl_lahir,id_agama:datasiswa.id_agama,
            },
            orangtua:{
                nama_ayah:datasiswa.nama_ayah,nik_ayah:datasiswa.nik_ayah,pekerjaan_ayah:datasiswa.pekerjaan_ayah,
                tempat_lahir_ayah:datasiswa.tempat_lahir_ayah,tgl_lahir_ayah:datasiswa.tgl_lahir_ayah,
                id_agama_ayah:datasiswa.agama_ayah,
                nama_ibu:datasiswa.nama_ibu,nik_ibu:datasiswa.nik_ibu,pekerjaan_ibu:datasiswa.pekerjaan_ibu,
                tempat_lahir_ibu:datasiswa.tempat_lahir_ibu,tgl_lahir_ibu:datasiswa.tgl_lahir_ibu,
                id_agama_ibu:datasiswa.agama_ibu,alamat:datasiswa.alamat
            }
        }
        service.moveSiswa(obj,(e)=>{
            if(e>0){
                swal({
                    text:"Terima kasih telah mengaktifkan akun !",
                    icon:"success"
                }).then(function(){
                    location.href="http://localhost:8000";
                })
            }
        })
    }
});
