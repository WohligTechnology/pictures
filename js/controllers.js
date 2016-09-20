var initMap = {};
var calculateAndDisplayRoute = {};
var globalObj = true;

angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'infinite-scroll', 'angular-loading-bar', 'imageupload'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.subscribe = {};
        $scope.subscribe.email = "";


        // $scope.goBlogText = function(statename, param) {
        //     console.log(statename, param);
        //     $state.go(statename, {
        //         id: param
        //     });
        // };

        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        //
        // $scope.checkemail=function(email){
        //
        // }

        $scope.checkEmail = false;
        $scope.subscribeEmail = false;
        $scope.subscribe = function(email) {
            // if(!email) {
            //     alert("please enter your email");
            // }
            // console.log('Email subscribe: ', email);
            NavigationService.subscribe(email, function(data) {

                console.log(data.value);
                if (!data.value) {
                    if ($scope.subscribe.email) {
                        $scope.checkEmail = true;
                        $scope.subscribeEmail = false;
                        $timeout(function() {
                            $state.reload();
                            $timeout(function() {
                                $scope.checkEmail = "";
                                $scope.subscribeEmail = "";
                            }, 2000);
                        }, 3000);

                    }
                } else {
                    $scope.subscribeEmail = true;
                    $scope.checkEmail = false;
                    $timeout(function() {
                        $state.reload();
                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);

                }
                //console.log(email);
                $scope.subscribe.email = "";
            });

            // $scope.subscribeEmail = data;
        };
        $scope.homedata = "";
        NavigationService.getHome(function(data) {
            $scope.homedata = data.data;
            console.log($scope.homedata);
        });
    })
    .controller('DiariesAuthorCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("author");
        $scope.menutitle = NavigationService.makeactive("Diaries-Author");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        NavigationService.getDiariesAuthor($stateParams.id, function(data) {
            $scope.diariesAuthorData = data.data;
            console.log('$scope.diariesAuthorData', $scope.diariesAuthorData);
        });
    })
    .controller('AboutCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("aboutus");
        $scope.menutitle = NavigationService.makeactive("About Us");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        NavigationService.getDiariesAuthor($stateParams.id, function(data) {
            $scope.diariesAuthorData = data.data;
            console.log('$scope.diariesAuthorData', $scope.diariesAuthorData);
        });
    })

.controller('footerctrl', function($scope, TemplateService, NavigationService, $state, $uibModal) {
    $scope.template = TemplateService;
    $scope.openModal = function() {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/content/modal/get.html',
            controller: 'footerctrl',
            size: 'lg',
            windowClass: 'get-modal',
        });
    };
    $scope.getin = {};
    $scope.getin.enquiryarr = [];
    $scope.showThanks = false;


        $scope.moviesSubmitForm = function(formValid) {
            $scope.getin.enquiry = "";
            if (formValid.$valid && $scope.getin) {
                if ($scope.getin.enquiryarr.length > 0) {
                    _.each($scope.getin.enquiryarr, function(n) {
                        $scope.getin.enquiry += n + ",";
                    })
                    $scope.getin.enquiry = $scope.getin.enquiry.substring(0, $scope.getin.enquiry.length - 1);
                }
                $scope.getin.category = 1;
                NavigationService.getInTouch($scope.getin, function(data) {
                    console.log(data);
                    if (data.value != false) {
                        $scope.showThanks = true;
                    }
                });
            }
        };

        $scope.pushorpop = function(val) {
            var foundIndex = $scope.getin.enquiryarr.indexOf(val);
            if (foundIndex == -1) {
                $scope.getin.enquiryarr.push(val);
            } else {
                $scope.getin.enquiryarr.splice(foundIndex, 1);
            }
        }
})

.controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("movies");
    $scope.menutitle = NavigationService.makeactive("Movies");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    $scope.getin = {};
    $scope.getin.enquiryarr = [];
    $scope.showThanks = false;

    NavigationService.getMoviesData(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.movieData = data.data;
        }
    });

    $scope.moviesSubmitForm = function(formValid) {
        $scope.getin.enquiry = "";
        if (formValid.$valid && $scope.getin) {
            if ($scope.getin.enquiryarr.length > 0) {
                _.each($scope.getin.enquiryarr, function(n) {
                    $scope.getin.enquiry += n + ",";
                })
                $scope.getin.enquiry = $scope.getin.enquiry.substring(0, $scope.getin.enquiry.length - 1);
            }
            $scope.getin.category = 1;
            NavigationService.getInTouch($scope.getin, function(data) {
                console.log(data);
                if (data.value != false) {
                    $scope.showThanks = true;
                }
            });
        }
    };

    $scope.pushorpop = function(val) {
        var foundIndex = $scope.getin.enquiryarr.indexOf(val);
        if (foundIndex == -1) {
            $scope.getin.enquiryarr.push(val);
        } else {
            $scope.getin.enquiryarr.splice(foundIndex, 1);
        }
    }

    $scope.subscribe = {};
    $scope.subscribe.email = "";
    //
    // $scope.checkemail=function(email){
    //
    // }

    $scope.checkEmail = false;
    $scope.subscribeEmail = false;
    $scope.subscribe = function(email) {
        // if(!email) {
        //     alert("please enter your email");
        // }
        // console.log('Email subscribe: ', email);
        NavigationService.subscribe(email, function(data) {

            // console.log(data);
            if (!data.value) {
                if ($scope.subscribe.email) {
                    $scope.checkEmail = true;
                    $scope.subscribeEmail = false;
                    $timeout(function() {
                        $state.reload();
                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);
                }
            } else {
                $scope.subscribeEmail = true;
                $scope.checkEmail = false;
                $timeout(function() {
                    $state.reload();
                    $timeout(function() {
                        $scope.checkEmail = "";
                        $scope.subscribeEmail = "";
                    }, 2000);
                }, 3000);
            }
            //console.log(email);
            $scope.subscribe.email = "";
        });

        // $scope.subscribeEmail = data;
    };



    $scope.doActives = function(params) {
        if (params === 1) {
            console.log($scope.wallpapers);
            $scope.styleActives = "mactives";
            $scope.styleNoActives = "";
            $scope.movie = $scope.moviereleased;
        } else {
            console.log($scope.wallpaper);

            $scope.styleActives = "";
            $scope.styleNoActives = "mactives";
            $scope.movie = $scope.movieupcoming;
        }
    }
    $scope.doActives(1);
})

.controller('MoviesInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("moviesinside");
    $scope.menutitle = NavigationService.makeactive("Movies");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    NavigationService.getMovieInside($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.movieInside = data.data;
            if ($scope.movieInside && $scope.movieInside.imagegallery && $scope.movieInside.imagegallery.length) {
                $scope.movieInside.imagegallery = _.chunk($scope.movieInside.imagegallery, 6);
                for (var i = 0; i < $scope.movieInside.imagegallery.length; i++) {
                    $scope.movieInside.imagegallery[i] = _.chunk($scope.movieInside.imagegallery[i], 3);
                }
            }
            if ($scope.movieInside && $scope.movieInside.wallpaper && $scope.movieInside.wallpaper.length) {
                $scope.movieInside.wallpaper = _.chunk($scope.movieInside.wallpaper, 6);
                for (var i = 0; i < $scope.movieInside.wallpaper.length; i++) {
                    $scope.movieInside.wallpaper[i] = _.chunk($scope.movieInside.wallpaper[i], 3);
                }
            }
        }
    })

    $scope.makeActive = function(video, index) {
        $scope.movieInside.featuredvideos.splice(index, 1);
        $scope.movieInside.featuredvideos.unshift(video);
    }

    $scope.clientspeak = {
        category: "Client Speak",
        text: "Extra Efficient",
        name: "Amitabh Bachchan",
        img: "img/home/amitabh.jpg"
    };
    $scope.moviesdetail = {
        detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with including versions of Lorem Ipsum.",
        producer: "Bunty Walia, Juspreet Singh Walia and Vashu Bhagnani",
        director: "Sohail Khan",
        cast: "Salman Khan, Kajol, Arbaaz Khan, Dharmendra",
        music: "Jatin-Lalit, Himesh Reshammiya and Sajid-Wajid"
    };

    $scope.moviereleased = [{
        img: "img/movies/released/released1.jpg",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/movies/released/released2.jpg",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/movies/released/released3.jpg",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/movies/released/released4.jpg",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/movies/released/released5.jpg",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }];
    $scope.wallpapers = [{
        img: "img/moviedetail/wallpapers/wallpaper1.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper2.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper3.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper4.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper6.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper1.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper2.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper3.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper4.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper6.jpg"
    }];
    $scope.wallpapers = _.chunk($scope.wallpapers, 6);
    for (var i = 0; i < $scope.wallpapers.length; i++) {
        $scope.wallpapers[i] = _.chunk($scope.wallpapers[i], 3);
    }

    $scope.wallpaper = [{
        img: "img/moviedetail/wallpapers/wallpaper1.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper1.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper2.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper2.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper3.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper3.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper4.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper4.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper6.jpg"
    }, {
        img: "img/moviedetail/wallpapers/wallpaper6.jpg"
    }];
    $scope.wallpaper = _.chunk($scope.wallpaper, 6);
    for (var i = 0; i < $scope.wallpaper.length; i++) {
        $scope.wallpaper[i] = _.chunk($scope.wallpaper[i], 3);
    }
    $scope.doActives = function(param) {
        if (param === 1) {
            $scope.styleActives = "actives";
            $scope.styleNoActives = "";
            $scope.paper = $scope.wallpaper;
        } else {
            $scope.styleActives = "";
            $scope.styleNoActives = "actives";
            $scope.paper = $scope.wallpapers;
        }
    }
    $scope.doActives(1);
    $scope.awards = [{
        name: "Kamaal Khan",
        title: "R.D. Burman Award",
        fortitle: "O o jaane jaana"
    }, {
        name: "Kamaal Khan",
        title: "R.D. Burman Award",
        fortitle: "O o jaane jaana"
    }, {
        name: "Kamaal Khan",
        title: "R.D. Burman Award",
        fortitle: "O o jaane jaana"
    }, {
        name: "Kamaal Khan",
        title: "R.D. Burman Award",
        fortitle: "O o jaane jaana"
    }];
})

.controller('TalentsCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("talents");
    $scope.menutitle = NavigationService.makeactive("Talents");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    $scope.oneAtATime = true;
    $scope.formData = {};
    $scope.talentSubmitForm = function(formValid, formData) {
        if (formValid.$valid && $scope.formData) {
            $state.go("talent");

        }
    };
    $scope.subscribe = {};
    $scope.subscribe.email = "";

    $scope.checkEmail = false;
    $scope.subscribeEmail = false;
    $scope.subscribe = function(email) {
        NavigationService.subscribe(email, function(data) {

            // console.log(data);
            if (!data.value) {
                if ($scope.subscribe.email) {
                    $scope.checkEmail = true;
                    $scope.subscribeEmail = false;
                    $timeout(function() {
                        $state.reload();
                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);
                }
            } else {
                $scope.subscribeEmail = true;
                $scope.checkEmail = false;
                $timeout(function() {
                    $state.reload();
                    $timeout(function() {
                        $scope.checkEmail = "";
                        $scope.subscribeEmail = "";
                    }, 2000);
                }, 3000);
            }
            //console.log(email);
            $scope.subscribe.email = "";
        });

        // $scope.subscribeEmail = data;
    };

    NavigationService.getTalent(function(data) {
        $scope.getTalentdata = data.data;
        console.log($scope.getTalentdata);
    })


    $scope.formData = {};
    $scope.formData.enquiryarr = [];
    $scope.showThanks = false;

    $scope.talentSubmitForm = function(formValid) {
        $scope.formData.enquiry = "";
        if (formValid.$valid && $scope.formData) {
            if ($scope.formData.enquiryarr.length > 0) {
                _.each($scope.formData.enquiryarr, function(n) {
                    $scope.formData.enquiry += n + ",";
                })
                $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
            }
            $scope.formData.category = 5;
            NavigationService.getInTouch($scope.formData, function(data) {
                console.log(data);
                if (data.value != false) {
                    $scope.showThanks = true;
                }
            });
        }
    };

    $scope.pushorpop = function(val) {
        var foundIndex = $scope.formData.enquiryarr.indexOf(val);
        if (foundIndex == -1) {
            $scope.formData.enquiryarr.push(val);
        } else {
            $scope.formData.enquiryarr.splice(foundIndex, 1);
        }
    }



})

