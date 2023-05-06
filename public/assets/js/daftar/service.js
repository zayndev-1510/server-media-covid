app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/app/"
    var api="http://localhost:8000/api/admin/"
    var apigrafik="http://localhost:8000/api/grafik/"

    

    this.daftarSiswa = function (obj, callback) {
        $http({
            url: link + "daftar",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };
    this.cekHasil = function (obj, callback) {
        $http({
            url: link + "cekhasil",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };

    this.moveSiswa = function (obj,callback) {
        $http({
            url: api + "move-calon-to-siswa",
            method: "POST",
            data:obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    
    this.uploadFotoKk=function(fd,id, callback) {
        $http({
            url: api + "upload-foto-kk/"+id,
            method: "POST",
            data:fd,
            headers: {
                'Content-Type': undefined
            },
        }).then(function successCallback(e) {
            callback(e.data);
        }).catch(function (err) {
            callback(err);
        });
    }
    this.uploadFotoSiswa=function(fd, nism,callback) {
        $http({
            url: api + "upload-foto-siswa/"+nism,
            method: "POST",
            data: fd,
            headers: {
                'Content-Type': undefined
            },
        }).then(function successCallback(e) {
            callback(e.data);
        }).catch(function (err) {
            callback(err);
        });
    }
    
    
}]);