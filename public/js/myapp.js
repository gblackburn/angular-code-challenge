var app = angular.module('myApp', []);
app.controller('dealsCtrl', function($scope, $http) {
  $scope.dealsData = "Loading...";
  $http.get("http://www.cheapshark.com/api/1.0/deals").then(function (response) {
    $scope.dealsData = response.data;
  });
});
