/*jshint esversion: 6 */
function preview(event, a) {
    var berkas = event.target;
    var ext = berkas.value.substring(berkas.value.lastIndexOf(".") + 1);
    if (ext != "jpg") {
        swal({
            text: "Format file tidak mendukung",
            icon: "warning",
        });
    } else {
        if (a == 0) {
            const loadimg = document.getElementById("muatkk");
            const lokasiimg = URL.createObjectURL(event.target.files[0]);
            loadimg.src = lokasiimg
        } else {
            const loadimg = document.getElementById("muatsiswa");
            const lokasiimg = URL.createObjectURL(event.target.files[0]);
            loadimg.src = lokasiimg;
        }
    }
}

var app = angular.module("homeApp", ["ngRoute"]);

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var identitas = document.getElementsByClassName("identitas");
    var ayah = document.getElementsByClassName("ayah");
    var ibu = document.getElementsByClassName("ibu");
    var periodik = document.getElementsByClassName("periodik");
    $("#elemendaftar").show();
    $("#elemennotif").hide();
    fun.daftar = () => {
        var obj = {
            nama_lengkap: identitas[0].value,
            nik: identitas[1].value,
            tempat_lahir: identitas[2].value,
            tgl_lahir: identitas[3].value,
            id_agama: identitas[4].value,
            jenis_kelamin: identitas[5].value,
            warga_negara: identitas[6].value,
            tinggal_bersama: identitas[7].value,
            anak_ke: identitas[8].value,
            usia: identitas[9].value,
            alamat: identitas[10].value,
            nama_ayah: ayah[0].value,
            nik_ayah: ayah[1].value,
            tempat_lahir_ayah: ayah[2].value,
            tgl_lahir_ayah: ayah[3].value,
            agama_ayah: ayah[4].value,
            pekerjaan_ayah: ayah[5].value,
            nama_ibu: ibu[0].value,
            nik_ibu: ibu[1].value,
            tempat_lahir_ibu: ibu[2].value,
            tgl_lahir_ibu: ibu[3].value,
            agama_ibu: ibu[4].value,
            pekerjaan_ibu: ibu[5].value,
            tinggi_badan: periodik[0].value,
            berat_badan: periodik[1].value,
            jarak_tempuh: periodik[2].value,
            jumlah_saudara: periodik[3].value
        };
        if ((identitas[0].value.length == 0) || (identitas[1].value.length == 0) || (identitas[2].value.length == 0) ||
            (identitas[3].value.length == 0) || (identitas[4].value.length == 0) || (identitas[5].value.length == 0) ||
            (identitas[6].value.length == 0) || (identitas[7].value.length == 0) || (identitas[8].value.length == 0) ||
            (identitas[9].value.length == 0) || (identitas[10].value.length == 0)) {
            swal({
                text: "Silakan lengkapi data identitasmu",
                icon: "warning"
            })
            $("html, body").animate({
                scrollTop: 50
            }, "slow");
        } else if ((ayah[0].value.length == 0) || (ayah[1].value.length == 0) || (ayah[2].value.length == 0) ||
            (ayah[3].value.length == 0) || (ayah[4].value.length == 0) || (ayah[5].value.length == 0)) {
            swal({
                text: "Silakan lengkapi data Ayah",
                icon: "warning"
            })
            $("html, body").animate({
                scrollTop: 400
            }, "slow");
        } else if ((ibu[0].value.length == 0) || (ibu[1].value.length == 0) || (ibu[2].value.length == 0) ||
            (ibu[3].value.length == 0) || (ibu[4].value.length == 0) || (ibu[5].value.length == 0)) {
            swal({
                text: "Silakan lengkapi data Ibu",
                icon: "warning",
            })
            $("html, body").animate({
                scrollTop: 600
            }, "slow");
        } else if ((periodik[0].value.length == 0) || (periodik[1].value.length == 0) ||
            (periodik[2].value.length == 0) || (periodik[3].value.length == 0)) {
            swal({
                text: "Silakan lengkapi data periodik anak",
                icon: "warning"
            })
            $("html, body").animate({
                scrollTop: 500
            }, "slow");
        } else {
            swal({
                    title: "Apakah kamu yakin?",
                    text: "Kamu bisa mengecek kembali datamu sebelum melanjutkan proses pendaftaran",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        var file = document.getElementById("fotokk");
                        var fd_berkas = new FormData();
                        var file2 = document.getElementById("fotosiswa");
                        var fd_siswa = new FormData();
                        fd_berkas.append("file", file.files[0]);
                        fd_siswa.append("file", file2.files[0]);
                        service.uploadFotoKk(fd_berkas, identitas[1].value, (res) => {
                            if (res.val > 0) {
                                obj.foto_kk = res.data;
                                service.uploadFotoSiswa(fd_siswa,identitas[1].value, (resp) => {
                                    if (resp.val > 0) {
                                        obj.foto_siswa = resp.data;
                                        service.daftarSiswa(obj, (row) => {
                                            $("#cover-spin").hide();
                                            if (row > 0) {
                                                swal({
                                                    text: "Pendaftaran berhasil",
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

                    } else {
                        $("html, body").animate({
                            scrollTop: 0
                        }, "slow");

                    }
                });
        }
    }

    fun.openBerkas = (a) => {
        if (a == 0) {
            document.getElementById("fotokk").click();
        } else {
            document.getElementById("fotosiswa").click();
        }
    }
});
