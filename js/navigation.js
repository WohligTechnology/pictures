var adminURL = "";
if (isproduction) {
    adminURL = "http://www.wohlig.co.in/demo/index.php";
} else {
    adminURL = "http://localhost/demo/index.php";
}

adminURL = "http://192.168.1.109/gsebackend/";
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
            $http.get(apiUrl + 'getSubscribers?email=' + mail).success(callback);
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
        getWeddingData: function(callback) {
            $http.get(apiUrl + 'getWeddingDetails').success(callback);
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
