app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"
    this.saveNilai = function (obj, callback) {
        $http({
            url: link + "data-insert-nilai",
            method: "POST",
            data: obj
        }).then(function (e) {
            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.updateNilai = function (obj, callback) {
        $http({
            url: link + "data-update-nilai",
            method: "POST",
            data: obj
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.deleteNilai = function (id,callback) {
        $http({
            url: link + "data-delete-nilai/"+id,
            method: "GET"
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

    this.dataMatpel= function (id,callback) {
        $http({
            url:  link+"data-mapel-by-akademik/"+id,
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
    this.dataNilaiById= function (id,id_siswa,callback) {
        $http({
            url:  link+"data-nilai-by-pengajar/"+id+"/"+id_siswa,
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