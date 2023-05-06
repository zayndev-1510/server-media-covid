app.service("service", ["$http", function ($http) {
    var apiadmin="http://localhost:8000/api/admin/";
    var app="http://localhost:8000/api/app/"
    this.getMedia = function (callback) {
        $http({
            url: app+ "data-media",
            method: "GET",
        }).then(function (e) {

            callback(e.data);
        }).catch(function (err) {

        });
    }

    
   
}]);