.controller('WeddingCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("wedding");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // var globalObj =true;
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    $scope.oneAtATime = true;
    $scope.getin = {};
    $scope.getin.enquiryarr = [];
    $scope.getin.enquiry = "";
    $scope.showThanks = false;
    $scope.eoptions = {};

    $scope.soptions = {
        minDate: new Date()
    }

    $scope.changeEOptions = function() {
        $scope.eoptions = {
            minDate: new Date($scope.getin.date)
        }
    }

    NavigationService.getWeddingData(function(data) {
        console.log(data);
        if (data.value != false) {
            $scope.weddingData = data.data;
            for (i = 0; i <= $scope.weddingData; i++) {
                $scope.myname = $scope.weddingData[i].name;
                if ($scope.myname == 'Sangeet' && $scope.myname == 'Mehendi') {
                    console.log('ifff');
                    $scope.mylocation = $state.go('weddinginsidedetail', {
                        flag: 0,
                        id: $scope.weddingData[i]._id
                    });
                    console.log('$scope.mylocation', $scope.mylocation);
                } else {
                    console.log('else');
                    $scope.mylocation = $state.go('weddinginside', {
                        id: $scope.weddingData[i]._id
                    });
                }

            }
        }
    });

    $scope.weddingSubmitForm = function(formValid) {
        if (formValid.$valid && $scope.getin) {
            if ($scope.getin.enquiryarr.length > 0) {
                _.each($scope.getin.enquiryarr, function(n) {
                    $scope.getin.enquiry += n + ",";
                })
                $scope.getin.enquiry = $scope.getin.enquiry.substring(0, $scope.getin.enquiry.length - 1);
            }
            $scope.getin.category = 2;
            console.log($scope.getin);
            if ($scope.getin.date) {
                var formatdate = $scope.getin.date.getFullYear();
                formatdate += "/" + $scope.getin.date.getMonth();
                formatdate += "/" + $scope.getin.date.getDate();
                $scope.getin.date = formatdate;
            }
            if ($scope.getin.enddate) {
                var formatdate = $scope.getin.enddate.getFullYear();
                formatdate += "/" + $scope.getin.enddate.getMonth();
                formatdate += "/" + $scope.getin.enddate.getDate();
                $scope.getin.enddate = formatdate;
            }
            NavigationService.getInTouch($scope.getin, function(data) {
                console.log(data);
                if (data.value != false) {
                    $scope.showThanks = true;
                }
            });
        }
    };

    $scope.pushorpop = function(val) {
        var foundIndex = $scope.getin.enquiryarr.indexOf(val);
        if (foundIndex == -1) {
            $scope.getin.enquiryarr.push(val);
        } else {
            $scope.getin.enquiryarr.splice(foundIndex, 1);
        }
    }

    $scope.wedding = [{
        img: "img/weddings/types/type1.jpg",
        name: "360 Wedding"
    }, {
        img: "img/weddings/types/type2.jpg",
        name: "Mehendi & Sangeet"
    }, {
        img: "img/weddings/types/type3.jpg",
        name: "Bollywood Nite"
    }, {
        img: "img/weddings/types/type4.jpg",
        name: "Youngsters & Cocktail Party"
    }, {
        img: "img/weddings/types/type5.jpg",
        name: "Phera & Reception"
    }, {
        img: "img/weddings/types/type6.jpg",
        name: "Destination Weddingsname"
    }];
    $scope.weddings = [{
        img: "img/weddings/diaries/diary1.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/weddings/diaries/diary2.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/weddings/diaries/diary3.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }];
    $scope.services = [{
        title: "Wedding Planning",
        content: "<p>We ensure your wedding is the perfect moment in your life, and more so, you enjoy it! No matter how elaborate or intimate you would like the celebrations to be, we are there to help you through them. The first step to wedding planning is meeting the couple and all the family members involved in the planning process to get a clear brief and understanding of the vision for the wedding. Questions, Questions, Questions! Our team takes you through a list of numerous questions in order to get a precise brief from you – what your likes & dislikes are, themes you like, the ceremonies involved, décor, talent, food, how you would like to see each function unravel, and so on. We then make a detailed plans based on your requirements and guide you through every step.<p><p> To us,a great wedding is in the detail. </p>"
    }, {
        title: "Venue Selection",
        content: "<p>Selecting an apt venue for an event is as important as choosing the right apparel and accessories for the occasion. Our team can assist in finding the right venue across the length and breadth of India as well as overseas from our exhaustive data bank of venues suitable for all types of budgets and criteria irrespective of whether we are contracted for a full event management package or purely specific services such as interiors/décor and lighting schemes.</p>"
    }, {
        title: "Design and Production",
        content: "<p>We oversee the design and construction of elegant and flawless designs for all our events to create beautiful, unforgettable functions. Our design team will creatively think through your requirements and mould them to suit each venue, artist, ceremony and budget to create bespoke designs & decor.  Planning the ‘event’ for all functions and ensuring quality control of execution and delivery of what’s promised is what we’re best at doing. Our experienced and hands-on show & production teams will oversee every detail to deliver The Perfect Function.Whether your influences are traditional Indian, Balinese naturalist, European eclectic or classic English… our designs will take your breath away.</p> <h4>Decor</h4><p>Décor is like a crown of jewels…special attention is paid to colours of drapes, flower arrangements, backdrops, props, lighting, seating, etc. for a tasteful presentation. We execute all these minute details with perfection. We understand how important it is to match the colour of the flowers of the centre piece with that of the bow of the chair…we understand the scheme of colours, the fall of the fabrics.</p> <h4>Themed Weddings</h4><p>You simply state the type of event you desire whether a casino setting/bollywood nite/egyptian/medieval/70’s style office party/awards ceremony/Moroccan wedding/a special ball. We will weave the magic to create and perform the themed event.</p><h4>Technicals</h4><p>Lighting is the most important part of your wedding decor because it not only affects the look, but can completely change the mood and feel of the event. We work with experienced, creative and professional lighting, sound and audio production designers.</p><h4>Pyrotechs</h4><p>Our high caliber public firework displays are designed, not only to entertain large audience but to capture them in a pyrotechnic spell, taking them on a magical journey. We also ensures that state-of-the-art, superior pyrotechnic equipment is used for all its aerial shows to ensure quality and safety.</p>"
    }, {
        title: "Destination Management",
        content: "<p>Destination Wedding can be magical, whether you are planning an intimate island wedding or decadent celebration, we offer a full planning service with bespoke recommendations to gently guide you to plan your dream destination wedding just point the way. </p><p>Having a wedding away from your hometown is unique and something your guests would always remember. It is ideal for couples who like to keep things intimate and personal, and want only their closest friends and family to attend the event. The landscape and the scenic beauty of the location, adds to the charm of the décor.</p>"
    }, {
        title: "Hospitality & Guest Management",
        content: "<p>Managing the guests can be a daunting task even for the most organised so we ensure that your guests are taken care of and assisted to. We track RSVPs of your guests so you can focus on other important details. Right from their arrival to departure and everything in between is handled by us. We help you arrange accommodation for your guests, taking care that every need is met with, our aim is to give your guests an overall pleasurable experience and a wedding that they will remember for their lifetime.</p> <h4>RSVP</h4> <p>Over years of experience with planning intimate and large scale Indian weddings we have realised the best RSVP process is a one custom-made specially for each family and wedding. Whether information on guests must come from New York or Nagpur, Surat or Singapore, the designated RSVP teams carefully & meticulously collate all sources of information ensuring no information is left out. It is an area of real expertise and pride for us. From the Save-the-Dates right through to the Thank You letters, our Hospitality Teams can design a smooth and efficient process that will provide your family and guests with a warm and memorable experience.</p> <h4>Logistics</h4><p>We supervise the entire logistics to make your wedding a smooth sailing and enjoyable experience. We take care of the , RSVPs, guests, hotels, airport pick ups and any other logistical requirement for the wedding. Get the ground transportation right and you’ve got yourself happy guests. Limos, Helicopters, Private Jets, Cruise Liners, a Harley Davidson parade, a Vintage Car cavalcade… or the odd Camel Cart! We can arrange to hire the most varied modes of transport. Our experience and accountability ensure a smooth ride for all your occasions.</p>"
    }, {
        title: "Catering",
        content: "<p>We make your special day unforgettable for people attending the wedding with indulging food. We help you with selecting a menu that has a fine balance of Indian feasts and global cuisine that will delight the palate of your guests. For your sweet-tooth indulge in wide variety of mouth-watering gourmet desserts. Beverages both alcoholic and non-alcoholic can be served; having your own signature cocktail menu will add a personalised touch to the celebrations.</p><h4>Menu Selection</h4><p>Experienced advice on one of the most crucial elements of a successful weddings, FOOD! Eclectic and visually delightful selections that will linger forever.</p> <h4>Liquor</h4> <p>From the Bubbly to the rare Malts, our liquor partners will keep everyone in high spirits.!!!</p>"
    }, {
        title: "Entertainment",
        content: "Performances and themes that will enthral and entertain your guests! Who to work with. Who to avoid! Talent sourcing, negotiation and liaison to get the very best out of each event and artist. Entertainers and stars at every budget, from every art-form and culture, and for every occasion. As per your aspirations and specifications, we organise the entertainment <ul><li>Artists Band</li><li> Singers </li><li>DJ</li><li>Standup Comedians</li><li>Celebrity</li><li>Choreographers</li></ul>"
    }, {
        title: "Photographers & Videographers",
        content: "<p>A wedding day is always remembered fondly by photographs and wedding videos, thus capturing true essence of the wedding day is important. A couple goes to great lengths to make sure that their wedding day is just as envisioned, so we make sure that every emotion is captured beautifully. It is important that the wedding photos and videos capture the love and festivities of the celebration.</p><p>In understanding the importance of wedding photos, teams up with a special team of Photographers & Cinematographers who have a personalised approach to eachwedding capturing candid moments.</p>"
    }, {
        title: "Styling",
        content: "<p>Every bride and groom deserves to look their very best on their special day. We make sure that every aspect of your styling and your wedding party is taken care of. Your trousseau for every function should reflect on the mood and the festivities of each ceremony. Wedding attire will be a part of your heritage in form of family heirloom, thus it is an important aspect of the wedding.</p>"
    }, {
        title: "Security & Licenses",
        content: "<p>We ensure that your wedding day goes as smooth as possible. Weddings are a grand affair and there are a lot of important licenses and permissions that need to be procured, we provide you necessary council and help you acquire the required permits. All the technical aspects and necessary legal formalities are taken care of.</p><p>On-site security is important to deal with gate-crashers or any other emergencies. We also have a special team of professionals who manage any unforeseen circumstances on site.</p>"
    }, {
        title: "Website and Social Media",
        content: "<p>We as a team know that the web space is turning into a major interface for couples who are planning their wedding. For the same, our web specialists can design, what we call, a custom-made wedding website for the couple where in the couple can post information and details about their wedding. Such a wedding website would be managed by our team with customized information from the couple.</p><p>The main advantage of having a wedding website is that it can be a comprehensive interface for couples who are based abroad and who have guests flying in from various places. A wedding website can also give a personalised feel to the guests and will give them a chance to know the couple more closely.</p><h4>E-invites and Social-Media Presence</h4><p>Our team also undertake the designing of e-invites on the wedding website or on a separate page as a whole. We can also write blog entries, mini-advertorials and design other creative wedding communication for your big day!</p>"
    }];



    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    };
})

.controller('WeddingInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("weddinginside");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.pagedata = {};
    $scope.pagedata.pageno = 0;
    $scope.pagedata.id = $stateParams.id;
    var lastpage = 1;

    $scope.weddingSubtype = [];

    $scope.getWeddingSubtype = function() {
        NavigationService.getWeddingInside($scope.pagedata, function(data) {
            lastpage = data.lastpage;
            if (data.queryresult.length > 0) {
                _.each(data.queryresult, function(n) {
                    $scope.weddingSubtype.push(n);
                })
                $scope.shouldscroll = false;
            } else {
                $scope.shouldscroll = true;
            }
            console.log($scope.weddingSubtype);
        })
    }

    $scope.addMoreItems = function() {
        // console.log("addMoreItems");
        if (lastpage > $scope.pagedata.pageno) {
            $scope.pagedata.pageno++;
            $scope.shouldscroll = true;
            $scope.getWeddingSubtype();
        } else {
            $scope.shouldscroll = true;
        }
    }

    $scope.addMoreItems();

    NavigationService.getWeddingInsideBanner($stateParams.id, function(data) {
        console.log(data);
        if (data.value != false) {
            if (data.data && data.data.banner)
                $scope.weddingBanner = data.data.banner;
            $scope.weddingName = data.data.name;
        }
    })
    $scope.abc = '';
    $scope.goInside = function(id, name) {
        console.log(name);
        //   $.jStorage.set("mypage",name);
        // $scope.abc = $.jStorage.get("mypage");
        //   console.log($scope.abc);
        // var globalObj =false;
        // $state.go(weddinginsidedetail)
        $state.go('weddinginsidedetail', {
            flag: 0,
            id: id
        });
    };

    // $scope.weddingdetail = [{
    //     img: "img/weddings/w1.png",
    //     name: "Choksi-Talera Wedding Setup testtttttttt",
    //     detail: "The beautiful #choksitalerawedding took place at Mohini Mahal on 16th April, 2014. The entire #event was organized and managed by GS Worldwide Entertainment. #gswedding "
    // }, {
    //     img: "img/weddings/w1.png",
    //     name: "Jhosi Wedding",
    //     detail: "The beautiful #choksitalerawedding took place at Mohini Mahal on 16th April, 2014. The entire #event was organized and managed by GS Worldwide Entertainment. #gswedding"
    // }];
})


