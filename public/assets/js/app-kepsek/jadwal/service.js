app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.saveJadwal = function (obj, callback) {
        $http({
            url: link + "save-jadwal",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateJadwal = function (obj, callback) {
        $http({
            url: link + "update-jadwal",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteJadwal = function (obj, callback) {
        $http({
            url: link + "delete-jadwal",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataPengajar= function (callback) {
        $http({
            url:  link+"data-pengajar",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.dataJadwal= function (callback) {
        $http({
            url:  link+"data-jadwal",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
}]);