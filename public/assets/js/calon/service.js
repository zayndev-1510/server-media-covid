app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.calonSiswa = function (callback) {
        $http({
            url: link + "data-calon-siswa",
            method: "GET",
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }



    this.konfirmasiCalon = function (obj,callback) {
        $http({
            url: link + "konfirmasi-calon-siswa",
            method: "POST",
            data:obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
  
}]);