.controller('WeddingInsideDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("weddingdetail");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    // var globalObj =false;
    $scope.weddetail = {};
    console.log("aaa", $stateParams);
    if ($stateParams.flag == 0) {
        NavigationService.getWeddingInsideDetails($stateParams.id, function(data) {

            console.log("innn");
            $scope.weddetail = data.data;
            console.log("$scope.weddetail", $scope.weddetail);
            if ($scope.weddetail.imagegallery && $scope.weddetail.imagegallery.length > 0) {
                $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 6);
                for (var i = 0; i < $scope.weddetail.imagegallery.length; i++) {
                    $scope.weddetail.imagegallery[i] = _.chunk($scope.weddetail.imagegallery[i], 3);
                }
                // $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 3);
            }
        })
    } else {
        NavigationService.getSangeetInsideDetails($stateParams.id, function(data) {
            console.log("elsee");
            $scope.weddetail = data.data;
            console.log("$scope.weddetail", $scope.weddetail);
            if ($scope.weddetail.imagegallery && $scope.weddetail.imagegallery.length > 0) {
                $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 6);
                for (var i = 0; i < $scope.weddetail.imagegallery.length; i++) {
                    $scope.weddetail.imagegallery[i] = _.chunk($scope.weddetail.imagegallery[i], 3);
                }
                // $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 3);
            }
        })
    }

    $scope.makeActive = function(video, index) {
        $scope.weddetail.featuredvideos.splice(index, 1);
        $scope.weddetail.featuredvideos.unshift(video);
    }
})

.controller('ClientsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("clients");
    $scope.menutitle = NavigationService.makeactive("Clients");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    // $scope.clientimage = [{
    //   img: "img/client/1.png",
    //   alt: ""
    // }, {
    //   img: "img/client/2.png",
    //   alt: ""
    // }, {
    //   img: "img/client/3.png",
    //   alt: ""
    // }, {
    //   img: "img/client/4.png",
    //   alt: ""
    // }, {
    //   img: "img/client/5.png",
    //   alt: ""
    // }, {
    //   img: "img/client/6.png",
    //   alt: ""
    // }, {
    //   img: "img/client/7.png",
    //   alt: ""
    // }, {
    //   img: "img/client/8.png",
    //   alt: ""
    // }];
    //
    // $scope.strip = [{
    //     img: "img/client/jpp1.jpg",
    //     name: "Jaipur Pink Panthers"
    //   }, {
    //     img: "img/client/jpp2.jpg",
    //     name: "Kings XI Panjab"
    //   }, {
    //     img: "img/client/jpp3.jpg",
    //     name: "CHENNAYIN F.C."
    //   }, {
    //     img: "img/client/jpp4.jpg",
    //     name: "KOTAK"
    //   },
    //
    // ];
    $scope.seeMore = false;
    $scope.seeLess = false;
    var clientsArray = [];
    $scope.seeLessClients = function() {
        NavigationService.getClient(function(data) {
            $scope.getClientdata = data.data.logos;
            clientsArray = _.cloneDeep($scope.getClientdata);
            $scope.seeMore = true;
            $scope.getClientdata = _.slice($scope.getClientdata, [0], [12]);
            if ($scope.getClientdata.length < 12) {
                $scope.seeMore = false;
            }
        })
    };
    $scope.seeLessClients();
    $scope.seeMoreClients = function() {
        $scope.seeMore = false;
        $scope.seeLess = true;
        // $scope.allMovieName = {}
        $scope.getClientdata = clientsArray;
        // console.log('dfgyhujkdrftgh', $scope.allMovieName);
    }
    NavigationService.getClientDetail(function(data) {
        $scope.getClientDetaildata = data.data;
        console.log('$scope.getClientDetaildata', $scope.getClientDetaildata);
    })

    $scope.makeActive = function(data, index) {
        $scope.getClientDetaildata.splice(index, 1);
        $scope.getClientDetaildata.unshift(data);
    }

})

.controller('AsfcCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("asfc");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    // $scope.asfcdetail = [{
    //     img: "img/ASFC/w1.jpg",
    //     team1: "AHFC",
    //     team2: "AHFC",
    //     date: "15 Sep 2015",
    //     location: "Bangalore",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }, {
    //     img: "img/ASFC/w2.jpg",
    //     team1: "AHFC",
    //     team2: "AHFC",
    //     date: "15 Sep 2015",
    //     location: "Bangalore",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }, {
    //     img: "img/ASFC/w3.jpg",
    //     team1: "AHFC",
    //     team2: "AHFC",
    //     date: "15 Sep 2015",
    //     location: "Bangalore",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }, {
    //     img: "img/ASFC/w4.jpg",
    //     team1: "AHFC",
    //     team2: "AHFC",
    //     date: "15 Sep 2015",
    //     location: "Bangalore",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }];
    // $scope.asfcplayer = [{
    //     img: "img/ASFC/player1.jpg",
    //     name: "Abhisek Bachchan",
    // }, {
    //     img: "img/ASFC/player2.jpg",
    //     name: "Ranbir Kapoor",
    // }, {
    //     img: "img/ASFC/player3.jpg",
    //     name: "Aditya Roy Kapoor",
    // }, {
    //     img: "img/ASFC/player4.jpg",
    //     name: "Arjun Kapoor",
    // }, {
    //     img: "img/ASFC/player5.jpg",
    //     name: "Dino Morea",
    // }];
    // $scope.clientspeak = {
    //     category: "Players Speak",
    //     text: "Awesome teamwork and planning",
    //     name: "Sunil Joshi",
    //     img: "img/movies/ranbir.jpg"
    // };

    // var id = '2';
    // NavigationService.getSportInsidedataByid(id, function(data) {
    //     $scope.asfcInsidedatadetail = data.queryresult;
    //     console.log($scope.asfcInsidedatadetail);
    // })

    $scope.objPagination = {};
    $scope.objPagination.id = 2;
    $scope.objPagination.maxrow = 500;
    $scope.objPagination.pageno = 1;
    $scope.pages = [1]
    $scope.lastpage = 1;
    $scope.asfcInsidedatadetail = [];
var asfcInsidedatadetailArray = [];
$scope.seeLess = false;
$scope.seeMore = false;
    $scope.seeLessAsfcdata = function() {
        // var id = '2';
        NavigationService.getSportInsidedataByid($scope.objPagination, function(data) {
          $scope.asfcInsidedatadetail=data.queryresult;
          asfcInsidedatadetailArray = _.cloneDeep($scope.asfcInsidedatadetail);
            $scope.lastpage = data.lastpage;
            console.log($scope.lastpage);
            // $scope.objPagination.maxrow = data.maxrow;
            _.each(data.queryresult, function(n) {
                $scope.asfcInsidedatadetail.push(n);
            });

            $scope.seeMore = true;
            $scope.asfcInsidedatadetail = _.slice($scope.asfcInsidedatadetail , [0] , [3]);
            if($scope.asfcInsidedatadetail.length < 3){
              $scope.seeMore = false;
            }
            console.log('$scope.asfcInsidedatadetail',$scope.asfcInsidedatadetail);
        })
    };
      $scope.seeLessAsfcdata();
    $scope.seeMoreAsfcdata = function(){
      $scope.seeLess = true;
      $scope.seeMore = false;
      $scope.asfcInsidedatadetail = asfcInsidedatadetailArray;
    }


    var id = '2';
    NavigationService.getasfcSeasonData(id, function(data) {
        $scope.asfcInsidedata = data.data;
        console.log("testt", $scope.asfcInsidedata);
    })

    $scope.formData = {};
    $scope.formData.enquiryarr = [];
    $scope.showThanks = false;

    $scope.asfcSubmitForm = function(formValid) {
        $scope.formData.enquiry = "";
        if (formValid.$valid && $scope.formData) {
            if ($scope.formData.enquiryarr.length > 0) {
                _.each($scope.formData.enquiryarr, function(n) {
                    $scope.formData.enquiry += n + ",";
                })
                $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
            }
            $scope.formData.category = 16;
            NavigationService.getInTouch($scope.formData, function(data) {
                console.log(data);
                if (data.value != false) {
                    $scope.showThanks = true;
                }
            });
        }
    };

    $scope.pushorpop = function(val) {
        var foundIndex = $scope.formData.enquiryarr.indexOf(val);
        if (foundIndex == -1) {
            $scope.formData.enquiryarr.push(val);
        } else {
            $scope.formData.enquiryarr.splice(foundIndex, 1);
        }
    }
    $scope.matchData = {};
    NavigationService.getMatch(function(data) {
        $scope.matchData = data.data;
        console.log('$scope.matchData=', $scope.matchData);
    })

    $scope.ViewAll = function() {
        console.log('Innnnnnnnnnnnn');
        if ($scope.lastpage > $scope.objPagination.pageno) {
            console.log('lastpageeee: ', $scope.lastpage)
                ++$scope.objPagination.pageno;
            $scope.pages.push($scope.objPagination.pageno);
            console.log('pages:', $scope.pages);
            $scope.asfcdata();
        }
    }
    $scope.mycount = 0;
    $scope.mycountdiv = [];

    var id = '2';
    NavigationService.getasfcSeasonData(id, function(data) {
        $scope.mydata = data.data.playerlist;
        console.log('$scope.mydata', $scope.mydata);
        $scope.asfcInsidedataplayer = _.chunk($scope.mydata, 5);
        $scope.mylen = $scope.asfcInsidedataplayer.length - 1;
        console.log('len', $scope.mylen);
        console.log('$scope.asfcInsidedataplayer', $scope.asfcInsidedataplayer);

    })
    $scope.ViewAllPlayers = function() {
        $scope.mycount = $scope.mycount + 1;
        // $scope.mycountdiv.push($scope.asfcInsidedataplayer);
        // console.log('$scope.mycountdiv',$scope.mycountdiv);
        // console.log('$scope.mycount',$scope.mycount);

    }
})

.controller('AsfcDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("asfcdetail");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.seasonData = "";
    NavigationService.getSeasonData($stateParams.id, function(data) {
        $scope.seasonData = data.data;
        $scope.seasonData.imagegallery = _.chunk($scope.seasonData.imagegallery, 6);
        for (var i = 0; i < $scope.seasonData.imagegallery.length; i++) {
            $scope.seasonData.imagegallery[i] = _.chunk($scope.seasonData.imagegallery[i], 3);
        }
        console.log('$scope.seasonData', $scope.seasonData);
    })
    $scope.makeActive = function(video, index) {
        $scope.seasonData.featuredvideos.splice(index, 1);
        $scope.seasonData.featuredvideos.unshift(video);
    }

})

.controller('JppCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("jpp");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {

            ! function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + "://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));


        }, 1000);
    });

    var id = '1';
    $scope.jppPagination = {};
    $scope.jppPagination.id = 1;
    $scope.jppPagination.pageno = 1;
    $scope.jppPagination.maxrow = 500;
    $scope.lastpage = 1;



    NavigationService.getSportdataByid(id, function(data) {
        $scope.jppdata = data.data;
        console.log($scope.jppdata);
    })
    $scope.jppInsidedata = [];
    $scope.seeMore = false;
    $scope.seeLess = false;
    var jppInsideArray = [];
    $scope.seeLessJpp = function() {
        NavigationService.getSportInsidedataByid($scope.jppPagination, function(data) {
            $scope.jppInsidedata = data.queryresult;
            console.log('$scope.jppInsidedata',$scope.jppInsidedata);
            jppInsideArray = _.cloneDeep($scope.jppInsidedata);
            // console.log($scope.jppInsidedata);
            $scope.lastpage = data.lastpage;
            _.each(data.queryresult, function(n) {
                $scope.jppInsidedata.push(n);
            })

            $scope.seeMore = true;
            $scope.jppInsidedata = _.slice($scope.jppInsidedata, [0], [3]);
            if ($scope.jppInsidedata.length < 3) {
                $scope.seeMore = false;
            }
            console.log('$scope.jppInsidedata', $scope.jppInsidedata);
        })

    }
    $scope.seeLessJpp();
    $scope.seeMoreJpp = function() {
            $scope.seeMore = false;
            $scope.seeLess = true;
            // $scope.allMovieName = {}
            $scope.jppInsidedata = jppInsideArray;
            // console.log('dfgyhujkdrftgh', $scope.allMovieName);
        }
        // $scope.jppfilter();

    $scope.viewAllJpp = function() {
        console.log('Inside viewAllJpp');
        if ($scope.lastpage > $scope.jppPagination.pageno) {
            ++$scope.jppPagination.pageno;
            console.log('pageno', $scope.jppPagination.pageno);
            $scope.jppfilter();
        }
    }


    //
    // $scope.jppdetail = [{
    //     content: "JPP Stadium Branding: (Season 1, 2 & 3)",
    //     img: "img/ASFC/w2.jpg",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }, {
    //     content: "JPP Team Management: Season 1",
    //     img: "img/ASFC/w2.jpg",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }, {
    //     content: "JPP Team Management: Season 2",
    //     img: "img/ASFC/w2.jpg",
    //     detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // }];
    // $scope.wallpaper = [{
    //     img: "img/jpp/w1.jpg",
    // }, {
    //     img: "img/jpp/w2.jpg",
    // }, {
    //     img: "img/jpp/w3.jpg",
    // }, {
    //     img: "img/jpp/w4.jpg",
    // }, {
    //     img: "img/jpp/w5.jpg",
    // }, {
    //     img: "img/jpp/w6.jpg",
    // }];
    // $scope.clientspeak = {
    //     category: "Players Speak",
    //     text: "Awesome teamwork and planning",
    //     name: "Sunil Joshi",
    //     img: "img/movies/ranbir.jpg"
    // };
})

