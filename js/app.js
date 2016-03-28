// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  // for http request with session
  $httpProvider.defaults.withCredentials = true;
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/template.html",
      controller: 'HomeCtrl'
    })
    .state('movies', {
      url: "/movies",
      templateUrl: "views/template.html",
      controller: 'MoviesCtrl'
    })
    .state('moviesinside', {
      url: "/moviesinside",
      templateUrl: "views/template.html",
      controller: 'MoviesInsideCtrl'
    })
    .state('talent', {
      url: "/talent",
      templateUrl: "views/template.html",
      controller: 'TalentsCtrl'
    })
    .state('wedding', {
      url: "/wedding",
      templateUrl: "views/template.html",
      controller: 'WeddingCtrl'
    })
    .state('weddinginside', {
      url: "/weddinginside",
      templateUrl: "views/template.html",
      controller: 'WeddingInsideCtrl'
    })
    .state('asfc', {
      url: "/asfc",
      templateUrl: "views/template.html",
      controller: 'asfcCtrl'
    });
  $urlRouterProvider.otherwise("/home");
  $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

firstapp.directive('fancyboxBox', function($document) {
  return {
    restrict: 'EA',
    replace: false,
    link: function(scope, element, attr) {
      var $element = $(element);
      var target;
      if (attr.rel) {
        target = $("[rel='" + attr.rel + "']");
      } else {
        target = element;
      }

      target.fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        helpers: {
          media: {}
        }
      });
    }
  };
});
