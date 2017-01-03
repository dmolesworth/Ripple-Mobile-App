var app = angular.module('ionicApp', ['ionic','starter.controllers', 'starter.services', 'ngCordova', 'ion-place-tools', 'upload'])

.config(function($compileProvider){
     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('main', {
    url: "/main",
    templateUrl: "templates/main.html",
    controller: 'MainCtrl'
  })
  .state('info', {
    url: "/info",
    cache: false,
    templateUrl: "templates/info.html",
  })
  .state('places', {
    url: "/places",
    templateUrl: "templates/places.html",
  })
  .state('profile', {
    url: "/profile",
    templateUrl: "templates/profile.html",
  })
  .state('report', {
    url: "/report",
    templateUrl: "templates/report.html",
  })
  $urlRouterProvider.otherwise('/main');
});

