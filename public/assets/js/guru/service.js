app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"
    this.saveGuru = function (obj, callback) {
        $http({
            url: link + "save-guru",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateGuru = function (obj, callback) {
        $http({
            url: link + "update-guru",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteGuru = function (obj, callback) {
        $http({
            url: link + "delete-guru",
            method: "POST",
            data: obj
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

    this.uploadFotoGuru=function(fd, callback) {
        $http({
            url: link + "upload-foto-guru",
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