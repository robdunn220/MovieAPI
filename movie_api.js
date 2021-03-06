var app = angular.module('movie-app', ['ui.router']);

app.factory('Movie', function factoryFunction($http) {
  var service = {};
  service.nowPlaying = function () {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/now_playing',
      params: { api_key: 'f4bd08c29a02c112cf978236f15f2c92'}
    });
  };

  service.details = function (movieId) {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/' + movieId,
      params: { api_key: 'f4bd08c29a02c112cf978236f15f2c92'}
    });
  };

  service.search = function(query) {
     return $http({
       url: 'http://api.themoviedb.org/3/search/movie' ,
       params: { api_key: 'f4bd08c29a02c112cf978236f15f2c92',
                query: query }
     });
   };
  return service;
});

app.controller('MovieController', function($scope, Movie) {
    Movie.nowPlaying().success(function(results) {
      console.log(results);
      $scope.results = results.results;
    });
});

app.controller('SearchController', function($scope, $state, $stateParams, Movie) {
  $scope.search = $stateParams.results;
     Movie.search($scope.search).success(function(search) {
       $scope.searchResult = search.results;
       console.log($scope.searchResult);
    });
});

app.controller('IndividualPageController', function($scope, $stateParams, Movie) {
  $scope.movieID = $stateParams.movie_id;
  console.log($scope.movieID);
    Movie.details($scope.movieID).success(function(details) {
      $scope.detail = details;
      console.log($scope.detail);
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl: 'index.html',
      controller: 'MovieController'
    })
    .state({
      name: 'search',
      url: '/search',
      templateUrl: 'search.html'
    })
    .state({
      name: 'searchResults',
      url: '/search/{results}',
      templateUrl: 'searchResults.html',
      controller: 'SearchController'
    })
    .state({
      name: 'indPage',
      url: '/{movie_id}',
      templateUrl: 'indPage.html',
      controller: 'IndividualPageController'
    });
});
