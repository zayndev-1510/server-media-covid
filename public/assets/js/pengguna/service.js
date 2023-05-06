app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.savePengguna = function (obj, callback) {
        $http({
            url: link + "save-pengguna",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updatePengguna = function (obj, callback) {
        $http({
            url: link + "update-pengguna",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deletePengguna = function (obj, callback) {
        $http({
            url: link + "delete-pengguna",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.dataPengguna= function (callback) {
        $http({
            url:  link+"data-pengguna",
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

    this.dataOrtu= function (callback) {
        $http({
            url:  link+"data-orangtua",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }  
}]);