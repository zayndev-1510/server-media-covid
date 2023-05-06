app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"
    this.dataSiswa= function (id,callback) {
        $http({
            url:  link+"siswa-by-ortu/"+id,
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

    this.dataKelas= function (callback) {
        $http({
            url:  link+"data-ruangan",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    this.dataSiswa= function (a,b,callback) {
        $http({
            url:  link+"siswa-by-query/"+a+"/"+b,
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