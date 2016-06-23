// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {
    // for http request with session
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = true;
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/template.html",
            controller: 'HomeCtrl'
        })
        .state('diaries-author', {
            url: "/diaries-author/:id",
            templateUrl: "views/template.html",
            controller: 'DiariesAuthorCtrl'
        })
        .state('movies', {
            url: "/movies",
            templateUrl: "views/template.html",
            controller: 'MoviesCtrl'
        })
        .state('moviesinside', {
            url: "/moviesinside/:id",
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
            url: "/weddinginside/:id",
            templateUrl: "views/template.html",
            controller: 'WeddingInsideCtrl'
        })
        .state('weddinginsidedetail', {
            url: "/weddinginsidedetail/:id",
            templateUrl: "views/template.html",
            controller: 'WeddingInsideDetailCtrl'
        })
        .state('clients', {
            url: "/clients/:id",
            templateUrl: "views/template.html",
            controller: 'ClientsCtrl'
        })
        .state('asfc', {
            url: "/asfc",
            templateUrl: "views/template.html",
            controller: 'AsfcCtrl'
        })
        .state('asfcdetail', {
            url: "/asfcdetail/:id",
            templateUrl: "views/template.html",
            controller: 'AsfcDetailCtrl'
        })
        .state('jpp', {
            url: "/jpp",
            templateUrl: "views/template.html",
            controller: 'JppCtrl'
        })
        .state('jppseason1', {
            url: "/jppseason1/:id",
            templateUrl: "views/template.html",
            controller: 'Jppseason1Ctrl'
        })
        .state('pfh', {
            url: "/pfh",
            templateUrl: "views/template.html",
            controller: 'PfhCtrl'
        })
        .state('pfhdetail', {
            url: "/pfhdetail/:id",
            templateUrl: "views/template.html",
            controller: 'PfhDetailCtrl'
        })
        .state('sports', {
            url: "/sports",
            templateUrl: "views/template.html",
            controller: 'SportCtrl'
        })
        .state('diaries', {
            url: "/diaries/:category",
            templateUrl: "views/template.html",
            controller: 'DiariesCtrl'
        })
        .state('mehendi', {
            url: "/mehendi",
            templateUrl: "views/template.html",
            controller: 'MehendiCtrl'
        })
        .state('contact', {
            url: "/contact",
            templateUrl: "views/template.html",
            controller: 'ContactCtrl'
        })
        .state('blogtext', {
            url: "/blogtext/:id",
            templateUrl: "views/template.html",
            controller: 'BlogTextCtrl'
        })
        .state('blogimage', {
            url: "/blogimage/:id",
            templateUrl: "views/template.html",
            controller: 'BlogImageCtrl'
        })
        .state('blogvideo', {
            url: "/blogvideo/:id",
            templateUrl: "views/template.html",
            controller: 'BlogVideoCtrl'
        })
        .state('career', {
            url: "/careers",
            templateUrl: "views/template.html",
            controller: 'CareerCtrl'
        })
        .state('careerform', {
            url: "/careerform",
            templateUrl: "views/template.html",
            controller: 'CareerFormCtrl'
        })
        .state('mice', {
            url: "/mice",
            templateUrl: "views/template.html",
            controller: 'MiceCtrl'
        })
        .state('media_corner', {
            url: "/mediacorner/:year",
            templateUrl: "views/template.html",
            controller: 'MediaCornerCtrl'
        })
        .state('event', {
            url: "/events",
            templateUrl: "views/template.html",
            controller: 'EventCtrl'
        })
        .state('eventinside', {
            url: "/eventinside/:id",
            templateUrl: "views/template.html",
            controller: 'EventInsideCtrl'
        })
        .state('eventinsidedetail', {
            url: "/eventinsidedetail/:id",
            templateUrl: "views/template.html",
            controller: 'EventInsideDetailCtrl'
        })
        .state('miceinside', {
            url: "/miceinside/:id",
            templateUrl: "views/template.html",
            controller: 'MiceInsideCtrl'
        })
        .state('miceinsidedetail', {
            url: "/miceinsidedetail/:id",
            templateUrl: "views/template.html",
            controller: 'MiceInsideDetailCtrl'
        })
        .state('talentinside', {
            url: "/talentinside/:id",
            templateUrl: "views/template.html",
            controller: 'TalentInsideCtrl'
        })
        .state('talentinsidedetail', {
            url: "/talentinsidedetail/:id",
            templateUrl: "views/template.html",
            controller: 'TalentInsideDetailCtrl'
        })
        .state('worldtour', {
            url: "/worldtours",
            templateUrl: "views/template.html",
            controller: 'WorldTourCtrl'
        })
        .state('worldtourinside', {
            url: "/worldtourinside/:id",
            templateUrl: "views/template.html",
            controller: 'WorldTourInsideCtrl'
        });
    $urlRouterProvider.otherwise("/home");
    $locationProvider.html5Mode(isproduction);
});

