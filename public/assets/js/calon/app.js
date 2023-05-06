/*jshint esversion: 6 */
$(document).ready(function () {
    $("#dataTable").DataTable();
});
var app = angular.module("homeApp", ["ngRoute", "datatables"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var agama = [];
    var kode_daftar = 0;
    var datasiswa = [];

    fun.calonSiswa = () => {
        service.calonSiswa(e => {
            fun.datacalon = e.data;
            agama = e.agama;
        });
    }

    fun.calonSiswa();

    fun.detail = (row) => {
        fun.checkeddetail = true;
        kode_daftar = row.kode_daftar;
        const data = row;
        datasiswa = row;
        const nama_hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const nama_bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus",
            "September", "Oktober", "November", "Desember"
        ]
        const agama_anak = agama.filter(row => {
            return row.id == data.id_agama;
        })
        const agama_ayah = agama.filter(row => {
            return row.id = data.agama_ayah;
        })
        const agama_ibu = agama.filter(row => {
            return row.id == data.agama_ibu;
        })
        const loadkk=document.getElementById("muatkk");
        const loadsiswa=document.getElementById("muatsiswa");

        loadkk.src="http://localhost:8000/siswa/"+row.nik+"/kk/"+row.foto_kk;
        loadsiswa.src="http://localhost:8000/siswa/"+row.nik+"/akun/"+row.foto_siswa;
        const temp_tgl = new Date((data.tgl_daftar));
        fun.tgl_daftar = nama_hari[temp_tgl.getDay()] + " " + temp_tgl.getDate() + " " +
            nama_bulan[temp_tgl.getMonth()] + " " + temp_tgl.getFullYear();
        fun.status = data.status;
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
        fun.agama_ayah = agama_ayah[0].ket;

        fun.nama_ibu = data.nama_ibu;
        fun.pekerjaan_ibu = data.pekerjaan_ibu;
        fun.tempat_lahir_ibu = data.tempat_lahir_ibu;
        fun.tgl_lahir_ibu = data.tgl_lahir_ibu;
        fun.nik_ibu = data.nik_ibu;
        fun.agama_ibu = agama_ibu[0].ket;
    }
    fun.kembali = () => {
        fun.checkeddetail = false;
    }
    fun.konfirmasi = () => {


        const obj = {
            status: fun.cek,
            kode_daftar: kode_daftar
        };
        service.konfirmasiCalon(obj, (e) => {
            if (e > 0) {
                if (datasiswa.status == 1) {
                    swal({
                        text: "berhasil memperbarui data",
                        icon: "success"
                    });
                }

            } else {
                swal({
                    text: "Ada kesalahan",
                    icon: "error"
                })
            }
        })
    }
});
