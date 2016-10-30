var app = angular.module('myApp', []);
// since you can't use 'orderBy' on objects, a custom filter for ordering objects is necessary
app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (parseInt(a[0][field]) > parseInt(b[0][field])) ? 1 : -1;
    });

    if (reverse) {
      filtered.reverse();
    }
    return filtered;
  };
});
app.controller('dealsCtrl', function($scope, $http) {
  $http.get("https://www.cheapshark.com/api/1.0/deals").then(function (response) {
  //$http.get("deals.json").then(function (response) { //for faster local development
    $scope.dealsData = response.data;
    $scope.groupedDeals = { };

    // instead of a filter on the score, changed it to a function for use inside the GET callback
    function roundedScore(score) {
      var rounded = Math.ceil(score / 10) * 10;
      return rounded;
    };

    for ( var index in $scope.dealsData ) {
      var array = $scope.dealsData;
      var rounded = roundedScore(array[index].metacriticScore);
      array[index].roundedScore = rounded.toString();

      var list = $scope.groupedDeals[array[index].roundedScore];

      if (list) {
        list.push(array[index]);
      } else {
        $scope.groupedDeals[array[index].roundedScore] = [array[index]];
      }
    };
  });
});
