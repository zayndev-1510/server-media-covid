app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/app/"
    var api="http://localhost:8000/api/admin/"
    var apigrafik="http://localhost:8000/api/grafik/"

    this.grafikSiswa = function (callback) {
        $http({
            url: apigrafik + "siswa",
            method: "GET",
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };

    this.prosesLogin = function (obj, callback) {
        $http({
            url: link + "login",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };
    
    this.savePengguna = function (obj, callback) {
        $http({
            url: api + "save-pengguna",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };

    this.updatePengguna = function (obj, callback) {
        $http({
            url: api + "update-pengguna",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };

    this.dataKepsek = function (callback) {
        $http({
            url: link + "kepala-sekolah",
            method: "GET",
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    };
    
}]);