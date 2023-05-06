app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.saveTahun = function (obj, callback) {
        $http({
            url: link + "save-tahun",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateTahun = function (obj, callback) {
        $http({
            url: link + "update-tahun",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteTahun = function (obj, callback) {
        $http({
            url: link + "delete-tahun",
            method: "POST",
            data: obj
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