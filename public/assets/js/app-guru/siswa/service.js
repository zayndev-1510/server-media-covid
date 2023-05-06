app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"
    this.saveSiswa = function (obj, callback) {
        $http({
            url: link + "save-siswa",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateSiswa = function (obj, callback) {
        $http({
            url: link + "update-siswa",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.deleteSiswa = function (obj, callback) {
        $http({
            url: link + "delete-siswa",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataSiswa= function (callback) {
        $http({
            url:  link+"data-siswa",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataTahunAkademik= function (callback) {
        $http({
            url:  link+"data-tahun",
            method: "GET"
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

    this.uploadFotoKk=function(fd,id, callback) {
        $http({
            url: link + "upload-foto-kk/"+id,
            method: "POST",
            data:fd,
            headers: {
                'Content-Type': undefined
            },
        }).then(function successCallback(e) {
            callback(e.data);
        }).catch(function (err) {
            callback(err);
        });
    }
    this.uploadFotoSiswa=function(fd, nism,callback) {
        $http({
            url: link + "upload-foto-siswa/"+nism,
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