.controller('Jppseason1Ctrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("jppseason");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.wallpaper = [{
        img: "img/jpp/w1.jpg",
    }, {
        img: "img/jpp/w2.jpg",
    }, {
        img: "img/jpp/w3.jpg",
    }, {
        img: "img/jpp/w4.jpg",
    }, {
        img: "img/jpp/w5.jpg",
    }, {
        img: "img/jpp/w6.jpg",
    }, {
        img: "img/jpp/w1.jpg",
    }, {
        img: "img/jpp/w2.jpg",
    }, {
        img: "img/jpp/w3.jpg",
    }, {
        img: "img/jpp/w4.jpg",
    }, {
        img: "img/jpp/w5.jpg",
    }, {
        img: "img/jpp/w6.jpg",
    }];
    $scope.weddings = [{
        img: "img/jppseason1/1.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/jppseason1/2.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
        img: "img/jppseason1/3.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }];
    $scope.videos = [{
        img: "img/blog/video/v.png",
    }, {
        img: "img/blog/video/v.png",
    }, {
        img: "img/blog/video/v.png",
    }, {
        img: "img/blog/video/v.png",
    }, {
        img: "img/blog/video/v.png",
    }, {
        img: "img/blog/video/v.png",
    }];
    $scope.wallpaper = _.chunk($scope.wallpaper, 6);
    for (var i = 0; i < $scope.wallpaper.length; i++) {
        $scope.wallpaper[i] = _.chunk($scope.wallpaper[i], 3);
    }

    $scope.seasonData = "";
    NavigationService.getSeasonData($stateParams.id, function(data) {
        $scope.seasonData = data.data;
        $scope.seasonData.imagegallery = _.chunk($scope.seasonData.imagegallery, 6);
        for (var i = 0; i < $scope.seasonData.imagegallery.length; i++) {
            $scope.seasonData.imagegallery[i] = _.chunk($scope.seasonData.imagegallery[i], 3);
        }
        console.log('$scope.seasonData', $scope.seasonData);
    })
    $scope.makeActive = function(video, index) {
        $scope.seasonData.featuredvideos.splice(index, 1);
        $scope.seasonData.featuredvideos.unshift(video);
    }

})

.controller('DiariesCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("diaries");
    $scope.menutitle = NavigationService.makeactive("Diaries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.diariesfull2 = {
        img: "img/dairies/events.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry simply dummy text of the printing industry printing industry simply dummy text of the printing industry.",
        name: "Events"
    };
    $scope.diariesfull1 = {
        img: "img/dairies/wedding.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry simply dummy text of the printing industry printing industry simply dummy text of the printing industry",
        name: "WEDDINGS"
    };

    NavigationService.getDiaries(function(data) {
        $scope.diaryData = data.data;
        console.log('d data', $scope.diaryData);
        $scope.diaryyear = data.data.years;
        //   $scope.diaryyear=_.chunk($scope.diaryData.years,5);
        // console.log('$scope.diaryyear chunk', $scope.diaryyear[0]);
        // $scope.diaryyear=_.chunk($scope.diaryData.years,$scope.diaryData.years.length);
        $scope.diaryyear1 = _.chunk($scope.diaryyear, 5);
        console.log('$scope.diaryyear chunk', $scope.diaryyear1);
    })


    $scope.diarydata = false;
    $scope.diaryObj = {};
    $scope.diaryObj.pageno = 1;
    $scope.diaryObj.maxrow = 10;

    getDiariesResults();


    function getDiariesResults() {
        NavigationService.getDiaryInsideByPage($scope.diaryObj, function(data) {
            $scope.diarydata = true;
            $scope.DiaryInsideData = data;
            console.log($scope.DiaryInsideData);
        })
    }

    $scope.changeDiary = function(val) {
        $scope.diaryObj.pageno = $scope.diaryObj.pageno + val;
        getDiariesResults();
    }


    // NavigationService.getDiaryInsideByPage(function(data) {
    //     $scope.DiaryInsideData = data.queryresult;
    //     console.log('$scope.DiaryInsideData', $scope.DiaryInsideData);
    // })

    // $scope.pageno = 1;

    // $scope.next = function() {
    //     console.log('$scope.pageno', $scope.pageno);
    //     var i = $scope.pageno++;
    //     // $state.go('diaries', {page: i});
    //     NavigationService.getDiaryInsideByPage(i, function(data) {
    //       console.log(data);
    //         $scope.DiaryInsideData = data.data;
    //         console.log('$scope.DiaryInsideData',$scope.DiaryInsideData);
    //         $scope.currentpg = i;
    //     })
    // }


    //
    // $scope.previous = function() {
    //     console.log('$scope.currentpg of previous:', $scope.currentpg);
    //     if ($scope.currentpg && $scope.currentpg >= 1) {
    //         var i = --$scope.currentpg;
    //         NavigationService.getDiaryInsideByPage(i, function(data) {
    //             $scope.DiaryInsideData = data.data;
    //             console.log('iiiiiiiiiiiiiii', i);
    //         })
    //     }
    // }
    if (!$stateParams.category) {
        // $scope.next();
    }
    // })

    $scope.filterdata = false;
    if ($stateParams.category) {
        $scope.filterObj = {};
        $scope.filterObj.pageno = 1;
        $scope.filterObj.maxrow = 4;
        $scope.filterObj.category = $stateParams.category;
        $scope.filterObj.year = '';
        $scope.filterObj.month = '';
        getFilterResults();
    }

    function getFilterResults() {
      console.log("fff",$scope.filterObj);
      if($scope.filterObj.category==7){
        $scope.filterObj.category = '';
      }
        NavigationService.getFilterDiaries($scope.filterObj, function(data) {
            $scope.filterdata = true;
            $scope.filterDiaries = data;
            console.log($scope.filterDiaries);
        })
    }

    $scope.filteByYear = function(date) {
        $scope.filterObj.year = date.year;
        $scope.filterObj.month = date.month;
        getFilterResults();
    }

    $scope.changePage = function(val) {
        $scope.filterObj.pageno = $scope.filterObj.pageno + val;
        getFilterResults();
    }

})

