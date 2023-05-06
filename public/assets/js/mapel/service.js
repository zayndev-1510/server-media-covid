app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.saveMapel = function (obj, callback) {
        $http({
            url: link + "save-mapel",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateMapel = function (obj, callback) {
        $http({
            url: link + "update-mapel",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteMapel = function (obj, callback) {
        $http({
            url: link + "delete-mapel",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataMapel= function (callback) {
        $http({
            url:  link+"data-mapel",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataTahun= function (callback) {
        $http({
            url:  link+"data-tahun",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
}]);