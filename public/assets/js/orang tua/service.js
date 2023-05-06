app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"
    this.saveOrangTua = function (obj, callback) {
        $http({
            url: link + "save-orangtua",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateOrangTua = function (obj, callback) {
        $http({
            url: link + "update-orangtua",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteOrangTua = function (obj, callback) {
        $http({
            url: link + "delete-orangtua",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataOrangTua= function (callback) {
        $http({
            url:  link+"data-orangtua",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.uploadFotoOrangTua=function(fd, callback) {
        $http({
            url: link + "upload-foto-orangtua",
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