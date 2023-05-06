app.service("service", ["$http", function ($http) {
    var link="http://localhost:8000/api/admin/"

    this.dataSekolah= function (callback) {
        $http({
            url:  link+"data-sekolah",
            method: "GET"
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }
}]);