.controller('SportCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("sport");
        $scope.menutitle = NavigationService.makeactive("Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        $scope.oneAtATime = true;
        $scope.formData = {};
        $scope.formData.enquiryarr = [];
        $scope.showThanks = false;

        // $scope.formData="";

        // $scope.talentSubmitForm = function(formValid, formData) {
        //   if (formValid.$valid && $scope.formData) {
        //     $state.go("talent");
        //
        //   }
        // };
        $scope.subscribe = {};
        $scope.subscribe.email = "";

        $scope.checkEmail = false;
        $scope.subscribeEmail = false;
        $scope.subscribe = function(email) {
            NavigationService.subscribe(email, function(data) {

                // console.log(data);
                if (!data.value) {
                    if ($scope.subscribe.email) {
                        $scope.checkEmail = true;
                        $scope.subscribeEmail = false;
                        $timeout(function() {
                            $state.reload();
                            $timeout(function() {
                                $scope.checkEmail = "";
                                $scope.subscribeEmail = "";
                            }, 2000);
                        }, 3000);
                    }
                } else {
                    $scope.subscribeEmail = true;
                    $scope.checkEmail = false;
                    $timeout(function() {
                        $state.reload();
                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);
                }
                //console.log(email);
                $scope.subscribe.email = "";
            });

            // $scope.subscribeEmail = data;
        };
        $scope.sportdata = "";

        NavigationService.getSportdata(function(data) {
            $scope.sportdata = data.data;
            console.log('$scope.sportdata', $scope.sportdata);
        })





        // $scope.formData.enquiry = "";


        $scope.talentSubmitForm = function(formValid) {
            $scope.formData.enquiry = "";
            if (formValid.$valid && $scope.formData) {
                if ($scope.formData.enquiryarr.length > 0) {
                    _.each($scope.formData.enquiryarr, function(n) {
                        $scope.formData.enquiry += n + ",";
                    })
                    $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
                }
                $scope.formData.category = 3;
                NavigationService.gettourform($scope.formData, function(data) {
                    if (data.value != false) {
                        $scope.showThanks = true;
                        console.log('$scope.formData', $scope.formData);
                    }
                })
            }
            // $scope.formData.enquiryarr={};

        };

        $scope.pushorpop = function(val) {
            var foundIndex = $scope.formData.enquiryarr.indexOf(val);
            if (foundIndex == -1) {
                $scope.formData.enquiryarr.push(val);
            } else {
                $scope.formData.enquiryarr.splice(foundIndex, 1);
            }
        }
        $scope.wedding = [{
            img: "img/sports/asfc.jpg",
            logo: "img/ASFC/asfc.png",
            link: "asfc",
            btn: "Enter"
        }, {
            img: "img/sports/jpp.jpg",
            logo: "img/jpp/jpp-logo.png",
            link: "jpp",
            btn: "Enter"
        }, {
            img: "img/sports/pfh.jpg",
            name: "Playing for Humanity",
            link: "pfh",
            btn: "Enter"

        }, {
            img: "img/sports/sportintative.jpg",
            name: "SPORTS INITIATIVES",
            btn: "Coming Soon"
        }];
    })
    .controller('PfhCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("pfh");
        $scope.menutitle = NavigationService.makeactive("Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        var id = '3';
        NavigationService.getSportInsidedataByid(id, function(data) {
            $scope.pfhInsidedatadetail = data.queryresult;
            console.log($scope.pfhInsidedatadetail);
        })
        NavigationService.getpfhSeasonData(id, function(data) {
            $scope.pfhInsidedata = data.data;
            console.log($scope.pfhInsidedata);
        })

        $scope.formData = {};
        $scope.formData.enquiryarr = [];
        $scope.showThanks = false;

        $scope.pfhSubmitForm = function(formValid) {
            $scope.formData.enquiry = "";
            if (formValid.$valid && $scope.formData) {
                if ($scope.formData.enquiryarr.length > 0) {
                    _.each($scope.formData.enquiryarr, function(n) {
                        $scope.formData.enquiry += n + ",";
                    })
                    $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
                }
                $scope.formData.category = 17;
                NavigationService.getInTouch($scope.formData, function(data) {
                    console.log(data);
                    if (data.value != false) {
                        $scope.showThanks = true;
                    }
                });
            }
        };
        $scope.pushorpop = function(val) {
            var foundIndex = $scope.formData.enquiryarr.indexOf(val);
            if (foundIndex == -1) {
                $scope.formData.enquiryarr.push(val);
            } else {
                $scope.formData.enquiryarr.splice(foundIndex, 1);
            }
        }


        $scope.subscribe = {};
        $scope.subscribe.email = "";
        //
        // $scope.checkemail=function(email){
        //
        // }

        $scope.checkEmail = false;
        $scope.subscribeEmail = false;
        $scope.subscribe = function(email) {
            // if(!email) {
            //     alert("please enter your email");
            // }
            // console.log('Email subscribe: ', email);
            NavigationService.subscribe(email, function(data) {

                // console.log(data);
                if (!data.value) {
                    if ($scope.subscribe.email) {
                        $scope.checkEmail = true;
                        $scope.subscribeEmail = false;
                        $timeout(function() {
                            $state.reload();
                            $timeout(function() {
                                $scope.checkEmail = "";
                                $scope.subscribeEmail = "";
                            }, 2000);
                        }, 3000);
                    }
                } else {
                    $scope.subscribeEmail = true;
                    $scope.checkEmail = false;
                    $timeout(function() {
                        $state.reload();
                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);
                }
                //console.log(email);
                $scope.subscribe.email = "";
            });
        };

    })
    .controller('PfhDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("pfhdetail");
        $scope.menutitle = NavigationService.makeactive("Sports");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.seasonData = "";
        NavigationService.getSeasonData($stateParams.id, function(data) {
            $scope.seasonData = data.data;
            $scope.seasonData.imagegallery = _.chunk($scope.seasonData.imagegallery, 6);
            for (var i = 0; i < $scope.seasonData.imagegallery.length; i++) {
                $scope.seasonData.imagegallery[i] = _.chunk($scope.seasonData.imagegallery[i], 3);
            }
            console.log('$scope.seasonData', $scope.seasonData);
        })
        $scope.makeActive = function(video, index) {
            $scope.seasonData.featuredvideos.splice(index, 1);
            $scope.seasonData.featuredvideos.unshift(video);
        }

    })
    .controller('MehendiCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mehendi");
        $scope.menutitle = NavigationService.makeactive("Mehendi & Sangeet");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.wallpaper = [{
            img: "img/mehendi/w1.jpg",
        }, {
            img: "img/mehendi/w2.jpg",
        }, {
            img: "img/mehendi/w3.jpg",
        }, {
            img: "img/mehendi/w4.jpg",
        }, {
            img: "img/mehendi/w5.jpg",
        }, {
            img: "img/mehendi/w6.jpg",
        }, {
            img: "img/mehendi/w1.jpg",
        }, {
            img: "img/mehendi/w2.jpg",
        }, {
            img: "img/mehendi/w3.jpg",
        }, {
            img: "img/mehendi/w4.jpg",
        }, {
            img: "img/mehendi/w5.jpg",
        }, {
            img: "img/mehendi/w6.jpg",
        }];
        $scope.videos = [{
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }];
        $scope.video = [{
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }, {
            img: "img/mehendi/w12.jpg",
        }];
        $scope.wallpapers = [{
            img: "img/mehendi/w1.jpg",
        }, {
            img: "img/mehendi/w1.jpg",
        }, {
            img: "img/mehendi/w2.jpg",
        }, {
            img: "img/mehendi/w2.jpg",
        }, {
            img: "img/mehendi/w3.jpg",
        }, {
            img: "img/mehendi/w3.jpg",
        }, {
            img: "img/mehendi/w4.jpg",
        }, {
            img: "img/mehendi/w4.jpg",
        }, {
            img: "img/mehendi/w5.jpg",
        }, {
            img: "img/mehendi/w5.jpg",
        }, {
            img: "img/mehendi/w6.jpg",
        }, {
            img: "img/mehendi/w6.jpg",
        }];
        $scope.weddings = [{
            img: "img/mehendi/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mehendi/2.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mehendi/3.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }];

        $scope.wallpaper = _.chunk($scope.wallpaper, 6);
        for (var i = 0; i < $scope.wallpaper.length; i++) {
            $scope.wallpaper[i] = _.chunk($scope.wallpaper[i], 3);
        }
        $scope.wallpapers = _.chunk($scope.wallpapers, 6);
        for (var i = 0; i < $scope.wallpapers.length; i++) {
            $scope.wallpapers[i] = _.chunk($scope.wallpapers[i], 3);
        }

        $scope.doActive = function(param) {
            if (param === 1) {
                $scope.styleActive = "vactive";
                $scope.styleNoActive = "";
                $scope.vid = $scope.video;
            } else {
                $scope.styleActive = "";
                $scope.styleNoActive = "vactive";
                $scope.vid = $scope.videos;
            }
        }
        $scope.doActive(1);
        $scope.doActives = function(params) {
            if (params === 1) {
                console.log($scope.wallpapers);
                $scope.styleActives = "actives";
                $scope.styleNoActives = "";
                $scope.wall = $scope.wallpapers;
            } else {
                console.log($scope.wallpaper);

                $scope.styleActives = "";
                $scope.styleNoActives = "actives";
                $scope.wall = $scope.wallpaper;
            }
        }
        $scope.doActives(1);

    })
    .controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $interval) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("contact");
        $scope.menutitle = NavigationService.makeactive("Contact US");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.active1 = true;
        $scope.active2 = false;
        $scope.showNext = false;
        $scope.showThanks = false;

        $scope.Dates = [{}, {}, {}];

        $scope.project = {};

        $scope.general = {};

        $scope.project1 = [
            [{
                answer: "REDESIGN OF EXISTING WEB APPLICATION / WEBSITE",
                state: false
            }, {
                answer: "NEW WEB APPLICATION / WEBSITE",
                state: false
            }, {
                answer: "OTHER",
                state: false
            }],
            [{
                answer: "£20-50K",
                state: false
            }, {
                answer: "£50-£100K",
                state: false
            }, {
                answer: "£100K+",
                state: false
            }],
            [{
                answer: "LESS THAN 3 MONTHS",
                state: false
            }, {
                answer: "LESS THAN 6 MONTHS",
                state: false
            }, {
                answer: "PROJECT WOULD BE ONGOING",
                state: false
            }, {
                answer: "TIMESCALES ARE NOT IMPORTANT TO ME, IT’S QUALITY THAT COUNTS",
                state: false
            }],
        ];

        var directionsService = {};
        var directionsDisplay = {};



        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

                initMap = function() {
                    directionsService = new google.maps.DirectionsService;
                    directionsDisplay = new google.maps.DirectionsRenderer;
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 20,
                        center: {
                            lat: 19.0854772,
                            lng: 72.8365032
                        },
                        scrollwheel: false,


                    });
                    directionsDisplay.setMap(map);

                    var onChangeHandler = function() {
                        calculateAndDisplayRoute();
                    };
                }



                /// MAX til here
                $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAc75yahObocBDF_deZ7T6_rUkS8LS4t00&callback=initMap", function(data, textStatus, jqxhr) {
                    console.log(data); // Data returned
                    console.log(textStatus); // Success
                    console.log(jqxhr.status); // 200
                    console.log("Load was performed.");
                });


            }, 1000);


        });




        calculateAndDisplayRoute = function(value) {
            directionsService.route({
                origin: value,
                destination: "Bhagtani Krishang,Dattatray Road, Santacruz (W),Mumbai , India",
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        $scope.place = {
            location: ""
        };

        $scope.sendToGoogle = function(value) {
            window.open("https://maps.google.com?saddr=" + value + "&daddr=Bhagtani Krishang,Dattatray Road, Santacruz (W),Mumbai , India", "_new");
        };

        $scope.getDirFrom = function(value) {
            calculateAndDisplayRoute(value);
        };

        $interval(function() {


            $scope.Dates[0] = {
                top: moment().tz('Asia/Kolkata').format("MMMM D,dddd"),
                bottom: moment().tz('Asia/Kolkata').format("hh:mm:ss a")
            };
            $scope.Dates[1] = {
                top: moment().tz('America/New_York').format("MMMM D,dddd"),
                bottom: moment().tz('America/New_York').format("hh:mm:ss a")
            };
            $scope.Dates[2] = {
                top: moment().tz('Asia/Dubai').format("MMMM D,dddd"),
                bottom: moment().tz('Asia/Dubai').format("hh:mm:ss a")
            };
        }, 1000);

        $scope.projectSubmit = function() {
            _.each($scope.project1, function(questions, key) {
                if (key == 0) {
                    $scope.project.question1ans = _.map(_.filter(questions, "state"), "answer").join(",");
                } else if (key == 1) {
                    $scope.project.question2ans = _.map(_.filter(questions, "state"), "answer").join(",");
                } else if (key == 2) {
                    $scope.project.question3ans = _.map(_.filter(questions, "state"), "answer").join(",");
                }
            });

            NavigationService.projectSubmit($scope.project, function(data) {
                console.log(data);
            });
        };
        $scope.generalSubmit = function() {
            NavigationService.generalSubmit($scope.general, function(data) {
                console.log(data);
            });
        };

    })

.controller('BlogTextCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogtext");
    $scope.menutitle = NavigationService.makeactive("Blog-Text");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    var modalInstance1 = '';
    $scope.socialLoginmodal = function() {
        modalInstance1 = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/content/modal/sociallogin.html',
            controller: 'BlogTextCtrl'
        });
    };

    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
            stButtons.makeButtons();
            console.log("Changes");
        }, 1000);
        console.log("Changes2");
    });

    $scope.getBlog = function() {

        NavigationService.getblogText($stateParams.id, function(data) {
            $scope.blogTextData = data.data;
            $scope.mydate = new Date(data.data.description.timestamp);
            console.log($scope.mydate);
            console.log('$scope.blogTextData', $scope.blogTextData);
        })
    }

    // body...
    $scope.notLogedin = [];
    console.log("here");
    NavigationService.getblogComment(function(data) {
        if (data.value == false) {
            $scope.notLogedin = true;
        } else {
            console.log('hereeeeeeee');
            $scope.blogCommentData = data;
            console.log('$scope.blogCommentData', $scope.blogCommentData);
        }

    })
    $scope.getBlog();
    $scope.blogCData = {};
    $scope.commentSubmit = function(data) {
        if ($scope.notLogedin == true) {
            $timeout(function() {
                modalInstance1.dismiss();
                $state.reload();
            }, 2500);
            $scope.socialLoginmodal();
        } else {
            $scope.blogCData.diaryarticle = $scope.blogTextData.description.id;
            $scope.blogCData.userid = $scope.blogCommentData.id;
            $scope.blogCData.image = $scope.blogCommentData.image;
            $scope.blogCData.name = $scope.blogCommentData.name;
            $scope.blogCData.comment = $scope.blogCommentData.comment;
            NavigationService.getcommentSubmit($scope.blogCData, function(data) {
                $scope.blogCommentData = data;
                console.log('$scope.CommentDatasubmit', $scope.blogCData);
                // $state.reload();
                $scope.getBlog();
            })
        }


    }

    // --------------releted article read more-----------------
    $scope.reletedArticleData = false;
    $scope.readMore = function(article) {
        console.log(article);
        if (article.type == "1") {
            $state.go("blogtext", {
                "id": article.id
            });
        } else if (article.type == "2") {
            $state.go("blogimage", {
                "id": article.id
            });
        } else if (article.type == "3") {
            $state.go("blogvideo", {
                "id": article.id
            });
        }
        NavigationService.getblogText(article.id, function(data) {
            $scope.reletedArticleData = true;
            $scope.reletedArticle = data.data.relatedarticles;
            console.log('$scope.reletedArticle', $scope.reletedArticle);
        })
    }

    // ---------------------end of releted article read more-----------









    NavigationService.getDiaries(function(data) {
        $scope.diaryData = data.data;
        console.log('$scope.diaryData', $scope.diaryData);
    })
    $scope.pageno = 1;

    $scope.next = function() {
        console.log('$scope.pageno', $scope.pageno);
        var i = $scope.pageno++;
        // $state.go('diaries', {page: i});
        NavigationService.getDiaryInsideByPage(i, function(data) {
            $scope.DiaryInsideData = data.data;
            $scope.currentpg = i;
        })
    }

    //
    $scope.previous = function() {
        console.log('$scope.currentpg of previous:', $scope.currentpg);
        if ($scope.currentpg && $scope.currentpg >= 1) {
            var i = --$scope.currentpg;
            NavigationService.getDiaryInsideByPage(i, function(data) {
                $scope.DiaryInsideData = data.data;
                console.log('iiiiiiiiiiiiiii', i);
            })
        }
    }
    if (!$stateParams.category) {
        $scope.next();
    }
    // })

    $scope.filterdata = false;
    if ($stateParams.category) {
        $scope.filterObj = {};
        $scope.filterObj.pageno = 1;
        $scope.filterObj.maxrow = 4;
        $scope.filterObj.category = $stateParams.category;
        $scope.filterObj.year = '';
        $scope.filterObj.month = '';
        getFilterResults();
    }

    function getFilterResults() {
        NavigationService.getFilterDiaries($scope.filterObj, function(data) {
            $scope.filterdata = true;
            $scope.filterDiaries = data;
            console.log($scope.filterDiaries);
        })
    }

    $scope.filteByYear = function(date) {
        $scope.filterObj.year = date.year;
        $scope.filterObj.month = date.month;
        getFilterResults();
    }

    $scope.changePage = function(val) {
        $scope.filterObj.pageno = $scope.filterObj.pageno + val;
        getFilterResults();
    }

    $scope.socialLogin = function(which) {
        var ref = window.open(hauth + which);
        var authinterval = setInterval(function() {
            NavigationService.getblogComment(function(data) {
                console.log(data);
                if (data.value != false) {
                    ref.close();
                    $state.reload();
                    clearInterval(authinterval);
                }
            })
        }, 1000);
    }


    // $scope.socialLoginmodal = function() {
    //     $uibModal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'views/content/modal/sociallogin.html',
    //         controller: 'BlogTextCtrl',
    //         //  resolve: {
    //         //    items: function () {
    //         //      return $scope.items;
    //         //    }
    //         //  }
    //     });
    // }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

})

