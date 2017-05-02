angular.module('pricecompare.controllers', [])
  .factory('LoaderService', function ($rootScope, $ionicLoading) {

    // Trigger the loading indicator
    return {
      show: function () { // code from the ionic framework doc

        // Show the loading overlay and text
        $rootScope.loading = $ionicLoading.show({

          // The text to display in the loading indicator
          // content: 'Loading',

          // // The animation to use
          animation: 'fade-in',

          template: '<p>Please Wait...</p><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

          // Will a dark overlay or backdrop cover the entire view
          // showBackdrop: true,

          // The maximum width of the loading indicator
          // Text will be wrapped if longer than maxWidth
          maxWidth: 200,

          // The delay in showing the indicator
          showDelay: 500
        })
      },
      hide: function () {
        $rootScope.loading = $ionicLoading.hide()
      }
    }
  })

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    // $scope.$on('$ionicView.enter', function(e) {
    // })

    // Form data for the login modal
    $scope.loginData = {}

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal
    })

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide()
    }

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show()
    }

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData)

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin()
      }, 1000)
    }
  })

  .controller('HomeCtrl', function ($scope, $ionicPopup, $http, $state, $cordovaBarcodeScanner, $cordovaInAppBrowser) {
    $scope.scanner = function () {
      $scope.scanning = true
      $scope.favourites = false
      $scope.category = false

      $cordovaBarcodeScanner.scan().then(function (barcodeData) {
        // Success! Barcode data is here
        if (barcodeData.length > 0) {
          var alertPopup = $ionicPopup.alert({
            title: 'Barcode',
            template: barcodeData
          })
        }else {
          var alertPopup = $ionicPopup.alert({
            title: 'No Code',
            template: 'You did not scan any product.'
          })
        }}, function (error) {
        // An error occurred
      })

      // NOTE: encoding not functioning yet
      $cordovaBarcodeScanner
        .encode(BarcodeScanner.Encode.TEXT_TYPE, 'http://www.nytimes.com')
        .then(function (success) {
          // Success!
          console.log(success)
        }, function (error) {
          // An error occurred
        })
    }

    $scope.browser = function () {
      $scope.category = true
      $scope.scanning = false
      $scope.favourites = false
    }

    $scope.category = true
    $scope.showFavourites = function () {
      $scope.favourites = true
      $scope.scanning = false
      $scope.category = false

      $scope.favours = JSON.parse(window.localStorage.getItem('favourites'))
      if ($scope.favours.length == 0 || $scope.favours == null) {
        var alertPopup = $ionicPopup.alert({
          title: 'Empty',
          template: 'You no favourites, go search products.'
        })
        alertPopup.then(function (res) {
          $state.go('app.search')
        })
      }
    }

    $scope.selectedFavour = function (item) {
      var favours = $scope.favours
      var confirmPopup = $ionicPopup.confirm({
        title: 'Remove',
        template: 'Item: ' + item.title + '<br><br> Do you want to remove this item from list?'
      })

      confirmPopup.then(function (res) {
        if (res) {
          for (var i in favours) {
            if (favours[i].title == item.title) {
              $scope.favours.splice(i, 1)
              window.localStorage.favourites = JSON.stringify($scope.favours)
            }
          }
        }else {
          console.log('Cancelled')
        }
      })
    }

    $scope.closeApplication = function () {
      navigator.app.exitApp()
    }
    $scope.searchProduct = function () {
      console.log($scope.searchText)

      if ($scope.searchText == undefined) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'You have an empty search field.'
        })
      } else {
        window.localStorage.userSearch = JSON.stringify($scope.searchText)
        $state.go('app.search')
        $scope.searchText = ' '
      }
    }
    // Categories
    $scope.selCell = function () {
      window.localStorage.category = JSON.stringify('cellphone')
      $state.go('app.category')
    }
    $scope.selTablet = function () {
      window.localStorage.category = JSON.stringify('tablet')
      $state.go('app.category')
    }
    $scope.selComp = function () {
      window.localStorage.category = JSON.stringify('computer')
      $state.go('app.category')
    }
    $scope.selCamera = function () {
      window.localStorage.category = JSON.stringify('camera')
      $state.go('app.category')
    }
    $scope.selCat = function () {
      var customTemplate = "";
      $ionicPopup.show({
        fromTemplateUrl: customTemplate,
        title: 'Catelogue',
        subTitle: 'WE CURRENTLY DO NOT HAVE THIS FEATURE',
        buttons: [{
          text: 'Cancel',
          // type: 'button-positive',
          onTap: function (e) {}
        } // , {
        // text: 'Visit',
        // // type: 'button-positive',
        // onTap: function (e) {}
        // }
        ]
      })
    }
    $scope.selGame = function () {
      window.localStorage.category = JSON.stringify('game')
      $state.go('app.category')
    }
    $scope.selMusic = function () {
      window.localStorage.category = JSON.stringify('music')
      $state.go('app.category')
    }
    // Search insurance via Hippo
    $scope.selInsurance = function () {
      var customTemplate = '<input type="radio" name="group1">' +
        '<div class="item-content"> Choice 1 </div>'

      $ionicPopup.show({
        fromTemplateUrl: customTemplate,
        title: 'Insurance',
        subTitle: 'WE CURRENTLY DO NOT HAVE THIS FEATURE',
        buttons: [{
          text: 'Cancel',
          // type: 'button-positive',
          onTap: function (e) {}
        } // , {
        // text: 'Visit',
        // // type: 'button-positive',
        // onTap: function (e) {}
        // }
        ]
      })
    }
    // Search flights via FlightStart
    $scope.selFlight = function () {
      var options = {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'no'
      }

      $cordovaInAppBrowser.open('http://www.flightstart.co.za/bookings.html', '_self', options)
        .then(function (event) {
          // success
        })
        .catch(function (event) {
          // error
        })
    }
  })

  .controller('SearchCtrl', function ($scope, $ionicPopup, $http, caCellUrl, gameUrl, $state, dionwiredUrl, LoaderService) {
    var searchWord = JSON.parse(window.localStorage.getItem('userSearch'))

    var conn_error = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Connection Error',
        template: '<p style="text-align: center">Could not complete search<br>Connection is lost<br>Please try again later.</p>'
      })
      alertPopup.then(function (res) {
        window.localStorage.removeItem('userSearch')
        $state.go('app.search')
      })
    }

    if (searchWord != undefined) {
      $scope.searchText = searchWord
      var searchResults = []
      LoaderService.show()
      $http.get(dionwiredUrl + $scope.searchText).then(function (response) {
        if (response) {
          var data = response.data
          for (var i in data) {
            var results = {
              title: data[i].title,
              url: data[i].url,
              price: data[i].price,
              image: data[i].image,
              shop: 'Dionwired'
            }

            searchResults.push(results)
          }
          LoaderService.hide()
        }
      })

      $http.get(gameUrl + $scope.searchText).then(function (response) {
        if (response) {
          var data = response.data
          for (var i in data) {
            var results = {
              brand: data[i].brand,
              title: data[i].title,
              url: data[i].url,
              price: data[i].price,
              image: data[i].image,
              shop: 'Game'
            }
            searchResults.push(results)
          }
        }
      })

      $http.get(caCellUrl + $scope.searchText).then(function (response) {
        if (response) {
          var data = response.data

          for (var i in data) {
            var results = {
              title: data[i].title,
              url: data[i].url,
              price: data[i].price,
              image: data[i].image,
              shop: 'CaCell'
            }
            searchResults.push(results)
          }
        } else {
          conn_error()
        }
      })

      $scope.searchResults = searchResults
    }

    $scope.searchProduct = function () {
      LoaderService.show()
      console.log('Searching for...' + $scope.searchText)
      if ($scope.searchText == undefined) {
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: 'You have an empty search field.'
        })
      } else {
        var searchResults = []
        $http.get(dionwiredUrl + $scope.searchText).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwired'
              }
              searchResults.push(results)
            }
            LoaderService.hide()
          }
        })
        $http.get(gameUrl + $scope.searchText).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                brand: data[i].brand,
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              searchResults.push(results)
            }
          }
        })
        $http.get(caCellUrl + $scope.searchText).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'CaCell'
              }
              searchResults.push(results)
            }

            $state.go('app.search')
          } else {
            LoaderService.hide()
            conn_error()
          }
        })
        $scope.searchResults = searchResults
      }
    }

    $scope.selectedItem = function (item) {
      window.localStorage.compareItem = JSON.stringify(item)
      $state.go('app.compare')
      localStorage.removeItem('userSearch')
    }
  })

  .controller('CompareCtrl', function ($scope, $state ,$cordovaSocialSharing, $http, caCellUrl, gameUrl, dionwiredUrl, $ionicPopup, $cordovaInAppBrowser) {
    $scope.reviews = 0
    var selected = JSON.parse(window.localStorage.getItem('compareItem'))
    $scope.title = selected.title
    $scope.image = selected.image
    $scope.price = selected.price
    $scope.shop = selected.shop
    $scope.url = selected.url
    var compare = $scope.title

    $scope.addToFavorite = function () {
      var favor = []
      var save = {
        title: $scope.title,
        image: $scope.image,
        price: $scope.price,
        shop: $scope.shop,
        url: $scope.url
      }
      console.log('added to cart')
      var favouritesData = JSON.parse(window.localStorage.getItem('favourites'))

      if (favouritesData == undefined || favouritesData.length == 0) {
        favor.push(save)
        window.localStorage.favourites = JSON.stringify(favor)
        var alertPopup = $ionicPopup.alert({
          title: 'Successful',
          template: 'The item has been successfully added to favourites'
        })
      }else {
        favouritesData.push(save)
        window.localStorage.favourites = JSON.stringify(favouritesData)
        var alertPopup = $ionicPopup.alert({
          title: 'Successful',
          template: 'The item has been successfully added to favourites'
        })
      }
    }

    // buttons (offers, details, reviews, share, sort) functions
    if ($scope.shop == 'Dionwired') {
      var rm = $scope.title.substring(0, $scope.title.indexOf(' '))
      compare = compare.slice(rm.length + 3)
    }

    var myarray = compare.split(' ')
    var newCompare = ' '
    for (var i = 0; i < 4; i++) {
      newCompare += myarray[i] + ' '
    }
    compare = newCompare
    console.log('Searching other shops: ' + compare)
    $scope.s_offer = true
    if ($scope.s_offer) {
      var searchResults = []
      if ($scope.shop !== 'CaCell') {
        console.log($scope.shop)
        $http.get(caCellUrl + compare).then(function (response) {
          if (response) {
            var data = response.data
            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'CaCell'
              }
              searchResults.push(results)
            }
          }
        })
      }
      if ($scope.shop !== 'Dionwired') {
        $http.get(dionwiredUrl + compare).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwired'
              }
              searchResults.push(results)
            }
          }
        })
      }
      if ($scope.shop !== 'Game') {
        $http.get(gameUrl + compare).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                brand: data[i].brand,
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              searchResults.push(results)
            }
          }
        })
      }
      $scope.websites = searchResults
    }
    $scope.offers = function () {
      $scope.s_offer = true
    }
    // deatails
    $scope.details = function () {
      $scope.s_offer = false
      $scope.s_details = true

      var confirmPopup = $ionicPopup.confirm({
        title: 'Product Details',
        template: '<p>This will take you to the product website<br><br> Would you like to continue?</p>'
      })

      confirmPopup.then(function (res) {
        if (res) {
          var options = {
            location: 'no',
            clearcache: 'yes',
            toolbar: 'no'
          }

          $cordovaInAppBrowser.open($scope.url, '_blank', options)
            .then(function (event) {
              // success
            })
            .catch(function (event) {
              // error
            })
        }else {
          console.log('close')
        }
      })

    // $cordovaInAppBrowser.close()
    }

    // reviews
    $scope.reviews = function () {
      var customTemplate = "";
      $ionicPopup.show({
        fromTemplateUrl: customTemplate,
        title: 'Reviews',
        subTitle: 'WE CURRENTLY DO NOT HAVE REVIEWS FOR THIS PRODUCT.',
        buttons: [{
          text: 'OK',
          // type: 'button-positive',
          onTap: function (e) {}
        } // , {
        // text: 'Visit',
        // // type: 'button-positive',
        // onTap: function (e) {}
        // }
        ]
      })
    }

    // share - it will pop up a selection of share features 
    $scope.share = function () {
      var p = {
        message: $scope.title, // not supported on some apps (Facebook, Instagram)
        subject: 'Checkout this product', // fi. for email
        images: $scope.image, // an array of filenames either locally or remotely *it can be an ['', '']
        url: $scope.url, // Android only, you can override the default share sheet title
      }

      $cordovaSocialSharing.share(p.message, p.subject, p.images, p.url)
    }

    $scope.selectedWebsite = function(website){
      window.localStorage.compareItem = JSON.stringify(website)
      location.reload()
    }
  })

  .controller('CategoryCtrl', function ($scope, $state , LoaderService , $http, $ionicPopup, $cordovaInAppBrowser, gameCellponesUrl, gameCameraUrl, gameGamesUrl, dionwiredGamesUrl, gameComputersUrl, dionwiredComputersUrl, dionwiredCellphonesUrl, gameAudioUrl, dionwiredAudioUrl, dionwiredTabletsUrl) {
    var selCategory = JSON.parse(window.localStorage.getItem('category'))
    $scope.page = 1
    $scope.nextPage = function () {$scope.page += 1
      runCategory()
      console.log('next page')}
    $scope.prevPage = function () {$scope.page -= 1
      runCategory()
      console.log('previous page')}

    runCategory()
    console.log(selCategory)
    function runCategory () {
      if (selCategory == 'cellphone') {
        LoaderService.show()
        $scope.s_cell = true
        var cellphones = []
        $http.get(gameCellponesUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                brand: data[i].brand,
                title: data[i].title,
                url: data[i].url,
                price: 'R' + data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              cellphones.push(results)
            }
          }
        })
        $http.get(dionwiredCellphonesUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwired'
              }
              cellphones.push(results)
            }
            LoaderService.hide()
          }
        })
        $scope.categories = cellphones
      }

      if (selCategory == 'tablet') {
        $scope.s_tablets = true
        var tablets = []
        LoaderService.show()
        $http.get(dionwiredTabletsUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwired'
              }
              tablets.push(results)
            }
            LoaderService.hide()
          }
        })
        $scope.categories = tablets
      }
      if (selCategory == 'computer') {
        $scope.s_comp = true
        LoaderService.show()
        var computers = []
        $http.get(dionwiredComputersUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwired'
              }
              computers.push(results)
            }
          }
        })
        $http.get(gameComputersUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              computers.push(results)
            }
            LoaderService.hide()
          }
        })
        $scope.categories = computers
      }
      if (selCategory == 'camera') {
        $scope.s_cam = true
        var cameras = []
        LoaderService.show()
        $http.get(gameCameraUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              cameras.push(results)
            }
            LoaderService.hide()
          }
        })
        $scope.categories = cameras
      }
      if (selCategory == 'game') {
        LoaderService.show()
        $scope.s_games = true
        var games = []
        $http.get(gameGamesUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              games.push(results)
            }
          }
        })
        $http.get(dionwiredGamesUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwired'
              }
              games.push(results)
            }
            LoaderService.hide()
          }
        })
        $scope.categories = games
      }
      if (selCategory == 'music') {
        $scope.s_music = true
        LoaderService.show()
        var music = []
        $http.get(gameAudioUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Game'
              }
              music.push(results)
            }
          }
        })
        $http.get(dionwiredAudioUrl + $scope.page).then(function (response) {
          if (response) {
            var data = response.data

            for (var i in data) {
              var results = {
                title: data[i].title,
                url: data[i].url,
                price: data[i].price,
                image: data[i].image,
                shop: 'Dionwird'
              }
              music.push(results)
            }
            LoaderService.hide()
          }
        })
        $scope.categories = music
      }
    }

    var selectedItemCat
    $scope.selectedItem = function (item) {
      window.localStorage.categoryItem = JSON.stringify(item)
      getSelected()
    }
    function getSelected () {
      selectedItemCat = JSON.parse(window.localStorage.getItem('categoryItem'))
      var title = selectedItemCat.title
      var shop = selectedItemCat.shop
      var price = selectedItemCat.price
      var url = selectedItemCat.url

      if (shop == 'Game') {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Product Review',
          template: '<p>' + title + '<br><p style:color:red> Price: ' + price + '</p>From: ' + shop + '<br><br>Would you like to visit website?</p>'
        })
      }else {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Product Review',
          template: '<p>' + title + '<br><p style:color:red> Price: ' + price + '</p>From: ' + shop + '<br><br>Would you like to buy the product?</p>'
        })
      }

      confirmPopup.then(function (res) {
        if (res) {
          var options = {
            location: 'no',
            clearcache: 'yes',
            toolbar: 'no'
          }

          $cordovaInAppBrowser.open(url, '_blank', options)
            .then(function (event) {
              // success
            })
            .catch(function (event) {
              // error
            })
        }else {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Compare Prices',
            template: '<p>Would you like to compare prices?</p>'
          })

          confirmPopup.then(function (res) {
            if (res) {
              window.localStorage.compareItem = JSON.stringify(selectedItemCat)
              $state.go('app.compare')
            }else {
            }
          })
        }
      })
    }
  })
