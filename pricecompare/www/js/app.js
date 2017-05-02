// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('pricecompare', ['ionic', 'ngCordova', 'pricecompare.controllers', 'pricecompare.services'])

  .run(function ($ionicPlatform, $state) {
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($state.current.name == 'app.home') {
        navigator.app.exitApp()
      } else {
        navigator.app.backHistory()
      }
    }, 100)

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      // $cordovaPlugin.someFunction().then(success, error)

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault()
      }
    })
  })

  // Product search URLs
  .constant('caCellUrl', 'https://my-search-app.cfapps.io/cacell/')
  .constant('gameUrl', 'https://my-search-app.cfapps.io/game/')
  .constant('dionwiredUrl', 'https://my-search-app.cfapps.io/dionwired/')
  // Product category search URLs
  .constant('gameGamesUrl', 'https://my-search-app.cfapps.io/game/games/')
  .constant('dionwiredGamesUrl', 'https://my-search-app.cfapps.io/dionwired/games/')
  .constant('gameComputersUrl', 'https://my-search-app.cfapps.io/game/computers/')
  .constant('dionwiredComputersUrl', 'https://my-search-app.cfapps.io/dionwired/computers/')
  .constant('gameCellponesUrl', 'https://my-search-app.cfapps.io/game/cellphones/')
  .constant('dionwiredCellphonesUrl', 'https://my-search-app.cfapps.io/dionwired/cellphones/')
  .constant('gameAudioUrl', 'https://my-search-app.cfapps.io/game/audio/')
  .constant('dionwiredAudioUrl', 'https://my-search-app.cfapps.io/dionwired/audio/')
  .constant('dionwiredTabletsUrl', 'https://my-search-app.cfapps.io/dionwired/tablets/')
  .constant('gameCameraUrl', 'https://my-search-app.cfapps.io/game/cameras/')

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $ionicConfigProvider.tabs.position('top')

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'views/browse.html'
          }
        }
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
          }
        }
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('app.compare', {
        url: '/compare',
        views: {
          'menuContent': {
            templateUrl: 'views/compare.html',
            controller: 'CompareCtrl'
          }
        }
      })
      .state('app.category', {
        url: '/category',
        views: {
          'menuContent': {
            templateUrl: 'views/category.html',
            controller: 'CategoryCtrl'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home')

    $httpProvider.interceptors.push(function ($q) {
      return {
        responseError: function (rejection) {
          if (rejection.status <= 0) {
            return
          }
          return $q.reject(rejection)
          LoaderService.hide()
        }
      }
    })

  // $httpProvider.interceptors.push(['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
  //     return function (promise) {
  //       return promise.then(function (response) {
  //         return response
  //       }, function (response) {
  //         console.log(response) // response status
  //         return $q.reject(response)
  //       })
  //     }
  //   }])
  })