.controller('BlogImageCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal) {

        //Used to name the .html file
        $scope.template = TemplateService.changecontent("blogimage");
        $scope.menutitle = NavigationService.makeactive("Blog-Image");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.blogimage = [{
            img: "img/blog/image/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/blog/image/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/blog/image/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }];
        $scope.commentlist = [{
            img: "img/blog/text/p2.png",
            name: "Sohan Honekari",
            time: "27 minutes",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
        }, {
            img: "img/blog/text/p2.png",
            name: "Raj Shah",
            time: "2 hours",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
        }, {
            img: "img/blog/text/p2.png",
            name: "Raj Shah",
            time: "2 hours",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
        }, {
            img: "img/blog/text/p2.png",
            name: "Raj Shah",
            time: "2 hours",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
        }];
        $scope.images = [{
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }, {
            img: "img/blog/image/i1.png",
        }];
        var modalInstance1 = '';
        $scope.socialLoginmodal = function() {
            modalInstance1 = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/modal/sociallogin.html',
                controller: 'BlogTextCtrl',
                //  resolve: {
                //    items: function () {
                //      return $scope.items;
                //    }
                //  }
            });
        }

        $scope.activeImage = 0;
        // NavigationService.getblogText($stateParams.id, function(data) {
        //     $scope.blogImageData = data.data;
        //     $scope.mydate = new Date(data.data.description.timestamp);
        //     console.log($scope.mydate);
        //     console.log('$scope.blogTextData', $scope.blogTextData);
        //     $scope.bigImage = $scope.blogImageData.image[$scope.activeImage];
        //     console.log('$scope.bigImage',$scope.bigImage);
        // })
        // NavigationService.getblogComment(function(data) {
        //     console.log('hereeeeeeee');
        //     $scope.blogCommentData = data;
        //     console.log('$scope.blogCommentData', $scope.blogCommentData);
        // })

        // --------------releted article read more-----------------
        $scope.reletedArticleData = false;
        $scope.readMore = function(article) {
                console.log(article);
                if (article.type == "1") {
                    $state.go("blogtext", {
                        "id": article.id
                    });
                } else if (article.type == "2") {
                    $state.go("blogimage", {
                        "id": article.id
                    });
                } else if (article.type == "3") {
                    $state.go("blogvideo", {
                        "id": article.id
                    });
                }
                NavigationService.getblogText(article.id, function(data) {
                    $scope.reletedArticleData = true;
                    $scope.reletedArticle = data.data.relatedarticles;
                    console.log('$scope.reletedArticle', $scope.reletedArticle);
                })
            }
            // ---------------------end of releted article read more-----------

        NavigationService.getDiaries(function(data) {
            $scope.diaryData = data.data;
            console.log('$scope.diaryData', $scope.diaryData);
        })

        $scope.nextImage = function() {
            $scope.bigImage = $scope.blogImageData.image[++$scope.activeImage];
            $scope.lastrecord = _.last($scope.blogImageData.image);
            console.log('$scope.lastrecord', $scope.lastrecord);
            console.log('$scope.bigImage', $scope.bigImage);
        }
        $scope.previousImage = function() {
            $scope.bigImage = $scope.blogImageData.image[--$scope.activeImage];
            //   $scope.firstrecord= _.head($scope.blogImageData.image);
            // console.log('$scope.firstrecord',$scope.firstrecord);
            // console.log('$scope.bigImage',$scope.bigImage);
        }

        // ---------------blog Comment----------------------------------
        $scope.getBlog = function() {
            NavigationService.getblogText($stateParams.id, function(data) {
                $scope.blogImageData = data.data;
                $scope.mydate = new Date(data.data.description.timestamp);
                console.log($scope.mydate);
                console.log('$scope.blogTextData', $scope.blogTextData);
                $scope.bigImage = $scope.blogImageData.image[$scope.activeImage];
                console.log('$scope.bigImage', $scope.bigImage);
            })
        }

        // body...
        console.log("here");
        NavigationService.getblogComment(function(data) {
            if (data.value == false) {
                $scope.notLogedin = true;
            } else {
                console.log('hereeeeeeee');
                $scope.blogCommentData = data;
                console.log('$scope.blogCommentData', $scope.blogCommentData);
            }
        })
        $scope.getBlog();
        $scope.blogCData = {};
        $scope.commentSubmit = function(data) {
            if ($scope.notLogedin == true) {
                $timeout(function() {
                    modalInstance1.dismiss();
                    $state.reload();
                }, 2500);
                $scope.socialLoginmodal();
            } else {
                $scope.blogCData.diaryarticle = $scope.blogImageData.description.id;
                $scope.blogCData.userid = $scope.blogCommentData.id;
                $scope.blogCData.image = $scope.blogCommentData.image;
                $scope.blogCData.name = $scope.blogCommentData.name;
                $scope.blogCData.comment = $scope.blogCommentData.comment;
                NavigationService.getcommentSubmit($scope.blogCData, function(data) {
                    $scope.blogCommentData = data;
                    console.log('$scope.CommentDatasubmit', $scope.blogCData);
                    // $state.reload();
                    $scope.getBlog();

                })
            }
        }

        $scope.socialLogin = function(which) {
                var ref = window.open(hauth + which);
                var authinterval = setInterval(function() {
                    NavigationService.getblogComment(function(data) {
                        console.log(data);
                        if (data.value != false) {
                            ref.close();
                            $state.reload();
                            clearInterval(authinterval);
                        }
                    })
                }, 1000);
            }
            // ------------------------------------------------

    })
    .controller('BlogVideoCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("blogvideo");
        $scope.menutitle = NavigationService.makeactive("Blog-Video");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        var modalInstance2 = '';
        $scope.socialLoginmodal = function() {
            modalInstance2 = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/content/modal/sociallogin.html',
                controller: 'BlogTextCtrl',
                //  resolve: {
                //    items: function () {
                //      return $scope.items;
                //    }
                //  }
            });
        }
        $scope.blogvideo = [{
            img: "img/blog/video/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/blog/video/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/blog/video/1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }];
        $scope.commentlist = [{
            img: "img/blog/text/p2.png",
            name: "Sohan Honekari",
            time: "27 minutes",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
        }, {
            img: "img/blog/text/p2.png",
            name: "Raj Shah",
            time: "2 hours",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
        }, {
            img: "img/blog/text/p2.png",
            name: "Raj Shah",
            time: "2 hours",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
        }, {
            img: "img/blog/text/p2.png",
            name: "Raj Shah",
            time: "2 hours",
            desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
        }];
        $scope.images = [{
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }, {
            img: "img/blog/video/v1.png",
        }];
        // NavigationService.getblogText($stateParams.id, function(data) {
        //     $scope.blogVideoData = data.data;
        //     $scope.mydate = new Date(data.data.description.timestamp);
        //     console.log($scope.mydate);
        //     console.log('$scope.blogTextData', $scope.blogVideoData.video);
        // })
        // NavigationService.getblogComment(function(data) {
        //     console.log('hereeeeeeee');
        //     $scope.blogCommentData = data;
        //     console.log('$scope.blogCommentData', $scope.blogCommentData);
        // })

        // --------------releted article read more-----------------
        $scope.reletedArticleData = false;
        $scope.readMore = function(article) {
                console.log(article);
                if (article.type == "1") {
                    $state.go("blogtext", {
                        "id": article.id
                    });
                } else if (article.type == "2") {
                    $state.go("blogimage", {
                        "id": article.id
                    });
                } else if (article.type == "3") {
                    $state.go("blogvideo", {
                        "id": article.id
                    });
                }
                NavigationService.getblogText(article.id, function(data) {
                    $scope.reletedArticleData = true;
                    $scope.reletedArticle = data.data.relatedarticles;
                    console.log('$scope.reletedArticle', $scope.reletedArticle);
                })
            }
            // ---------------------end of releted article read more-----------

        NavigationService.getDiaries(function(data) {
            $scope.diaryData = data.data;
            console.log('$scope.diaryData', $scope.diaryData);
        })

        $scope.makeActive = function(video, index) {
            $scope.activeVideo = index;

            $scope.blogVideoData.video.splice(index, 1);
            $scope.blogVideoData.video.unshift(video);
            console.log('$scope.dummydata', $scope.dummydata);
            $scope.bigVideo = $scope.blogVideoData.video[0];
            console.log('$scope.bigVideo111111111111111', $scope.bigVideo);
            // $scope.dummydata=$scope.blogVideoData.video.unshift(video);
        }

        // $scope.pushimage=function(index){
        //   console.log('index',index);
        //   NavigationService.getblogText($stateParams.id, function(data) {
        //       $scope.blogVideoData = data.data.video;
        //       console.log('$scope.blogVideoDatakkkkkkkkkkkk',$scope.blogVideoData);
        //       $scope.blogVideoData.splice(0, 1,index);
        //       console.log('$scope.blogVideoDataafterrrrrrrrrr',$scope.blogVideoData);
        //         })
        // }
        // ---------------blog Comment----------------------------------
        $scope.getBlog = function() {
            NavigationService.getblogText($stateParams.id, function(data) {
                $scope.blogVideoData = data.data;
                $scope.mydate = new Date(data.data.description.timestamp);
                console.log($scope.mydate);
                console.log('$scope.blogVideoData', $scope.blogVideoData);
                $scope.bigVideo = $scope.blogVideoData.video[$scope.activeVideo];
                console.log('$scope.bigVideo', $scope.bigVideo);
            })
        }

        // body...
        console.log("here");
        NavigationService.getblogComment(function(data) {
            if (data.value == false) {
                $scope.notLogedin = true;
            } else {
                console.log('hereeeeeeee');
                $scope.blogCommentData = data;
                console.log('$scope.blogCommentData', $scope.blogCommentData);
            }
        })
        $scope.getBlog();
        $scope.blogCData = {};
        $scope.commentSubmit = function(data) {
            if ($scope.notLogedin == true) {
                $timeout(function() {
                    modalInstance2.dismiss();
                    $state.reload();
                }, 2500);
                $scope.socialLoginmodal();
            } else {
                $scope.blogCData.diaryarticle = $scope.blogVideoData.description.id;
                $scope.blogCData.userid = $scope.blogCommentData.id;
                $scope.blogCData.image = $scope.blogCommentData.image;
                $scope.blogCData.name = $scope.blogCommentData.name;
                $scope.blogCData.comment = $scope.blogCommentData.comment;
                NavigationService.getcommentSubmit($scope.blogCData, function(data) {
                    $scope.blogCommentData = data;
                    console.log('$scope.CommentDatasubmit', $scope.blogCData);
                    // $state.reload();
                    $scope.getBlog();
                })
            }
        }

        $scope.socialLogin = function(which) {
                var ref = window.open(hauth + which);
                var authinterval = setInterval(function() {
                    NavigationService.getblogComment(function(data) {
                        console.log(data);
                        if (data.value != false) {
                            ref.close();
                            $state.reload();
                            clearInterval(authinterval);
                        }
                    })
                }, 1000);
            }
            // ------------------------------------------------

        $scope.activeVideo = 0;
        $scope.nextVideo = function() {
            $scope.bigVideo = $scope.blogVideoData.video[++$scope.activeVideo];
            $scope.lastrecord = _.last($scope.blogVideoData.video);
            console.log('$scope.lastrecord', $scope.lastrecord);
            console.log('$scope.bigVideo', $scope.bigVideo);
        }
        $scope.previousVideo = function() {
            $scope.bigVideo = $scope.blogVideoData.video[--$scope.activeVideo];
            //   $scope.firstrecord= _.head($scope.blogImageData.image);
            // console.log('$scope.firstrecord',$scope.firstrecord);
            // console.log('$scope.bigImage',$scope.bigImage);
        }

    })
    .controller('CareerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("career");
        $scope.menutitle = NavigationService.makeactive("Careers");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getCareer(function(data) {
            $scope.careerdata = data.data;
            console.log('$scope.careerdata', $scope.careerdata);
        })
    })
    .controller('CareerFormCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("careerform");
        $scope.menutitle = NavigationService.makeactive("Job Application");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.jobTitle = ['EXECUTIVE PRODUCER', 'PRODUCTION ADS', 'EVENTS MANAGERS', 'GRAPHIC DESIGN', 'ASSISTANT MANAGER - MICE TRAVEL', '3D MODELER / VISUALISER'];
        $scope.formData = {};
        $scope.formData.typearr = [];
        $scope.carrierSubmit = function(formValid) {
            console.log(formValid);
            console.log('in function');
            $scope.formData.type = "";
            if (formValid.$valid) {
                console.log('in valid');



                if ($scope.formData.typearr.length > 0) {
                    _.each($scope.formData.typearr, function(n) {
                        $scope.formData.type += n + ",";
                    })
                    $scope.formData.type = $scope.formData.type.substring(0, $scope.formData.type.length - 1);
                }
                NavigationService.getCareerForm($scope.formData, function(data) {
                    if (data.value != false) {
                        $scope.showThanks = true;
                        console.log('$scope.formData', $scope.formData);
                    }
                })
            }
        };
        //   $scope.changeit = function(data) {
        //   console.log(data);
        //   $scope.formData.resume = data.data[0];
        // }
        $scope.pushorpop = function(val) {
            var foundIndex = $scope.formData.typearr.indexOf(val);
            if (foundIndex == -1) {
                $scope.formData.typearr.push(val);
            } else {
                $scope.formData.typearr.splice(foundIndex, 1);
            }
        }


    })
    .controller('MiceCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mice");
        $scope.menutitle = NavigationService.makeactive("Mice");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        $scope.formData = {};
        $scope.oneAtATime = true;
        $scope.formData.enquiryarr = [];
        $scope.showThanks = false;
        $scope.eoptions = {};

        $scope.soptions = {
            minDate: new Date()
        }

        $scope.changeEOptions = function() {
            $scope.eoptions = {
                minDate: new Date($scope.formData.date)
            }
        }



        $scope.micedata = "";
        NavigationService.getMice(function(data) {
            console.log(data);
            $scope.micedata = data.data;
            console.log($scope.micedata);



            $scope.miceSubmitForm = function(formValid) {
                $scope.formData.enquiry = "";
                if (formValid.$valid && $scope.formData) {
                    if ($scope.formData.enquiryarr.length > 0) {
                        _.each($scope.formData.enquiryarr, function(n) {
                            $scope.formData.enquiry += n + ",";
                        })
                        $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
                    }
                    $scope.formData.category = 6;
                    if ($scope.formData.date) {
                        var formatdate = $scope.formData.date.getFullYear();
                        formatdate += "/" + $scope.formData.date.getMonth();
                        formatdate += "/" + $scope.formData.date.getDate();
                        $scope.formData.date = formatdate;
                    }
                    if ($scope.formData.enddate) {
                        var formatdate = $scope.formData.enddate.getFullYear();
                        formatdate += "/" + $scope.formData.enddate.getMonth();
                        formatdate += "/" + $scope.formData.enddate.getDate();
                        $scope.formData.enddate = formatdate;
                    }
                    NavigationService.gettourform($scope.formData, function(data) {
                        if (data.value != false) {
                            $scope.showThanks = true;
                            console.log('$scope.formData', $scope.formData);
                        }
                    })
                }
                // $scope.formData.enquiryarr={};

            };

            $scope.pushorpop = function(val) {
                var foundIndex = $scope.formData.enquiryarr.indexOf(val);
                if (foundIndex == -1) {
                    $scope.formData.enquiryarr.push(val);
                } else {
                    $scope.formData.enquiryarr.splice(foundIndex, 1);
                }
            }
        })

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        };
    })
    .controller('MiceInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("miceinside");
        $scope.menutitle = NavigationService.makeactive("Mices");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        NavigationService.getMiceInsideBanner($stateParams.id, function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.miceBanner = data.data;
                $scope.miceName = data.data.name;
                console.log("banner", $scope.miceBanner);
            }
        });
        $scope.pagedata = {};
        $scope.pagedata.pageno = 1;
        $scope.pagedata.maxrow = 500;
          $scope.lastpage = 1;
        $scope.pagedata.id = $stateParams.id;
        var lastpage = 1;
