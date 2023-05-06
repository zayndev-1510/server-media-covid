app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.savePengajar = function (obj, callback) {
        $http({
            url: link + "save-pengajar",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updatePengajar = function (obj, callback) {
        $http({
            url: link + "update-pengajar",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deletePengajar = function (obj, callback) {
        $http({
            url: link + "delete-pengajar",
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
    this.dataGuru= function (callback) {
        $http({
            url:  link+"data-guru",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.dataKelas= function (callback) {
        $http({
            url:  link+"data-ruangan",
            method: "GET"
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
    
    
}]);