//
// firstapp.directive('img', function($compile, $parse) {
//     return {
//         restrict: 'E',
//         replace: false,
//         link: function($scope, element, attrs) {
//             var $element = $(element);
//             if (!attrs.noloading) {
//                 $element.after("<img src='img/loading.gif' class='loading' />");
//                 var $loading = $element.next(".loading");
//                 $element.load(function() {
//                     $loading.remove();
//                     $(this).addClass("doneLoading");
//                 });
//             } else {
//                 $($element).addClass("doneLoading");
//             }
//         }
//     };
// });

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


firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            return imgpath + input + other;
        }
    };
});

firstapp.filter('youtubethumb', function() {
    return function(input, onlyid) {
        if (input) {
            var videoid = input.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if (videoid != null) {
                if (onlyid == false) {
                    return "http://img.youtube.com/vi/" + videoid[1] + "/hqdefault.jpg";
                } else if (onlyid == true) {
                    return videoid[1];
                }
            } else {
                return input;
            }
        } else {
            return input;
        }
    };
});


// firstapp.filter('uploadpath', function() {
//     return function(input, width, height, style) {
//         var other = "";
//         if (width && width != "") {
//             other += "&width=" + width;
//         }
//         if (height && height != "") {
//             other += "&height=" + height;
//         }
//         if (style && style != "") {
//             other += "&style=" + style;
//         }
//         if (input) {
//             console.log(input);
//             if (input.indexOf('https://') == -1) {
//                 return imgpath + "?file=" + input + other;
//             } else {
//                 return input;
//             }
//         }
//     };
// });

// firstapp.directive('imageonload', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             element.bind('load', function() {
//                 scope.$apply(attrs.imageonload);
//             });
//         }
//     };
// });


firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log("Loading should start now", attrs.imageonload);
            scope.attr = attrs;
            scope.$watch(
                "attr.change",
                function handleFooChange(newValue, oldValue) {
                    setTimeout(function() {
                        scope.$apply(attrs.imageonload);
                    }, 500);

                }
            );


        }
    };
});


firstapp.directive('uploadImage', function($http) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            callback: "=ngCallback"
        },
        link: function($scope, element, attrs) {
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function() {
                $scope.model = [];
            };
            $scope.upload = function(image) {
                console.log(image);
                console.log("File");
                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).success(function(data) {
                    if ($scope.callback) {
                        $scope.callback(data);
                    } else {
                        if ($scope.isMultiple) {
                            if ($scope.inObject) {
                                $scope.model.push({
                                    "image": data.data[0]
                                });
                            } else {
                                $scope.model.push(data.data[0]);
                            }
                        } else {
                            $scope.model = data.data[0];
                        }
                    }
                });
            };
        }
    };
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

firstapp.filter('timeago', function() {
    return function(input, p_allowFuture) {

        var substitute = function(stringOrFunction, number, strings) {
                var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
                var value = (strings.numbers && strings.numbers[number]) || number;
                return string.replace(/%d/i, value);
            },
            nowTime = (new Date()).getTime(),
            date = (new Date(input)).getTime(),
            //refreshMillis= 6e4, //A minute
            allowFuture = p_allowFuture || false,
            strings = {
                prefixAgo: '',
                prefixFromNow: '',
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years"
            },
            dateDifference = nowTime - date,
            words,
            seconds = Math.abs(dateDifference) / 1000,
            minutes = seconds / 60,
            hours = minutes / 60,
            days = hours / 24,
            years = days / 365,
            separator = strings.wordSeparator === undefined ? " " : strings.wordSeparator,


            prefix = strings.prefixAgo,
            suffix = strings.suffixAgo;

        if (allowFuture) {
            if (dateDifference < 0) {
                prefix = strings.prefixFromNow;
                suffix = strings.suffixFromNow;
            }
        }

        words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
            seconds < 90 && substitute(strings.minute, 1, strings) ||
            minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
            minutes < 90 && substitute(strings.hour, 1, strings) ||
            hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
            hours < 42 && substitute(strings.day, 1, strings) ||
            days < 30 && substitute(strings.days, Math.round(days), strings) ||
            days < 45 && substitute(strings.month, 1, strings) ||
            days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
            years < 1.5 && substitute(strings.year, 1, strings) ||
            substitute(strings.years, Math.round(years), strings);
        console.log(prefix + words + suffix + separator);
        prefix.replace(/ /g, '')
        words.replace(/ /g, '')
        suffix.replace(/ /g, '')
        return (prefix + ' ' + words + ' ' + suffix + ' ' + separator);

    };
});




$(document).ready(function() {
    $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });
});