var miceSubtypeArray = [];
        $scope.miceSubtype = [];
        $scope.seeMore = false;
        $scope.seeLess = false;
        $scope.seeLessMiceSubtype = function() {
            NavigationService.getMiceInside($scope.pagedata, function(data) {
              $scope.miceSubtype = data.queryresult;
              console.log('$scope.miceSubtype',$scope.miceSubtype);
              if ($scope.miceSubtype.length < 3) {
                  $scope.seeMore = false;
              }else{
                    $scope.seeMore = true;
              }
              console.log('$scope.miceSubtype',$scope.miceSubtype);
              miceSubtypeArray = _.cloneDeep($scope.miceSubtype);
                lastpage = data.lastpage;
                // if (data.queryresult.length > 0) {
                    _.each(data.queryresult, function(n) {
                        $scope.miceSubtype.push(n);
                    })
                    // $scope.shouldscroll = false;
                // } else {
                //     $scope.shouldscroll = true;
                // }

                $scope.miceSubtype = _.slice($scope.miceSubtype, [0], [3]);


            })
        };
        $scope.seeLessMiceSubtype();
        $scope.seeMoreMiceSubtype = function() {
                $scope.seeMore = false;
                $scope.seeLess = true;
                // $scope.allMovieName = {}
                $scope.miceSubtype = miceSubtypeArray;
                // console.log('dfgyhujkdrftgh', $scope.allMovieName);
            }

        // $scope.addMoreItems = function() {
        //     // console.log("addMoreItems");
        //     if (lastpage > $scope.pagedata.pageno) {
        //         $scope.pagedata.pageno++;
        //         $scope.shouldscroll = true;
        //         $scope.getMiceSubtype();
        //     } else {
        //         $scope.shouldscroll = true;
        //     }
        // }

        // $scope.addMoreItems();

    })
    .controller('MiceInsideDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("micedetail");
        $scope.menutitle = NavigationService.makeactive("Mices");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.micedetail = {};
        NavigationService.getMiceInsideDetails($stateParams.id, function(data) {
            console.log(data);
            $scope.micedetail = data.data;
            console.log("$scope.micedetail", $scope.micedetail);
            if ($scope.micedetail.imagegallery && $scope.micedetail.imagegallery.length > 0) {
                $scope.micedetail.imagegallery = _.chunk($scope.micedetail.imagegallery, 6);
                for (var i = 0; i < $scope.micedetail.imagegallery.length; i++) {
                    $scope.micedetail.imagegallery[i] = _.chunk($scope.micedetail.imagegallery[i], 3);
                }
                // $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 3);
            }
        })
        $scope.makeActive = function(video, index) {
            $scope.micedetail.featuredvideos.splice(index, 1);
            $scope.micedetail.featuredvideos.unshift(video);
        }

    })
    .controller('MediaCornerCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("mediacorner");
        $scope.menutitle = NavigationService.makeactive("Media Corner");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.mediadata = "";
        NavigationService.getMediacorner(function(data) {
            $scope.mediadataContent = data.data.description;
            console.log($scope.mediadataContent);
        })

        $scope.categoryid = $stateParams.id;
        $scope.pagenumber = 1;
        var lastpage = 1;
        $scope.objfilter = {};
        $scope.objfilter.year = $stateParams.year;
        $scope.objfilter.pageno = 1;
        $scope.objfilter.maxrow = 500;
        $scope.pages = [1]
        $scope.mediadatadetail = [];
        // $scope.objfilter.subcat = '';

        var mediaArray = [];
        $scope.seeMore = false;
        $scope.seeLess = false;
        $scope.seeLessMediayear = function() {
            NavigationService.getMediaByYear($scope.objfilter, function(data) {
                // $scope.mediadatadetail = data.queryresult;
                console.log('medData: ', $scope.mediadatadetail);
                console.log('total: ', data.totalvalues);
                NavigationService.getMediacorner(function(data) {
                    console.log("dsfasdfasdf");
                    $scope.mediadata = data.data.years;
                    $scope.mediadata[0].class = "cat-active";
                    if ($scope.objfilter.year != 0) {
                        _.each($scope.mediadata, function(n) {
                            if (n.year == $scope.objfilter.year)
                                n.class = "cat-active";
                            else
                                n.class = "";
                        });
                    }
                });

                console.log('lastpage:', data.lastpage);
                lastpage = data.lastpage;
                _.each(data.queryresult, function(n) {
                    $scope.mediadatadetail.push(n);

                });
                mediaArray = _.cloneDeep($scope.mediadatadetail);
                $scope.seeMore = true;
                $scope.mediadatadetail = _.slice($scope.mediadatadetail, [0], [3]);
                if ($scope.mediadatadetail.length < 3) {
                    $scope.seeMore = false;
                }
            });
        };
        $scope.seeLessMediayear();
$scope.seeMoreMediayear = function(){
  $scope.seeMore = false;
  $scope.seeLess = true;
  // $scope.allMovieName = {}
  $scope.mediadatadetail = mediaArray;
}
        // console.log('lastpage: ', lastpage);
        // $scope.loadMore = function() {
        //     console.log('///////');
        //     if (lastpage > $scope.objfilter.pageno) {
        //         console.log('lastpageeee: ', lastpage)
        //             ++$scope.objfilter.pageno;
        //         $scope.pages.push($scope.objfilter.pageno);
        //         console.log('pages:', $scope.pages);
        //         $scope.getMediayear();
        //     }
        // };






        $scope.weddings = [{
            img: "img/mediacorner/1.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/2.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/3.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/1.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/2.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/3.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/1.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/mediacorner/2.png",
            date: "May 18th, 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }];

    })
    .controller('EventCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("event");
        $scope.menutitle = NavigationService.makeactive("Events");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        $scope.oneAtATime = true;
        NavigationService.getEventData(function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.eventData = data.data;
                console.log($scope.eventData);
            }
        });





        $scope.formData = {};
        $scope.formData.enquiryarr = [];
        $scope.showThanks = false;
        $scope.eoptions = {};

        $scope.soptions = {
            minDate: new Date()
        }

        $scope.changeEOptions = function() {
            $scope.eoptions = {
                minDate: new Date($scope.formData.date)
            }
        }

        $scope.eventSubmitForm = function(formValid) {
            $scope.formData.enquiry = "";
            if (formValid.$valid && $scope.formData) {
                if ($scope.formData.enquiryarr.length > 0) {
                    _.each($scope.formData.enquiryarr, function(n) {
                        $scope.formData.enquiry += n + ",";
                    })
                    $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
                }
                $scope.formData.category = 4;
                if ($scope.formData.date) {
                    var formatdate = $scope.formData.date.getFullYear();
                    formatdate += "/" + $scope.formData.date.getMonth();
                    formatdate += "/" + $scope.formData.date.getDate();
                    $scope.formData.date = formatdate;
                }
                if ($scope.formData.enddate) {
                    var formatdate = $scope.formData.enddate.getFullYear();
                    formatdate += "/" + $scope.formData.enddate.getMonth();
                    formatdate += "/" + $scope.formData.enddate.getDate();
                    $scope.formData.enddate = formatdate;
                }
                NavigationService.gettourform($scope.formData, function(data) {
                    if (data.value != false) {
                        $scope.showThanks = true;
                        console.log('$scope.formData', $scope.formData);
                    }
                })
            }
            // $scope.formData.enquiryarr={};

        };

        $scope.pushorpop = function(val) {
            var foundIndex = $scope.formData.enquiryarr.indexOf(val);
            if (foundIndex == -1) {
                $scope.formData.enquiryarr.push(val);
            } else {
                $scope.formData.enquiryarr.splice(foundIndex, 1);
            }
        }


        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        };


    })
    .controller('EventInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("eventinside");
        $scope.menutitle = NavigationService.makeactive("Events");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        NavigationService.getEventInsideBanner($stateParams.id, function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.eventBanner = data.data;
                $scope.eventName = data.data.name;
                console.log("banner", $scope.eventBanner);
            }
        });
        $scope.pagedata = {};
        $scope.pagedata.pageno = 0;
        $scope.pagedata.id = $stateParams.id;
        var lastpage = 1;

        $scope.eventSubtype = [];

        $scope.getEventSubtype = function() {
            NavigationService.getEventInside($scope.pagedata, function(data) {
                lastpage = data.lastpage;
                if (data.queryresult.length > 0) {
                    _.each(data.queryresult, function(n) {
                        $scope.eventSubtype.push(n);
                    })
                    $scope.shouldscroll = false;
                } else {
                    $scope.shouldscroll = true;
                }
                console.log($scope.eventSubtype);
            })
        }

        $scope.addMoreItems = function() {
            // console.log("addMoreItems");
            if (lastpage > $scope.pagedata.pageno) {
                $scope.pagedata.pageno++;
                $scope.shouldscroll = true;
                $scope.getEventSubtype();
            } else {
                $scope.shouldscroll = true;
            }
        }

        $scope.addMoreItems();

    })
    .controller('EventInsideDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("eventdetail");
        $scope.menutitle = NavigationService.makeactive("Events");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        // $scope.wallpaper = [{
        //   img: "img/event/eventinsidedetail/1.png",
        // }, {
        //   img: "img/event/eventinsidedetail/2.png",
        // }, {
        //   img: "img/event/eventinsidedetail/3.png",
        // }, {
        //   img: "img/event/eventinsidedetail/4.png",
        // }, {
        //   img: "img/event/eventinsidedetail/5.png",
        // }, {
        //   img: "img/event/eventinsidedetail/6.png",
        // }, {
        //   img: "img/event/eventinsidedetail/1.png",
        // }, {
        //   img: "img/event/eventinsidedetail/2.png",
        // }, {
        //   img: "img/event/eventinsidedetail/3.png",
        // }, {
        //   img: "img/event/eventinsidedetail/4.png",
        // }, {
        //   img: "img/event/eventinsidedetail/5.png",
        // }, {
        //   img: "img/event/eventinsidedetail/6.png",
        // }];
        // $scope.video = [{
        //   img: "img/event/eventinsidedetail/v2.png",
        // }, {
        //   img: "img/event/eventinsidedetail/v3.png",
        // }, {
        //   img: "img/event/eventinsidedetail/v4.png",
        // }];
        // $scope.weddings = [{
        //   img: "img/event/eventinsidedetail/ra1.png",
        //   date: "12 January 2016",
        //   desc: "Lorem Ipsum is simply dummy text of the printing industry"
        // }, {
        //   img: "img/event/eventinsidedetail/ra2.png",
        //   date: "12 January 2016",
        //   desc: "Lorem Ipsum is simply dummy text of the printing industry"
        // }, {
        //   img: "img/event/eventinsidedetail/ra3.png",
        //   date: "12 January 2016",
        //   desc: "Lorem Ipsum is simply dummy text of the printing industry"
        // }];

        $scope.eventdetail = {};
        NavigationService.getEventInsideDetails($stateParams.id, function(data) {
            console.log(data);
            $scope.eventdetail = data.data;
            console.log("$scope.eventdetail", $scope.eventdetail);
            if ($scope.eventdetail.imagegallery && $scope.eventdetail.imagegallery.length > 0) {
                $scope.eventdetail.imagegallery = _.chunk($scope.eventdetail.imagegallery, 6);
                for (var i = 0; i < $scope.eventdetail.imagegallery.length; i++) {
                    $scope.eventdetail.imagegallery[i] = _.chunk($scope.eventdetail.imagegallery[i], 3);
                }
                // $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 3);
            }
        })
        $scope.makeActive = function(video, index) {
            $scope.eventdetail.featuredvideos.splice(index, 1);
            $scope.eventdetail.featuredvideos.unshift(video);
        }

    })
    .controller('TalentInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("talentinside");
        $scope.menutitle = NavigationService.makeactive("Talents");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });


        NavigationService.getBanner($stateParams.id, function(data) {
            $scope.bannerData = data.data;
            $scope.bannerName = data.data.name;

            console.log('$scope.bannerData', $scope.bannerData);
        })
        $scope.seeMore = false;
        $scope.seeLess = false;
        var talentInsideArray = [];
        $scope.seeLessTalent = function() {
            NavigationService.getTalentInside($stateParams.id, function(data) {
                $scope.talentInsideData = data.queryresult;
                talentInsideArray = _.cloneDeep($scope.talentInsideData);
                $scope.seeMore = true;
                $scope.talentInsideData = _.slice($scope.talentInsideData, [0], [3]);
                if ($scope.getClientdata.length < 3) {
                    $scope.seeMore = false;
                }
                console.log('$scope.talentInsideData', $scope.talentInsideData);
            })
        }


        $scope.seeLessTalent();
        $scope.seeMoreTalent = function() {
            $scope.seeMore = false;
            $scope.seeLess = true;
            // $scope.allMovieName = {}
            $scope.talentInsideData = talentInsideArray;
            // console.log('dfgyhujkdrftgh', $scope.allMovieName);
        }
    })
    .controller('TalentInsideDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("talentdetail");
        $scope.menutitle = NavigationService.makeactive("Talents");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.wallpaper = [{
            img: "img/talent/talentinsidedetail/1.png",
        }, {
            img: "img/talent/talentinsidedetail/2.png",
        }, {
            img: "img/talent/talentinsidedetail/3.png",
        }, {
            img: "img/talent/talentinsidedetail/4.png",
        }, {
            img: "img/talent/talentinsidedetail/5.png",
        }, {
            img: "img/talent/talentinsidedetail/6.png",
        }, {
            img: "img/talent/talentinsidedetail/1.png",
        }, {
            img: "img/talent/talentinsidedetail/2.png",
        }, {
            img: "img/talent/talentinsidedetail/3.png",
        }, {
            img: "img/talent/talentinsidedetail/4.png",
        }, {
            img: "img/talent/talentinsidedetail/5.png",
        }, {
            img: "img/talent/talentinsidedetail/6.png",
        }];
        $scope.video = [{
            img: "img/talent/talentinsidedetail/v2.png",
        }, {
            img: "img/talent/talentinsidedetail/v3.png",
        }, {
            img: "img/talent/talentinsidedetail/v2.png",
        }, {
            img: "img/talent/talentinsidedetail/v4.png",
        }];
        $scope.weddings = [{
            img: "img/talent/talentinsidedetail/ra1.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/talent/talentinsidedetail/ra2.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }, {
            img: "img/talent/talentinsidedetail/ra3.png",
            date: "12 January 2016",
            desc: "Lorem Ipsum is simply dummy text of the printing industry"
        }];
        //
        // $scope.wallpaper = _.chunk($scope.wallpaper, 6);
        // for (var i = 0; i < $scope.wallpaper.length; i++) {
        //   $scope.wallpaper[i] = _.chunk($scope.wallpaper[i], 3);
        // }

        NavigationService.getTalentInsideDetail($stateParams.id, function(data) {
            $scope.talentInsideDetailData = data.data;
            console.log('$scope.talentInsideDetailData', $scope.talentInsideDetailData);
            if ($scope.talentInsideDetailData.imagegallery && $scope.talentInsideDetailData.imagegallery.length > 0) {
                $scope.talentInsideDetailData.imagegallery = _.chunk($scope.talentInsideDetailData.imagegallery, 6);
                for (var i = 0; i < $scope.talentInsideDetailData.imagegallery.length; i++) {
                    $scope.talentInsideDetailData.imagegallery[i] = _.chunk($scope.talentInsideDetailData.imagegallery[i], 3);
                }
                // $scope.weddetail.imagegallery = _.chunk($scope.weddetail.imagegallery, 3);
            }
        })
    })
    .controller('WorldTourCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("worldtour");
        $scope.menutitle = NavigationService.makeactive("World Tours");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        $scope.tourdata = {};
        $scope.formData = {};
        $scope.formData.enquiryarr = [];
        $scope.showThanks = false;

        // $scope.formData.enquiry = "";
        NavigationService.getworldtourdetail(function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.tourdata = data.data;
                console.log("tourdata", $scope.tourdata);
            }
            $scope.subscribe = {};
            $scope.subscribe.email = "";

            $scope.checkEmail = false;
            $scope.subscribeEmail = false;
            $scope.subscribe = function(email) {
                NavigationService.subscribe(email, function(data) {

                    // console.log(data);
                    if (!data.value) {
                        if ($scope.subscribe.email) {
                            $scope.checkEmail = true;
                            $scope.subscribeEmail = false;
                            $timeout(function() {
                                $state.reload();
                                $timeout(function() {
                                    $scope.checkEmail = "";
                                    $scope.subscribeEmail = "";
                                }, 2000);
                            }, 3000);
                        }
                    } else {
                        $scope.subscribeEmail = true;
                        $scope.checkEmail = false;
                        $timeout(function() {
                            $state.reload();
                            $timeout(function() {
                                $scope.checkEmail = "";
                                $scope.subscribeEmail = "";
                            }, 2000);
                        }, 3000);
                    }
                    //console.log(email);
                    $scope.subscribe.email = "";
                });

                // $scope.subscribeEmail = data;
            };
        })

        $scope.worldTourSubmitForm = function(formValid) {
            $scope.formData.enquiry = "";
            if (formValid.$valid && $scope.formData) {
                if ($scope.formData.enquiryarr.length > 0) {
                    _.each($scope.formData.enquiryarr, function(n) {
                        $scope.formData.enquiry += n + ",";
                    })
                    $scope.formData.enquiry = $scope.formData.enquiry.substring(0, $scope.formData.enquiry.length - 1);
                }
                $scope.formData.category = 7;
                NavigationService.gettourform($scope.formData, function(data) {
                    if (data.value != false) {
                        $scope.showThanks = true;
                        console.log('$scope.formData', $scope.formData);
                    }
                })
            }
            // $scope.formData.enquiryarr={};

        };

        $scope.pushorpop = function(val) {
                var foundIndex = $scope.formData.enquiryarr.indexOf(val);
                if (foundIndex == -1) {
                    $scope.formData.enquiryarr.push(val);
                } else {
                    $scope.formData.enquiryarr.splice(foundIndex, 1);
                }
            }
            // $scope.weddings = [{
            //   img: "img/worldtour/ra1.png",
            //   date: "12 January 2016",
            //   desc: "Lorem Ipsum is simply dummy text of the printing industry"
            // }, {
            //   img: "img/worldtour/ra2.png",
            //   date: "12 January 2016",
            //   desc: "Lorem Ipsum is simply dummy text of the printing industry"
            // }, {
            //   img: "img/worldtour/ra3.png",
            //   date: "12 January 2016",
            //   desc: "Lorem Ipsum is simply dummy text of the printing industry"
            // }];
            // $scope.wallpaper = [{
            //   img: "img/worldtour/1.jpg",
            // }, {
            //   img: "img/worldtour/2.jpg",
            // }, {
            //   img: "img/worldtour/3.jpg",
            // }, {
            //   img: "img/worldtour/4.jpg",
            // }, {
            //   img: "img/worldtour/5.jpg",
            // }, {
            //   img: "img/worldtour/3.jpg",
            // }, {
            //   img: "img/worldtour/1.jpg",
            // }, {
            //   img: "img/worldtour/2.jpg",
            // }];
            // $scope.wallpapers = [{
            //   img: "img/worldtour/1.jpg",
            // }, {
            //   img: "img/worldtour/1.jpg",
            // }, {
            //   img: "img/worldtour/2.jpg",
            // }, {
            //   img: "img/worldtour/2.jpg",
            // }, {
            //   img: "img/worldtour/3.jpg",
            // }, {
            //   img: "img/worldtour/3.jpg",
            // }, {
            //   img: "img/worldtour/4.jpg",
            // }, {
            //   img: "img/worldtour/4.jpg",
            // }];
            // $scope.wallpaper = _.chunk($scope.wallpaper, 3);
            // for (var i = 0; i < $scope.wallpaper.length; i++) {
            //   $scope.wallpaper[i] = _.chunk($scope.wallpaper[i], 3);
            // }
            // $scope.wallpapers = _.chunk($scope.wallpapers, 3);
            // for (var i = 0; i < $scope.wallpapers.length; i++) {
            //   $scope.wallpapers[i] = _.chunk($scope.wallpapers[i], 3);
            // }
        $scope.doActives = function(params) {
            if (params === 1) {
                console.log($scope.wallpapers);
                $scope.styleActives = "mactives";
                $scope.styleNoActives = "";
                $scope.wall = $scope.wallpapers;
            } else {
                console.log($scope.wallpaper);

                $scope.styleActives = "";
                $scope.styleNoActives = "mactives";
                $scope.wall = $scope.wallpaper;
            }
        }
        $scope.doActives(1);

        $scope.moviereleased = [{
            img: "img/worldtour/1.jpg",
        }, {
            img: "img/worldtour/2.jpg",
        }, {
            img: "img/worldtour/3.jpg",
        }, {
            img: "img/worldtour/4.jpg",
        }, {
            img: "img/worldtour/5.jpg",
        }, {
            img: "img/worldtour/3.jpg",
        }, {
            img: "img/worldtour/1.jpg",
        }, {
            img: "img/worldtour/2.jpg",
        }];
        $scope.movieupcoming = [{
            img: "img/worldtour/1.jpg",
        }, {
            img: "img/worldtour/1.jpg",
        }, {
            img: "img/worldtour/2.jpg",
        }, {
            img: "img/worldtour/2.jpg",
        }, {
            img: "img/worldtour/3.jpg",
        }, {
            img: "img/worldtour/3.jpg",
        }, {
            img: "img/worldtour/4.jpg",
        }, {
            img: "img/worldtour/4.jpg",
        }];

        $scope.doActives = function(params) {
            if (params === 1) {
                console.log($scope.wallpapers);
                $scope.styleActives = "mactives";
                $scope.styleNoActives = "";
                $scope.movie = $scope.moviereleased;
            } else {
                console.log($scope.wallpaper);

                $scope.styleActives = "";
                $scope.styleNoActives = "mactives";
                $scope.movie = $scope.movieupcoming;
            }
        }
        $scope.doActives(1);


        $scope.goToFunction = function(data) {
            $scope.statusData = data;
            if ($scope.statusData.status === '1') {
                $state.go('worldtourinside', {
                    id: $scope.statusData.id
                });
            } else {

            }
        }




    })
    .controller('WorldTourInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("worldtourinside");
        $scope.menutitle = NavigationService.makeactive("World Tours");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {

                ! function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        p = /^http:/.test(d.location) ? 'http' : 'https';
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.src = p + "://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }
                }(document, "script", "twitter-wjs");

                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));


            }, 1000);
        });

        NavigationService.getWorldtourInside($stateParams.id, function(data) {
            console.log(data);
            if (data.value != false) {
                $scope.tourInside = data.data;
                console.log($scope.tourInside);
                if ($scope.tourInside && $scope.tourInside.imagegallery && $scope.tourInside.imagegallery.length) {
                    $scope.tourInside.imagegallery = _.chunk($scope.tourInside.imagegallery, 6);
                    for (var i = 0; i < $scope.tourInside.imagegallery.length; i++) {
                        $scope.tourInside.imagegallery[i] = _.chunk($scope.tourInside.imagegallery[i], 3);
                    }
                }
                if ($scope.tourInside && $scope.tourInside.wallpaper && $scope.tourInside.wallpaper.length) {
                    $scope.tourInside.wallpaper = _.chunk($scope.tourInside.wallpaper, 6);
                    for (var i = 0; i < $scope.tourInside.wallpaper.length; i++) {
                        $scope.tourInside.wallpaper[i] = _.chunk($scope.tourInside.wallpaper[i], 3);
                    }
                }
            }
        })

        $scope.makeActive = function(video, index) {
            $scope.tourInside.featuredvideos.splice(index, 1);
            $scope.tourInside.featuredvideos.unshift(video);
        }
    })
    .controller('LandingCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("landing");
        $scope.menutitle = NavigationService.makeactive("Landing");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.subscribe = {};
        $scope.template.header = "";
        $scope.template.footer = "";

    })
    .controller('SubscribeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file

        $scope.checkEmail = false;
        $scope.subscribeEmail = false;
        $scope.subscribe = function(email) {
            // if(!email) {
            //     alert("please enter your email");
            // }
            // console.log('Email subscribe: ', email);
            NavigationService.subscribe(email, function(data) {
                console.log("im in", email);
                console.log(data.value);
                if (!data.value) {
                    if ($scope.subscribe.email) {
                        $scope.checkEmail = true;
                        $scope.subscribeEmail = false;
                        $timeout(function() {
                            // $state.reload();
                            $timeout(function() {
                                $scope.checkEmail = "";
                                $scope.subscribeEmail = "";
                            }, 2000);
                        }, 3000);

                    }
                } else {
                    $scope.subscribeEmail = true;
                    $scope.checkEmail = false;
                    $timeout(function() {
                        // $state.reload();
                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);

                }
                //console.log(email);
                $scope.subscribe.email = "";
            });

            // $scope.subscribeEmail = data;
        };


    })
    .controller('headerctrl', function($scope, TemplateService, NavigationService, $state, $timeout, $rootScope) {
        $scope.template = TemplateService;
        var get = false;
        $scope.getslide = "menu-out";
        $scope.getnav = function() {
                if ($scope.getslide == "menu-in") {
                    $scope.getslide = "menu-out";
                    $scope.onebar = "";
                    $scope.secondbar = "";
                    $scope.thirdbar = "";
                    $scope.buttonpos = "";
                } else {
                    $scope.getslide = "menu-in";
                    $scope.onebar = "firstbar";
                    $scope.secondbar = "secondbar";
                    $scope.thirdbar = "thirdbar";
                    $scope.buttonpos = "buttonpos";
                }
            }
            // $scope.opensubscribe = false;
            // $scope.openSubscribe = function() {
            //     $scope.opensubscribe = true;
            // }
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                $(window).scrollTop(0);
            });

        NavigationService.getMediacorner(function(data) {
            console.log("dsfasdfasdf");
            $scope.mediadata = data.data.years[0];
        });

        $scope.checkEmail = false;
        $scope.subscribeEmail = false;
        $scope.subscribe = function(email) {

            NavigationService.subscribe(email, function(data) {
                console.log("im in", email);
                console.log(data.value);
                if (!data.value) {
                    if ($scope.subscribe.email) {
                        $scope.checkEmail = true;
                        $scope.subscribeEmail = false;
                        $timeout(function() {

                            $timeout(function() {
                                $scope.checkEmail = "";
                                $scope.subscribeEmail = "";
                            }, 2000);
                        }, 3000);

                    }
                } else {
                    $scope.subscribeEmail = true;
                    $scope.checkEmail = false;
                    $timeout(function() {

                        $timeout(function() {
                            $scope.checkEmail = "";
                            $scope.subscribeEmail = "";
                        }, 2000);
                    }, 3000);

                }

                $scope.subscribe.email = "";
            });

            // $scope.subscribeEmail = data;
        };

    });
