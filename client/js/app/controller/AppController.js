app.controller('AppController', ['$scope', 'generator', function ($scope, generator) {
    $scope.getRand = function () {
        generator.rand().success(function (randStr) {
            $scope.randomString = randStr;
        });
    };
    
    $scope.getRand();
}]);