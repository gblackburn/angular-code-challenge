var app = angular.module('myApp', []);
app.filter('roundedScore', function() {
  return function(score) {
    var rounded = Math.round(score / 10) * 10;
    return rounded;
  }
});
app.controller('dealsCtrl', function($scope, $http) {
  $scope.dealsData = "Loading...";
  $http.get("http://www.cheapshark.com/api/1.0/deals").then(function (response) {
    $scope.dealsData = response.data;
  });
});
