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
    fun.nama_lengkap = "Zayn";
    var siswa = document.getElementsByClassName("siswa");
    fun.btnsimpan = false;
    fun.btnperbarui = false;
    fun.checkortu = false;
    fun.ketortu = "Atur Orang Tua";
    var id_ortu=null;
    var ortu = [];
    var datafoto = [];

    fun.openFile = (a) => {
        if (a == 1) {
            document.getElementById("file1").click();
        } else {
            document.getElementById("file2").click();
        }
    };

    fun.dataSiswa = () => {
        $("#cover-spin").show();
        service.dataSiswa((row) => {
            var data=[];
            data=row;
            
            for(var i=0;i<data.length;i++){
                if(data[i].nama_kelas==null){
                    data[i].caption_kelas="Belum diatur";
                    data[i].nama_kelas='Belum diatur'; 
                }
                if(data[i].nism==null){
                    data[i].nism="Tidak ada"
                }
            }
            const jumlahnokelas=data.filter(row=>{
                if(row.id_kelas==0){
                    return row;
                }
            })
            fun.jumlahnokelas=jumlahnokelas.length;
            fun.datasiswa =data;
            $("#cover-spin").hide();
        });
    };
    fun.dataSiswa();
    fun.clear = () => {
        for (var i = 0; i < siswa.length; i++) {
            siswa[i].value = "";
        }
        const loadimgkk=document.getElementById("muatsampul1");
        const loadimgsiswa=document.getElementById("muatsampul2");
        loadimgkk.src="http://localhost:8000/assets/images/card/card-img1.jpg";
        loadimgsiswa.src="http://localhost:8000/assets/images/card/card-img1.jpg";
    };

    fun.tambahData = () => {
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.ket = "Tambah Siswa";
        fun.btnsimpan = true;
        fun.clear();
    };

    fun.detail = (row) => {
        fun.checkedtambah = true;
        fun.checkedtable = true;
        fun.ket = "Perbarui Siswa";
        fun.btnperbarui = true;
        fun.id = row.id_siswa;
        const data = [
            row.nism,
            row.nik,
            row.nama_siswa,
            row.tempat_lahir,
            row.tgl_lahir,
            row.jenis_kelamin,
            row.id_agama,
            row.id_kelas,
            row.id_tahun_ajaran,
        ];
        for (var i in data) {
            siswa[i].value = data[i];
        }
        datafoto = [row.foto_kk, row.foto_siswa];
        id_ortu=row.id_ortu;
        fun.ketortu = " Bapak " + row.nama_ayah + " (" + row.nik_ayah + ") ";
        const loadimgkk = document.getElementById("muatsampul1");
        const loadimgsiswa = document.getElementById("muatsampul2");
        loadimgkk.src = "http://localhost:8000/siswa/"+row.nik+"/kk/" + row.foto_kk;
        loadimgsiswa.src = "http://localhost:8000/siswa/"+row.nik+"/akun/" + row.foto_siswa;
    };

    fun.aturGuru = () => {
        fun.checkortu = true;
        fun.ket = "Atur Orang Tua";
        aksi = true;
        service.dataOrtu((row) => {
            fun.dataortu = row;
        });
    };

    fun.save = () => {
        $("#cover-spin").hide();
        var data = [
            siswa[0].value,
            siswa[1].value,
            siswa[2].value,
            siswa[3].value,
            siswa[4].value,
            siswa[5].value,
            siswa[6].value,
            siswa[7].value,
            siswa[8].value,
        ];
        const obj = {
            nism: data[0],
            nik: data[1],
            nama_siswa: data[2],
            tempat_lahir: data[3],
            tgl_lahir: data[4],
            jenis_kelamin: data[5],
            id_agama: data[6],
            id_kelas: data[7],
            id_tahun_ajaran: data[8],
            id_orang_tua: ortu.id,
            foto_kk: "",
            foto_siswa: "",
        };
        var file = document.getElementById("file1");
        var fd_berkas = new FormData();
        var file2 = document.getElementById("file2");
        var fd_siswa = new FormData();
        fd_berkas.append("file", file.files[0]);
        fd_siswa.append("file", file2.files[0]);
        service.uploadFotoKk(fd_berkas,data[1], (res) => {
            if (res.val > 0) {
                obj.foto_kk = res.data;
                service.uploadFotoSiswa(fd_siswa,data[1], (resp) => {
                    if (resp.val > 0) {
                        obj.foto_siswa = resp.data;
                        service.saveSiswa(obj, (row) => {
                            $("#cover-spin").hide();
                            if (row > 0) {
                                swal({
                                    text: "Simpan data siswa berhasil",
                                    icon: "success",
                                });
                                fun.clear();
                            } else {
                                swal({
                                    text: "Simpan data siswa gagal",
                                    icon: "error",
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    fun.perbarui = () => {
        $("#cover-spin").show();
        var data = [
            siswa[0].value,
            siswa[1].value,
            siswa[2].value,
            siswa[3].value,
            siswa[4].value,
            siswa[5].value,
            siswa[6].value,
            siswa[7].value,
            siswa[8].value,
        ];
        var obj = {
            nism: data[0],
            nik: data[1],
            nama_siswa: data[2],
            tempat_lahir: data[3],
            tgl_lahir: data[4],
            jenis_kelamin: data[5],
            id_agama: data[6],
            id_kelas: data[7],
            id_tahun_ajaran: data[8],
            id_orang_tua:id_ortu,
            foto_kk: "",
            foto_siswa: "",
            id:fun.id
        };
        var file = document.getElementById("file1");
        var fd_berkas = new FormData();
        var file2 = document.getElementById("file2");
        var fd_siswa = new FormData();
        fd_berkas.append("file", file.files[0]);
        fd_siswa.append("file", file2.files[0]);
        if (file.files.length == 0 && file2.files.length == 0) {
            obj.foto_kk = datafoto[0];
            obj.foto_siswa = datafoto[1];
            service.updateSiswa(obj,(row)=>{
                $("#cover-spin").hide();
                if(row>0){
                    swal({
                        text:"Perbarui data berhasil",
                        icon:"success"
                    })
                }else{
                    swal({
                        text:"Perbarui data gagal",
                        icon:"warning"
                    })
                }
            })
        } else if (file.files.length == 0) {
            service.uploadFotoSiswa(fd_siswa,data[1], (res) => {
                if (res.val > 0) {
                    obj.foto_siswa = res.data;
                    obj.foto_kk=datafoto[0];
                    service.updateSiswa(obj,(row)=>{
                        $("#cover-spin").hide();
                        if(row>0){
                            swal({
                                text:"Perbarui data berhasil",
                                icon:"success"
                            })
                        }else{
                            swal({
                                text:"Perbarui data gagal",
                                icon:"warning"
                            })
                        }
                    })
                }
            });
        }
        else if (file2.files.length == 0) {
            service.uploadFotoKk(fd_berkas,data[1], (res) => {
                if (res.val > 0) {
                    obj.foto_kk = res.data;
                    obj.foto_siswa=datafoto[1];
                    service.updateSiswa(obj,(row)=>{
                        $("#cover-spin").hide();
                        if(row>0){
                            swal({
                                text:"Perbarui data berhasil",
                                icon:"success"
                            })
                        }else{
                            swal({
                                text:"Perbarui data gagal",
                                icon:"warning"
                            })
                        }
                    })
                }
            });
        }
        else{
            service.uploadFotoKk(fd_berkas,data[1], (res) => {
                if (res.val > 0) {
                    obj.foto_kk = res.data;
                    service.uploadFotoSiswa(fd_siswa,data[1], (resp) => {
                        if (resp.val > 0) {
                            obj.foto_siswa = resp.data;
                            service.updateSiswa(obj,(row)=>{
                                $("#cover-spin").hide();
                                if(row>0){
                                    swal({
                                        text:"Perbarui data berhasil",
                                        icon:"success"
                                    })
                                }else{
                                    swal({
                                        text:"Perbarui data gagal",
                                        icon:"warning"
                                    })
                                }
                            })
                        }
                    });
                }
            });
        }       
    };
    
    fun.kembali = () => {
        fun.checkedtambah = false;
        fun.checkedtable = false;
        fun.btnsimpan = false;
        fun.btnperbarui = false;
        fun.filefoto = false;
        fun.dataSiswa();
        fun.clear();
    };

    fun.selesai = () => {
        fun.checkortu = false;
    };

    fun.pilihOrtu = (row) => {
        ortu = row;
        fun.ketortu = "Bapak " + row.nama_ayah + "(" + row.nik_ayah + ")";
        fun.checkortu = false;
    };

    fun.hapus = (row) => {
        $("#cover-spin").show();
        const obj = {
            id: row.id_siswa,
            nik:row.nik
        };
        service.deleteSiswa(obj, (row) => {
            $("#cover-spin").hide();
            if (row > 0) {
                swal({
                    text: "Data Siswa ini telah dihapus",
                    icon: "success",
                }).then(function (e) {
                    fun.dataGuru();
                });
            } else {
                swal({
                    text: "Data Siswa ini gagal dihapus",
                    icon: "error",
                }).then(function (e) {});
            }
        });
    };
});
