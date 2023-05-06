app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"
    
    this.dataJadwal= function (day,callback) {
        $http({
            url:  link+"jadwal-by-hari/"+day,
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }   
}]);