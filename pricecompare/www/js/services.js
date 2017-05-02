angular.module('pricecompare.services',[])

  .service('SearchService', function ($scope, $http, searchUrl) {
    $scope.doSearch = function () {
      $http.get(searchUrl).then(function (response) {
            var data = response.data;
            return data;
      })
    }
  })
