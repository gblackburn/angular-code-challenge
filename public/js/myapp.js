var app = angular.module('myApp', []);
app.controller('dealsCtrl', function($scope, $http) {
  $scope.dealsData = "Loading...";
  $http.get("https://www.cheapshark.com/api/1.0/deals").then(function (response) {
  //$http.get("http://deals.dev/deals.json").then(function (response) {
    $scope.dealsData = response.data;
    $scope.groupedDeals = { };

    function roundedScore(score) {
      var rounded = Math.round(score / 10) * 10;
      return rounded;
    };

    $scope.dealsData.forEach(function(currentValue, index, array) {
      var rounded = roundedScore(array[index].metacriticScore);
      array[index].roundedScore = rounded.toString();
      //console.log(array[index]);

      var list = $scope.groupedDeals[array[index].roundedScore];

      if (list) {
        list.push(array[index]);
      } else {
        $scope.groupedDeals[array[index].roundedScore] = [array[index]];
      }
    });
    $scope.groupedDeals.forEach(function(currentValue, index, array) {
      console.log(index);
    });
  });
});
