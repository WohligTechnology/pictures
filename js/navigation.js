var adminURL = "";
// if (isproduction) {
//     adminURL = "http://wohlig.co.in/gsebackend/index.php";
// } else {
//     adminURL = "http://localhost/demo/index.php";
// }

// adminURL = "http://wohlig.co.in/gsebackend/";
adminURL = "http://192.168.1.137/gsebackend/";
// adminURL = "http://localhost/gsebackend/";
var apiUrl = adminURL + "index.php/json/";
var imgpath = adminURL + "uploads/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Home",
    classis: "active",
    anchor: "home",
    subnav: [{
      name: "Subnav1",
      classis: "active",
      link: "#/home"
    }]
  }];

  return {
    getnav: function() {
      return navigation;
    },
    subscribe: function(mail, callback) {
      // console.log(mail);
      $http.get(apiUrl + 'subscribeSubmit?email=' + mail).success(callback);
    },
    getInTouch: function(getin, callback) {
      $http({
        url: apiUrl + 'getInTouch',
        method: 'POST',
        withCredentials: true,
        data: getin
      }).success(callback);
    },
    getMoviesData: function(callback) {
      $http.get(apiUrl + 'getMovieDetails').success(callback);
    },
    getMovieInside: function(movieid, callback) {
      $http.get(apiUrl + 'getMovieInside?id=' + movieid).success(callback);
    },
    getWeddingData: function(callback) {
      $http.get(apiUrl + 'getWeddingDetails').success(callback);
    },
    getWeddingInside: function(obj, callback) {
      $http.get(apiUrl + 'getWeddingInside?id=' + obj.id + "&pageno=" + obj.pageno + "&maxrow=2").success(callback);
    },
    getWeddingInsideDetails: function(id, callback) {
      $http.get(apiUrl + 'getWeddingInsideDetails?id=' + id).success(callback);
    },
    getWeddingInsideBanner: function(movieid, callback) {
      $http.get(apiUrl + 'getWeddingInsideBanner?id=' + movieid).success(callback);
    },
    getEventData: function(callback) {
      $http.get(apiUrl + 'getEvents').success(callback);
    },
    getEventInsideBanner: function(id, callback) {
      $http.get(apiUrl + 'getEventInsideBanner?id=' + id).success(callback);
    },
    getEventInside: function(obj, callback) {
      $http.get(apiUrl + 'getEventInside?id=' + obj.id + "&pageno=" + obj.pageno + "&maxrow=2").success(callback);
    },
    getEventInsideDetails: function(id, callback) {
      $http.get(apiUrl + 'getEventInsideDetails?id=' + id).success(callback);
    },
    getMiceInsideBanner: function(id, callback) {
      $http.get(apiUrl + 'getMiceInsideBanner?id=' + id).success(callback);
    },
    getMiceInside: function(obj, callback) {
      $http.get(apiUrl + 'getMiceInside?id=' + obj.id + "&pageno=" + obj.pageno + "&maxrow=2").success(callback);
    },
    getMiceInsideDetails: function(id, callback) {
      $http.get(apiUrl + 'getMiceInsideDetails?id=' + id).success(callback);
    },
    getworldtourdetail:function(callback){
      $http.get(apiUrl + 'getWorldTour').success(callback);
    },
    getWorldtourInside: function(tourid, callback) {
      $http.get(apiUrl + 'getWorldTourInsideDetails?id=' + tourid).success(callback);
    },
    getMice: function(callback) {
      $http.get(apiUrl + 'getMice').success(callback);
    },
    getSportdata: function(callback) {
      $http.get(apiUrl + 'getSport').success(callback);
    },
    getSportdataByid: function(id,callback) {
      $http.get(apiUrl + 'getSportsDetail?id=' + id).success(callback);
    },
    getSeasonData: function(id,callback) {
      $http.get(apiUrl + 'getSportsDetailInside?id=' + id).success(callback);
    },
    getSportInsidedataByid: function(id,callback) {
      $http.get(apiUrl + 'getSportInside?sportscategory=' + id).success(callback);
    },
    getMediacorner: function(callback) {
      $http.get(apiUrl + 'getMediacorner').success(callback);
    },
    getHome: function(callback) {
      $http.get(apiUrl + 'getHome').success(callback);
    },
    getMediaByYear: function(obj, callback) {
      $http.get(apiUrl + 'getWeddingInside?id=' + obj.year).success(callback);
    },
    gettourform:function(mydata,callback){
      $http({
        url: apiUrl + 'getInTouch',
        method: 'POST',
        withCredentials: true,
        data: mydata
      }).success(callback);
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },

  };
});
