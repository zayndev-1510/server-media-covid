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
    this.dataSiswa= function (id,callback) {
        $http({
            url:  link+"siswa-by-ortu/"+id,
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataRaport= function (id,callback) {
        $http({
            url:  link+"data-nilai-by-siswa/"+id,
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

   
    
   
}]);