app.service('generator', ['$http', function ($http) {
    
    return {
        rand: function () {
            return $http.get('/rand');  
        }
    };

}]);