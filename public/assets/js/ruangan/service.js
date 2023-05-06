app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.saveRuangan = function (obj, callback) {
        $http({
            url: link + "save-ruangan",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateRuangan = function (obj, callback) {
        $http({
            url: link + "update-ruangan",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteRuangan = function (obj, callback) {
        $http({
            url: link + "delete-ruangan",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.dataRuangan= function (callback) {
        $http({
            url:  link+"data-ruangan",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }    
}]);