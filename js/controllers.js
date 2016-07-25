var initMap = {};
var calculateAndDisplayRoute = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'infinite-scroll', 'angular-loading-bar', 'imageupload'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("home");
        $scope.menutitle = NavigationService.makeactive("Home");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.subscribe = {};
        $scope.subscribe.email = "";




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


            }, 0);
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


.controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
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


        }, 0);
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
    $scope.moviereleased = [{
        "img": "img/movies/released/released1.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }, {
        "img": "img/movies/released/released2.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }, {
        "img": "img/movies/released/released3.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }, {
        "img": "img/movies/released/released4.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }, {
        "img": "img/movies/released/released4.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }, {
        "img": "img/movies/released/released4.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }, {
        "img": "img/movies/released/released5.jpg",
        "date": "12 January 2016",
        "isupcoming": 1,
        "isreleased": 1
    }];
    $scope.movieupcoming = [{
        img: "img/movies/released/released1.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released1.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released4.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released4.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released2.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released2.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released3.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released3.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released5.jpg",
        date: "12 January 2016",
    }, {
        img: "img/movies/released/released5.jpg",
        date: "12 January 2016",
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
    $scope.clientspeak = {
        category: "Actor Speak",
        text: "Awesome teamwork and planning",
        name: "Ranbir Kapoor",
        img: "img/movies/ranbir.jpg"
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


        }, 0);
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


        }, 0);
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
    // $scope.wedding = [{
    //     img: "img/talent/talents/talent1.jpg",
    //     name: "BRAND AMBASSAORS"
    // }, {
    //     img: "img/talent/talents/talent2.jpg",
    //     name: "Appearances"
    // }, {
    //     img: "img/talent/talents/talent3.jpg",
    //     name: "TALENT REPRESENTATION"
    // }, {
    //     img: "img/talent/talents/talent4.jpg",
    //     name: "CELEBRITY ENDORSEMENTS"
    // }];
    $scope.wedding = [{
        img: "img/sports/asfc.jpg",
        name: "BRAND AMBASSAORS"
    }, {
        img: "img/sports/jpp.jpg",
        name: "BRAND AMBASSAORS"
    }, {
        img: "img/sports/pfh.jpg",
        name: "BRAND AMBASSAORS"
    }, {
        img: "img/sports/sportintative.jpg",
        name: "BRAND AMBASSAORS"
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
        title: "Brand Endorsements",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }, {
        title: "Event Appreances",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }, {
        title: "Live Performances",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }, {
        title: "Talent Representation",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }, {
        title: "Film Casting",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }, {
        title: "Fashion and modeling",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }, {
        title: "Sports Management",
        content: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>"
    }];

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


        }, 0);
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
                    $state.go('weddinginsidedetail', {
                        id: $scope.weddingData[i]._id
                    });
                } else {
                  console.log('else');
                    $state.go('weddinginside', {
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

.controller('WeddingInsideCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
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
    $scope.weddetail = {};
    NavigationService.getWeddingInsideDetails($stateParams.id, function(data) {
        console.log(data);
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


        }, 0);
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

    NavigationService.getClient(function(data) {
        $scope.getClientdata = data.data;
        console.log('$scope.getClientdata', $scope.getClientdata);
    })
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


        }, 0);
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
    $scope.objPagination.maxrow = 2;
    $scope.objPagination.pageno = 1;
    $scope.pages = [1]
    $scope.lastpage = 1;
    $scope.asfcInsidedatadetail = [];

    $scope.asfcdata = function() {
        // var id = '2';
        NavigationService.getSportInsidedataByid($scope.objPagination, function(data) {
            $scope.lastpage = data.lastpage;
            console.log($scope.lastpage);
            // $scope.objPagination.maxrow = data.maxrow;
            _.each(data.queryresult, function(n) {
                $scope.asfcInsidedatadetail.push(n);
            });
            console.log($scope.asfcInsidedatadetail);
        })
    }
    $scope.asfcdata();
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
        console.log('$scope.asfcInsidedata1', $scope.asfcInsidedata1);
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


        }, 0);
    });

    var id = '1';
    $scope.jppPagination = {};
    $scope.jppPagination.id = 1;
    $scope.jppPagination.pageno = 1;
    $scope.jppPagination.maxrow = 2;
    $scope.lastpage = 1;



    NavigationService.getSportdataByid(id, function(data) {
        $scope.jppdata = data.data;
        console.log($scope.jppdata);
    })
    $scope.jppInsidedata = [];
    $scope.jppfilter = function() {
        NavigationService.getSportInsidedataByid($scope.jppPagination, function(data) {
            // $scope.jppInsidedata = data.queryresult;
            // console.log($scope.jppInsidedata);
            $scope.lastpage = data.lastpage;
            _.each(data.queryresult, function(n) {
                $scope.jppInsidedata.push(n);
            })
        })
    }
    $scope.jppfilter();

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
    $scope.diaries = [{
        img: "img/movies/movie_diaries/diary1.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry",
        name: "Movies"
    }, {
        img: "img/jppseason1/2.png",
        date: "12 January 2016",
        desc: "Lorem Ipsum is simply dummy text of the printing industry",
        name: "Sports"
    }];
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


            }, 0);
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
            link: "asfc"
        }, {
            img: "img/sports/jpp.jpg",
            logo: "img/jpp/jpp-logo.png",
            link: "jpp"
        }, {
            img: "img/sports/pfh.jpg",
            name: "Playing for Humanity",
            link: "pfh"
        }, {
            img: "img/sports/sportintative.jpg",
            name: "SPORTS INITIATIVES",
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


            }, 0);
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





                window.google = window.google || {};
                google.maps = google.maps || {};
                (function() {

                    function getScript(src) {
                        var s = document.createElement('script');

                        s.src = src;
                        document.body.appendChild(s);
                    }

                    var modules = google.maps.modules = {};
                    google.maps.__gjsload__ = function(name, text) {
                        modules[name] = text;
                    };

                    google.maps.Load = function(apiLoad) {
                        delete google.maps.Load;
                        apiLoad([0.009999999776482582, [
                                [
                                    ["https://mts0.googleapis.com/maps/vt?lyrs=m@355000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.googleapis.com/maps/vt?lyrs=m@355000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "m@355000000", ["https://mts0.google.com/maps/vt?lyrs=m@355000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/maps/vt?lyrs=m@355000000\u0026src=api\u0026hl=en-US\u0026"]
                                ],
                                [
                                    ["https://khms0.googleapis.com/kh?v=692\u0026hl=en-US\u0026", "https://khms1.googleapis.com/kh?v=692\u0026hl=en-US\u0026"], null, null, null, 1, "692", ["https://khms0.google.com/kh?v=692\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=692\u0026hl=en-US\u0026"]
                                ], null, [
                                    ["https://mts0.googleapis.com/maps/vt?lyrs=t@355,r@355000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.googleapis.com/maps/vt?lyrs=t@355,r@355000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "t@355,r@355000000", ["https://mts0.google.com/maps/vt?lyrs=t@355,r@355000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/maps/vt?lyrs=t@355,r@355000000\u0026src=api\u0026hl=en-US\u0026"]
                                ], null, null, [
                                    ["https://cbks0.googleapis.com/cbk?", "https://cbks1.googleapis.com/cbk?"]
                                ],
                                [
                                    ["https://khms0.googleapis.com/kh?v=98\u0026hl=en-US\u0026", "https://khms1.googleapis.com/kh?v=98\u0026hl=en-US\u0026"], null, null, null, null, "98", ["https://khms0.google.com/kh?v=98\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=98\u0026hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/maps/vt?hl=en-US\u0026", "https://mts1.googleapis.com/maps/vt?hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]
                                ],
                                [
                                    ["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]
                                ]
                            ],
                            ["en-US", "US", null, 0, null, null, "https://maps.gstatic.com/mapfiles/", "https://csi.gstatic.com", "https://maps.googleapis.com", "https://maps.googleapis.com", null, "https://maps.google.com", "https://gg.google.com", "https://maps.gstatic.com/maps-api-v3/api/images/", "https://www.google.com/maps", 0, "https://www.google.com"],
                            ["https://maps.googleapis.com/maps-api-v3/api/js/25/8", "3.25.8"],
                            [3860002434], 1, null, null, null, null, null, "initMap", null, null, 1, "https://khms.googleapis.com/mz?v=692\u0026", "AIzaSyCn9ypqFNxdXt9Zu2YqLcdD1Xdt2wNul9s", "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null, "https://mts.googleapis.com/maps/vt/icon", [
                                ["https://maps.googleapis.com/maps/vt"],
                                ["https://maps.googleapis.com/maps/vt"], null, null, null, null, null, null, null, null, null, null, ["https://www.google.com/maps/vt"], "/maps/vt", 355000000, 355
                            ], 2, 500, [null, "https://g0.gstatic.com/landmark/tour", "https://g0.gstatic.com/landmark/config", null, "https://www.google.com/maps/preview/log204", "", "https://static.panoramio.com.storage.googleapis.com/photos/", ["https://geo0.ggpht.com/cbk", "https://geo1.ggpht.com/cbk", "https://geo2.ggpht.com/cbk", "https://geo3.ggpht.com/cbk"], "https://maps.googleapis.com/maps/api/js/GeoPhotoService.GetMetadata", "https://maps.googleapis.com/maps/api/js/GeoPhotoService.SingleImageSearch", ["https://lh3.ggpht.com/", "https://lh4.ggpht.com/", "https://lh5.ggpht.com/", "https://lh6.ggpht.com/"]],
                            ["https://www.google.com/maps/api/js/master?pb=!1m2!1u25!2s8!2sen-US!3sUS!4s25/8", "https://www.google.com/maps/api/js/widget?pb=!1m2!1u25!2s8!2sen-US"], null, 0, null, "/maps/api/js/ApplicationService.GetEntityDetails", 0, null, null, [null, null, null, null, null, null, null, null, null, [0, 0]], null, [],
                            ["25.8"]
                        ], loadScriptTime);
                    };
                    var loadScriptTime = (new Date).getTime();
                })();
                // inlined
                (function(_) {
                    'use strict';
                    var Ea, Fa, Ra, Wa, $a, fb, gb, hb, ib, mb, nb, qb, tb, pb, ub, yb, Hb, Lb, Pb, Xb, Yb, ac, dc, ec, gc, ic, kc, fc, hc, mc, pc, qc, wc, Ic, Kc, Pc, Oc, Qc, Rc, Sc, Tc, Uc, cd, ed, gd, hd, pd, rd, qd, td, yd, zd, Ed, Ld, Od, Pd, be, ce, ee, ie, ke, je, le, se, te, we, ze, Ae, Be, Fe, Ge, He, Ie, Le, Ne, Oe, Pe, Qe, Re, Se, Xe, af, bf, cf, df, lf, mf, nf, qf, tf, zf, Af, Cf, Ff, Hf, Sf, Tf, Uf, Vf, Wf, Xf, Zf, $f, ag, bg, dg, ig, kg, tg, ug, Ag, yg, Bg, Cg, Gg, Jg, Kg, Og, Pg, Ug, Vg, Wg, Xg, Yg, Ba, Ca;
                    _.aa = "ERROR";
                    _.ba = "INVALID_REQUEST";
                    _.ca = "MAX_DIMENSIONS_EXCEEDED";
                    _.da = "MAX_ELEMENTS_EXCEEDED";
                    _.ea = "MAX_WAYPOINTS_EXCEEDED";
                    _.fa = "NOT_FOUND";
                    _.ga = "OK";
                    _.ha = "OVER_QUERY_LIMIT";
                    _.ia = "REQUEST_DENIED";
                    _.ja = "UNKNOWN_ERROR";
                    _.ka = "ZERO_RESULTS";
                    _.la = function() {
                        return function(a) {
                            return a
                        }
                    };
                    _.k = function() {
                        return function() {}
                    };
                    _.ma = function(a) {
                        return function(b) {
                            this[a] = b
                        }
                    };
                    _.m = function(a) {
                        return function() {
                            return this[a]
                        }
                    };
                    _.oa = function(a) {
                        return function() {
                            return a
                        }
                    };
                    _.ra = function(a) {
                        return function() {
                            return _.pa[a].apply(this, arguments)
                        }
                    };
                    _.sa = function(a) {
                        return void 0 !== a
                    };
                    _.ta = _.k();
                    _.ua = function(a) {
                        a.Jb = function() {
                            return a.Ra ? a.Ra : a.Ra = new a
                        }
                    };
                    _.va = function(a) {
                        var b = typeof a;
                        if ("object" == b)
                            if (a) {
                                if (a instanceof Array) return "array";
                                if (a instanceof Object) return b;
                                var c = Object.prototype.toString.call(a);
                                if ("[object Window]" == c) return "object";
                                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                            } else return "null";
                        else if ("function" == b && "undefined" == typeof a.call) return "object";
                        return b
                    };
                    _.wa = function(a) {
                        var b = _.va(a);
                        return "array" == b || "object" == b && "number" == typeof a.length
                    };
                    _.xa = function(a) {
                        return "string" == typeof a
                    };
                    _.ya = function(a) {
                        return "number" == typeof a
                    };
                    _.za = function(a) {
                        return "function" == _.va(a)
                    };
                    _.Aa = function(a) {
                        var b = typeof a;
                        return "object" == b && null != a || "function" == b
                    };
                    _.Da = function(a) {
                        return a[Ba] || (a[Ba] = ++Ca)
                    };
                    Ea = function(a, b, c) {
                        return a.call.apply(a.bind, arguments)
                    };
                    Fa = function(a, b, c) {
                        if (!a) throw Error();
                        if (2 < arguments.length) {
                            var d = Array.prototype.slice.call(arguments, 2);
                            return function() {
                                var c = Array.prototype.slice.call(arguments);
                                Array.prototype.unshift.apply(c, d);
                                return a.apply(b, c)
                            }
                        }
                        return function() {
                            return a.apply(b, arguments)
                        }
                    };
                    _.u = function(a, b, c) {
                        _.u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ea : Fa;
                        return _.u.apply(null, arguments)
                    };
                    _.Ga = function() {
                        return +new Date
                    };
                    _.v = function(a, b) {
                        function c() {}
                        c.prototype = b.prototype;
                        a.Ab = b.prototype;
                        a.prototype = new c;
                        a.prototype.constructor = a;
                        a.cq = function(a, c, f) {
                            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
                            return b.prototype[c].apply(a, g)
                        }
                    };
                    _.y = function(a) {
                        return a ? a.length : 0
                    };
                    _.Ha = function(a, b) {
                        return function(c) {
                            return b(a(c))
                        }
                    };
                    _.Ja = function(a, b) {
                        _.Ia(b, function(c) {
                            a[c] = b[c]
                        })
                    };
                    _.Ka = function(a) {
                        for (var b in a) return !1;
                        return !0
                    };
                    _.La = function(a, b, c) {
                        null != b && (a = Math.max(a, b));
                        null != c && (a = Math.min(a, c));
                        return a
                    };
                    _.Ma = function(a, b, c) {
                        c -= b;
                        return ((a - b) % c + c) % c + b
                    };
                    _.Na = function(a, b, c) {
                        return Math.abs(a - b) <= (c || 1E-9)
                    };
                    _.Oa = function(a, b) {
                        for (var c = [], d = _.y(a), e = 0; e < d; ++e) c.push(b(a[e], e));
                        return c
                    };
                    _.Qa = function(a, b) {
                        for (var c = _.Pa(void 0, _.y(b)), d = _.Pa(void 0, 0); d < c; ++d) a.push(b[d])
                    };
                    Ra = function(a) {
                        return null == a
                    };
                    _.Sa = function(a) {
                        return "undefined" != typeof a
                    };
                    _.A = function(a) {
                        return "number" == typeof a
                    };
                    _.Ta = function(a) {
                        return "object" == typeof a
                    };
                    _.Pa = function(a, b) {
                        return null == a ? b : a
                    };
                    _.Ua = function(a) {
                        return "string" == typeof a
                    };
                    _.Va = function(a) {
                        return a === !!a
                    };
                    _.Ia = function(a, b) {
                        for (var c in a) b(c, a[c])
                    };
                    Wa = function(a, b, c) {
                        return Function.prototype.call.apply(Array.prototype.slice, arguments)
                    };
                    _.Xa = function(a) {
                        return null != a && "object" == typeof a && "number" == typeof a.length
                    };
                    _.Za = function(a) {
                        return function() {
                            var b = this,
                                c = arguments;
                            _.Ya(function() {
                                a.apply(b, c)
                            })
                        }
                    };
                    _.Ya = function(a) {
                        return window.setTimeout(a, 0)
                    };
                    $a = function(a, b) {
                        if (Object.prototype.hasOwnProperty.call(a, b)) return a[b]
                    };
                    _.ab = function(a) {
                        window.console && window.console.error && window.console.error(a)
                    };
                    _.db = function(a) {
                        a = a || window.event;
                        _.bb(a);
                        _.cb(a)
                    };
                    _.bb = function(a) {
                        a.cancelBubble = !0;
                        a.stopPropagation && a.stopPropagation()
                    };
                    _.cb = function(a) {
                        a.preventDefault && _.Sa(a.defaultPrevented) ? a.preventDefault() : a.returnValue = !1
                    };
                    _.eb = function(a) {
                        a.handled = !0;
                        _.Sa(a.bubbles) || (a.returnValue = "handled")
                    };
                    fb = function(a, b) {
                        a.__e3_ || (a.__e3_ = {});
                        a = a.__e3_;
                        a[b] || (a[b] = {});
                        return a[b]
                    };
                    gb = function(a, b) {
                        a = a.__e3_ || {};
                        if (b) b = a[b] || {};
                        else {
                            b = {};
                            for (var c in a) _.Ja(b, a[c])
                        }
                        return b
                    };
                    hb = function(a, b) {
                        return function(c) {
                            return b.call(a, c, this)
                        }
                    };
                    ib = function(a, b, c) {
                        return function(d) {
                            var e = [b, a];
                            _.Qa(e, arguments);
                            _.B.trigger.apply(this, e);
                            c && _.eb.apply(null, arguments)
                        }
                    };
                    mb = function(a, b, c, d) {
                        this.Ra = a;
                        this.f = b;
                        this.b = c;
                        this.j = null;
                        this.l = d;
                        this.id = ++jb;
                        fb(a, b)[this.id] = this;
                        kb && "tagName" in a && (lb[this.id] = this)
                    };
                    nb = function(a) {
                        return a.j = function(b) {
                            b || (b = window.event);
                            if (b && !b.target) try {
                                b.target = b.srcElement
                            } catch (d) {}
                            var c;
                            c = a.b.apply(a.Ra, [b]);
                            return b && "click" == b.type && (b = b.srcElement) && "A" == b.tagName && "javascript:void(0)" == b.href ? !1 : c
                        }
                    };
                    _.ob = function(a) {
                        return "" + (_.Aa(a) ? _.Da(a) : a)
                    };
                    _.C = _.k();
                    qb = function(a, b) {
                        var c = b + "_changed";
                        if (a[c]) a[c]();
                        else a.changed(b);
                        var c = pb(a, b),
                            d;
                        for (d in c) {
                            var e = c[d];
                            qb(e.Ic, e.jb)
                        }
                        _.B.trigger(a, b.toLowerCase() + "_changed")
                    };
                    _.sb = function(a) {
                        return rb[a] || (rb[a] = a.substr(0, 1).toUpperCase() + a.substr(1))
                    };
                    tb = function(a) {
                        a.gm_accessors_ || (a.gm_accessors_ = {});
                        return a.gm_accessors_
                    };
                    pb = function(a, b) {
                        a.gm_bindings_ || (a.gm_bindings_ = {});
                        a.gm_bindings_.hasOwnProperty(b) || (a.gm_bindings_[b] = {});
                        return a.gm_bindings_[b]
                    };
                    ub = function(a) {
                        this.message = a;
                        this.name = "InvalidValueError";
                        this.stack = Error().stack
                    };
                    _.vb = function(a, b) {
                        var c = "";
                        if (null != b) {
                            if (!(b instanceof ub)) return b;
                            c = ": " + b.message
                        }
                        return new ub(a + c)
                    };
                    _.wb = function(a) {
                        if (!(a instanceof ub)) throw a;
                        _.ab(a.name + ": " + a.message)
                    };
                    _.xb = function(a, b) {
                        return function(c) {
                            if (!c || !_.Ta(c)) throw _.vb("not an Object");
                            var d = {},
                                e;
                            for (e in c)
                                if (d[e] = c[e], !b && !a[e]) throw _.vb("unknown property " + e);
                            for (e in a) try {
                                var f = a[e](d[e]);
                                if (_.Sa(f) || Object.prototype.hasOwnProperty.call(c, e)) d[e] = a[e](d[e])
                            } catch (g) {
                                throw _.vb("in property " + e, g);
                            }
                            return d
                        }
                    };
                    yb = function(a) {
                        try {
                            return !!a.cloneNode
                        } catch (b) {
                            return !1
                        }
                    };
                    _.zb = function(a, b, c) {
                        return c ? function(c) {
                            if (c instanceof a) return c;
                            try {
                                return new a(c)
                            } catch (e) {
                                throw _.vb("when calling new " + b, e);
                            }
                        } : function(c) {
                            if (c instanceof a) return c;
                            throw _.vb("not an instance of " + b);
                        }
                    };
                    _.Ab = function(a) {
                        return function(b) {
                            for (var c in a)
                                if (a[c] == b) return b;
                            throw _.vb(b);
                        }
                    };
                    _.Bb = function(a) {
                        return function(b) {
                            if (!_.Xa(b)) throw _.vb("not an Array");
                            return _.Oa(b, function(b, d) {
                                try {
                                    return a(b)
                                } catch (e) {
                                    throw _.vb("at index " + d, e);
                                }
                            })
                        }
                    };
                    _.Cb = function(a, b) {
                        return function(c) {
                            if (a(c)) return c;
                            throw _.vb(b || "" + c);
                        }
                    };
                    _.Db = function(a) {
                        var b = arguments;
                        return function(a) {
                            for (var d = [], e = 0, f = b.length; e < f; ++e) {
                                var g = b[e];
                                try {
                                    (g.Ag || g)(a)
                                } catch (h) {
                                    if (!(h instanceof ub)) throw h;
                                    d.push(h.message);
                                    continue
                                }
                                return (g.then || g)(a)
                            }
                            throw _.vb(d.join("; and "));
                        }
                    };
                    _.Eb = function(a) {
                        return function(b) {
                            return null == b ? b : a(b)
                        }
                    };
                    Hb = function(a) {
                        return function(b) {
                            if (b && null != b[a]) return b;
                            throw _.vb("no " + a + " property");
                        }
                    };
                    _.Ib = function(a) {
                        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                    };
                    _.Kb = function() {
                        return -1 != _.Jb.toLowerCase().indexOf("webkit")
                    };
                    _.Mb = function(a, b) {
                        var c = 0;
                        a = _.Ib(String(a)).split(".");
                        b = _.Ib(String(b)).split(".");
                        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
                            var f = a[e] || "",
                                g = b[e] || "",
                                h = /(\d*)(\D*)/g,
                                l = /(\d*)(\D*)/g;
                            do {
                                var n = h.exec(f) || ["", "", ""],
                                    p = l.exec(g) || ["", "", ""];
                                if (0 == n[0].length && 0 == p[0].length) break;
                                c = Lb(0 == n[1].length ? 0 : (0, window.parseInt)(n[1], 10), 0 == p[1].length ? 0 : (0, window.parseInt)(p[1], 10)) || Lb(0 == n[2].length, 0 == p[2].length) || Lb(n[2], p[2])
                            } while (0 == c)
                        }
                        return c
                    };
                    Lb = function(a, b) {
                        return a < b ? -1 : a > b ? 1 : 0
                    };
                    _.Ob = function(a, b, c) {
                        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                        if (_.xa(a)) return _.xa(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                        for (; c < a.length; c++)
                            if (c in a && a[c] === b) return c;
                        return -1
                    };
                    _.G = function(a, b, c) {
                        for (var d = a.length, e = _.xa(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
                    };
                    Pb = function(a, b) {
                        for (var c = a.length, d = _.xa(a) ? a.split("") : a, e = 0; e < c; e++)
                            if (e in d && b.call(void 0, d[e], e, a)) return e;
                        return -1
                    };
                    _.Rb = function(a, b) {
                        b = _.Ob(a, b);
                        var c;
                        (c = 0 <= b) && _.Qb(a, b);
                        return c
                    };
                    _.Qb = function(a, b) {
                        Array.prototype.splice.call(a, b, 1)
                    };
                    _.Sb = function(a) {
                        return a * Math.PI / 180
                    };
                    _.Tb = function(a) {
                        return 180 * a / Math.PI
                    };
                    _.H = function(a, b, c) {
                        if (a && (void 0 !== a.lat || void 0 !== a.lng)) try {
                            Ub(a), b = a.lng, a = a.lat, c = !1
                        } catch (d) {
                            _.wb(d)
                        }
                        a -= 0;
                        b -= 0;
                        c || (a = _.La(a, -90, 90), 180 != b && (b = _.Ma(b, -180, 180)));
                        this.lat = function() {
                            return a
                        };
                        this.lng = function() {
                            return b
                        }
                    };
                    _.Vb = function(a) {
                        return _.Sb(a.lat())
                    };
                    _.Wb = function(a) {
                        return _.Sb(a.lng())
                    };
                    Xb = function(a, b) {
                        b = Math.pow(10, b);
                        return Math.round(a * b) / b
                    };
                    Yb = _.k();
                    _.Zb = function(a) {
                        try {
                            if (a instanceof _.H) return a;
                            a = Ub(a);
                            return new _.H(a.lat, a.lng)
                        } catch (b) {
                            throw _.vb("not a LatLng or LatLngLiteral", b);
                        }
                    };
                    _.$b = function(a) {
                        this.b = _.Zb(a)
                    };
                    ac = function(a) {
                        if (a instanceof Yb) return a;
                        try {
                            return new _.$b(_.Zb(a))
                        } catch (b) {}
                        throw _.vb("not a Geometry or LatLng or LatLngLiteral object");
                    };
                    _.bc = function(a, b) {
                        if (a) return function() {
                            --a || b()
                        };
                        b();
                        return _.ta
                    };
                    _.cc = function(a, b, c) {
                        var d = a.getElementsByTagName("head")[0];
                        a = a.createElement("script");
                        a.type = "text/javascript";
                        a.charset = "UTF-8";
                        a.src = b;
                        c && (a.onerror = c);
                        d.appendChild(a);
                        return a
                    };
                    dc = function(a) {
                        for (var b = "", c = 0, d = arguments.length; c < d; ++c) {
                            var e = arguments[c];
                            e.length && "/" == e[0] ? b = e : (b && "/" != b[b.length - 1] && (b += "/"), b += e)
                        }
                        return b
                    };
                    ec = function(a) {
                        this.j = window.document;
                        this.b = {};
                        this.f = a
                    };
                    gc = function() {
                        this.l = {};
                        this.f = {};
                        this.m = {};
                        this.b = {};
                        this.j = new fc
                    };
                    ic = function(a, b) {
                        a.l[b] || (a.l[b] = !0, hc(a.j, function(c) {
                            for (var d = c.Wh[b], e = d ? d.length : 0, f = 0; f < e; ++f) {
                                var g = d[f];
                                a.b[g] || ic(a, g)
                            }
                            c = c.Zm;
                            c.b[b] || _.cc(c.j, dc(c.f, b) + ".js")
                        }))
                    };
                    kc = function(a, b) {
                        var c = jc;
                        this.Zm = a;
                        this.Wh = c;
                        a = {};
                        for (var d in c)
                            for (var e = c[d], f = 0, g = e.length; f < g; ++f) {
                                var h = e[f];
                                a[h] || (a[h] = []);
                                a[h].push(d)
                            }
                        this.vo = a;
                        this.ul = b
                    };
                    fc = function() {
                        this.b = []
                    };
                    hc = function(a, b) {
                        a.f ? b(a.f) : a.b.push(b)
                    };
                    _.J = function(a, b, c) {
                        var d = gc.Jb();
                        a = "" + a;
                        d.b[a] ? b(d.b[a]) : ((d.f[a] = d.f[a] || []).push(b), c || ic(d, a))
                    };
                    _.lc = function(a, b) {
                        gc.Jb().b["" + a] = b
                    };
                    mc = function(a, b, c) {
                        var d = [],
                            e = _.bc(a.length, function() {
                                b.apply(null, d)
                            });
                        _.G(a, function(a, b) {
                            _.J(a, function(a) {
                                d[b] = a;
                                e()
                            }, c)
                        })
                    };
                    _.nc = function(a) {
                        a = a || {};
                        this.j = a.id;
                        this.b = null;
                        try {
                            this.b = a.geometry ? ac(a.geometry) : null
                        } catch (b) {
                            _.wb(b)
                        }
                        this.f = a.properties || {}
                    };
                    _.L = function(a, b) {
                        this.x = a;
                        this.y = b
                    };
                    pc = function(a) {
                        if (a instanceof _.L) return a;
                        try {
                            _.xb({
                                x: _.oc,
                                y: _.oc
                            }, !0)(a)
                        } catch (b) {
                            throw _.vb("not a Point", b);
                        }
                        return new _.L(a.x, a.y)
                    };
                    _.M = function(a, b, c, d) {
                        this.width = a;
                        this.height = b;
                        this.j = c || "px";
                        this.f = d || "px"
                    };
                    qc = function(a) {
                        if (a instanceof _.M) return a;
                        try {
                            _.xb({
                                height: _.oc,
                                width: _.oc
                            }, !0)(a)
                        } catch (b) {
                            throw _.vb("not a Size", b);
                        }
                        return new _.M(a.width, a.height)
                    };
                    _.rc = function(a) {
                        return function() {
                            return this.get(a)
                        }
                    };
                    _.sc = function(a, b) {
                        return b ? function(c) {
                            try {
                                this.set(a, b(c))
                            } catch (d) {
                                _.wb(_.vb("set" + _.sb(a), d))
                            }
                        } : function(b) {
                            this.set(a, b)
                        }
                    };
                    _.tc = function(a, b) {
                        _.Ia(b, function(b, d) {
                            var e = _.rc(b);
                            a["get" + _.sb(b)] = e;
                            d && (d = _.sc(b, d), a["set" + _.sb(b)] = d)
                        })
                    };
                    _.xc = function(a) {
                        this.b = a || [];
                        wc(this)
                    };
                    wc = function(a) {
                        a.set("length", a.b.length)
                    };
                    _.yc = function(a) {
                        this.j = a || _.ob;
                        this.f = {}
                    };
                    _.zc = function(a, b) {
                        var c = a.f,
                            d = a.j(b);
                        c[d] || (c[d] = b, _.B.trigger(a, "insert", b), a.b && a.b(b))
                    };
                    _.Ac = _.ma("b");
                    _.Bc = function(a, b, c) {
                        this.heading = a;
                        this.pitch = _.La(b, -90, 90);
                        this.zoom = Math.max(0, c)
                    };
                    _.Cc = function() {
                        this.__gm = new _.C;
                        this.l = null
                    };
                    _.Dc = _.la();
                    _.Ec = function(a, b, c) {
                        for (var d in a) b.call(c, a[d], d, a)
                    };
                    _.Gc = function(a) {
                        return -1 != _.Jb.indexOf(a)
                    };
                    _.Hc = function() {
                        return _.Gc("Trident") || _.Gc("MSIE")
                    };
                    Ic = function() {
                        return (_.Gc("Chrome") || _.Gc("CriOS")) && !_.Gc("Edge")
                    };
                    Kc = function(a) {
                        _.Jc.setTimeout(function() {
                            throw a;
                        }, 0)
                    };
                    Pc = function() {
                        var a = _.Lc.f,
                            a = Mc(a);
                        !_.za(_.Jc.setImmediate) || _.Jc.Window && _.Jc.Window.prototype && !_.Gc("Edge") && _.Jc.Window.prototype.setImmediate == _.Jc.setImmediate ? (Nc || (Nc = Oc()), Nc(a)) : _.Jc.setImmediate(a)
                    };
                    Oc = function() {
                        var a = _.Jc.MessageChannel;
                        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !_.Gc("Presto") && (a = function() {
                            var a = window.document.createElement("IFRAME");
                            a.style.display = "none";
                            a.src = "";
                            window.document.documentElement.appendChild(a);
                            var b = a.contentWindow,
                                a = b.document;
                            a.open();
                            a.write("");
                            a.close();
                            var c = "callImmediate" + Math.random(),
                                d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                                a = (0, _.u)(function(a) {
                                    if (("*" ==
                                            d || a.origin == d) && a.data == c) this.port1.onmessage()
                                }, this);
                            b.addEventListener("message", a, !1);
                            this.port1 = {};
                            this.port2 = {
                                postMessage: function() {
                                    b.postMessage(c, d)
                                }
                            }
                        });
                        if ("undefined" !== typeof a && !_.Hc()) {
                            var b = new a,
                                c = {},
                                d = c;
                            b.port1.onmessage = function() {
                                if (_.sa(c.next)) {
                                    c = c.next;
                                    var a = c.lh;
                                    c.lh = null;
                                    a()
                                }
                            };
                            return function(a) {
                                d.next = {
                                    lh: a
                                };
                                d = d.next;
                                b.port2.postMessage(0)
                            }
                        }
                        return "undefined" !== typeof window.document && "onreadystatechange" in window.document.createElement("SCRIPT") ? function(a) {
                            var b = window.document.createElement("SCRIPT");
                            b.onreadystatechange = function() {
                                b.onreadystatechange = null;
                                b.parentNode.removeChild(b);
                                b = null;
                                a();
                                a = null
                            };
                            window.document.documentElement.appendChild(b)
                        } : function(a) {
                            _.Jc.setTimeout(a, 0)
                        }
                    };
                    Qc = function(a, b, c) {
                        this.l = c;
                        this.j = a;
                        this.m = b;
                        this.f = 0;
                        this.b = null
                    };
                    Rc = function() {
                        this.f = this.b = null
                    };
                    Sc = function() {
                        this.next = this.b = this.Dc = null
                    };
                    _.Lc = function(a, b) {
                        _.Lc.b || _.Lc.m();
                        _.Lc.j || (_.Lc.b(), _.Lc.j = !0);
                        _.Lc.l.add(a, b)
                    };
                    Tc = function(a, b) {
                        return function(c) {
                            return c.Dc == a && c.context == (b || null)
                        }
                    };
                    Uc = function(a) {
                        this.T = [];
                        this.b = a && a.yd || _.ta;
                        this.f = a && a.Ad || _.ta
                    };
                    _.Wc = function(a, b, c, d) {
                        function e() {
                            _.G(f, function(a) {
                                b.call(c || null, function(b) {
                                    if (a.Bd) {
                                        if (a.Bd.jh) return;
                                        a.Bd.jh = !0;
                                        _.Rb(g.T, a);
                                        g.T.length || g.b()
                                    }
                                    a.Dc.call(a.context, b)
                                })
                            })
                        }
                        var f = a.T.slice(0),
                            g = a;
                        d && d.Ro ? e() : Vc(e)
                    };
                    _.Xc = function() {
                        this.T = new Uc({
                            yd: (0, _.u)(this.yd, this),
                            Ad: (0, _.u)(this.Ad, this)
                        })
                    };
                    _.ad = function() {
                        _.Xc.call(this)
                    };
                    _.bd = function(a) {
                        _.Xc.call(this);
                        this.b = a
                    };
                    cd = _.k();
                    ed = function(a) {
                        var b = a;
                        if (a instanceof Array) b = Array(a.length), _.dd(b, a);
                        else if (a instanceof Object) {
                            var c = b = {},
                                d;
                            for (d in a) a.hasOwnProperty(d) && (c[d] = ed(a[d]))
                        }
                        return b
                    };
                    _.dd = function(a, b) {
                        for (var c = 0; c < b.length; ++c) b.hasOwnProperty(c) && (a[c] = ed(b[c]))
                    };
                    _.N = function(a, b) {
                        a[b] || (a[b] = []);
                        return a[b]
                    };
                    _.fd = function(a, b) {
                        return a[b] ? a[b].length : 0
                    };
                    gd = function(a, b, c, d) {
                        this.type = a;
                        this.label = b;
                        this.Cl = c;
                        this.Ac = d
                    };
                    hd = function(a) {
                        switch (a) {
                            case "d":
                            case "f":
                            case "i":
                            case "j":
                            case "u":
                            case "v":
                            case "x":
                            case "y":
                            case "g":
                            case "h":
                            case "n":
                            case "o":
                            case "e":
                                return 0;
                            case "s":
                            case "z":
                            case "B":
                                return "";
                            case "b":
                                return !1;
                            default:
                                return null
                        }
                    };
                    _.id = function(a, b, c) {
                        return new gd(a, 1, _.sa(b) ? b : hd(a), c)
                    };
                    _.jd = function(a, b, c) {
                        return new gd(a, 2, _.sa(b) ? b : hd(a), c)
                    };
                    _.kd = function(a, b) {
                        return new gd(a, 3, void 0, b)
                    };
                    _.ld = function(a) {
                        return _.id("i", a)
                    };
                    _.md = function(a) {
                        return _.id("v", a)
                    };
                    _.nd = function(a) {
                        return _.id("b", a)
                    };
                    _.od = function(a) {
                        return _.id("e", a)
                    };
                    _.O = function(a, b) {
                        return _.id("m", a, b)
                    };
                    pd = _.k();
                    rd = function(a, b, c) {
                        for (var d = 1; d < b.A.length; ++d) {
                            var e = b.A[d],
                                f = a[d + b.F];
                            if (e && null != f)
                                if (3 == e.label)
                                    for (var g = 0; g < f.length; ++g) qd(f[g], d, e, c);
                                else qd(f, d, e, c)
                        }
                    };
                    qd = function(a, b, c, d) {
                        if ("m" == c.type) {
                            var e = d.length;
                            rd(a, c.Ac, d);
                            d.splice(e, 0, [b, "m", d.length - e].join(""))
                        } else "b" == c.type && (a = a ? "1" : "0"), d.push([b, c.type, (0, window.encodeURIComponent)(a)].join(""))
                    };
                    _.sd = function() {
                        return _.Gc("iPhone") && !_.Gc("iPod") && !_.Gc("iPad")
                    };
                    td = function() {
                        var a = _.Jc.document;
                        return a ? a.documentMode : void 0
                    };
                    _.wd = function(a) {
                        return ud[a] || (ud[a] = 0 <= _.Mb(_.vd, a))
                    };
                    _.xd = function(a, b) {
                        this.b = a || 0;
                        this.f = b || 0
                    };
                    yd = _.k();
                    zd = function(a, b) {
                        -180 == a && 180 != b && (a = 180); - 180 == b && 180 != a && (b = 180);
                        this.b = a;
                        this.f = b
                    };
                    _.Ad = function(a) {
                        return a.b > a.f
                    };
                    _.Cd = function(a, b) {
                        return 1E-9 >= Math.abs(b.b - a.b) % 360 + Math.abs(_.Bd(b) - _.Bd(a))
                    };
                    _.Dd = function(a, b) {
                        var c = b - a;
                        return 0 <= c ? c : b + 180 - (a - 180)
                    };
                    _.Bd = function(a) {
                        return a.isEmpty() ? 0 : _.Ad(a) ? 360 - (a.b - a.f) : a.f - a.b
                    };
                    Ed = function(a, b) {
                        this.f = a;
                        this.b = b
                    };
                    _.Fd = function(a) {
                        return a.isEmpty() ? 0 : a.b - a.f
                    };
                    _.Gd = function(a, b) {
                        a = a && _.Zb(a);
                        b = b && _.Zb(b);
                        if (a) {
                            b = b || a;
                            var c = _.La(a.lat(), -90, 90),
                                d = _.La(b.lat(), -90, 90);
                            this.f = new Ed(c, d);
                            a = a.lng();
                            b = b.lng();
                            360 <= b - a ? this.b = new zd(-180, 180) : (a = _.Ma(a, -180, 180), b = _.Ma(b, -180, 180), this.b = new zd(a, b))
                        } else this.f = new Ed(1, -1), this.b = new zd(180, -180)
                    };
                    _.Hd = function(a, b, c, d) {
                        return new _.Gd(new _.H(a, b, !0), new _.H(c, d, !0))
                    };
                    _.Jd = function(a) {
                        if (a instanceof _.Gd) return a;
                        try {
                            return a = Id(a), _.Hd(a.south, a.west, a.north, a.east)
                        } catch (b) {
                            throw _.vb("not a LatLngBounds or LatLngBoundsLiteral", b);
                        }
                    };
                    _.Kd = _.ma("__gm");
                    Ld = function() {
                        this.b = {};
                        this.j = {};
                        this.f = {}
                    };
                    Od = function() {
                        this.b = {}
                    };
                    Pd = function(a) {
                        this.b = new Od;
                        var b = this;
                        _.B.addListenerOnce(a, "addfeature", function() {
                            _.J("data", function(c) {
                                c.b(b, a, b.b)
                            })
                        })
                    };
                    _.Rd = function(a) {
                        this.b = [];
                        try {
                            this.b = Qd(a)
                        } catch (b) {
                            _.wb(b)
                        }
                    };
                    _.Td = function(a) {
                        this.b = (0, _.Sd)(a)
                    };
                    _.Vd = function(a) {
                        this.b = Ud(a)
                    };
                    _.Wd = function(a) {
                        this.b = (0, _.Sd)(a)
                    };
                    _.Xd = function(a) {
                        this.b = (0, _.Sd)(a)
                    };
                    _.Zd = function(a) {
                        this.b = Yd(a)
                    };
                    _.ae = function(a) {
                        this.b = $d(a)
                    };
                    be = function(a) {
                        a = a || {};
                        a.clickable = _.Pa(a.clickable, !0);
                        a.visible = _.Pa(a.visible, !0);
                        this.setValues(a);
                        _.J("marker", _.ta)
                    };
                    ce = function(a) {
                        var b = _,
                            c = gc.Jb().j;
                        a = c.f = new kc(new ec(a), b);
                        for (var b = 0, d = c.b.length; b < d; ++b) c.b[b](a);
                        c.b.length = 0
                    };
                    _.de = function(a) {
                        this.__gm = {
                            set: null,
                            se: null
                        };
                        be.call(this, a)
                    };
                    ee = function(a) {
                        a = a || {};
                        a.visible = _.Pa(a.visible, !0);
                        return a
                    };
                    _.fe = function(a) {
                        return a && a.radius || 6378137
                    };
                    ie = function(a) {
                        return a instanceof _.xc ? he(a) : new _.xc((0, _.Sd)(a))
                    };
                    ke = function(a) {
                        var b;
                        _.Xa(a) ? 0 == _.y(a) ? b = !0 : (b = a instanceof _.xc ? a.getAt(0) : a[0], b = _.Xa(b)) : b = !1;
                        return b ? a instanceof _.xc ? je(he)(a) : new _.xc(_.Bb(ie)(a)) : new _.xc([ie(a)])
                    };
                    je = function(a) {
                        return function(b) {
                            if (!(b instanceof _.xc)) throw _.vb("not an MVCArray");
                            b.forEach(function(b, d) {
                                try {
                                    a(b)
                                } catch (e) {
                                    throw _.vb("at index " + d, e);
                                }
                            });
                            return b
                        }
                    };
                    le = function(a) {
                        this.set("latLngs", new _.xc([new _.xc]));
                        this.setValues(ee(a));
                        _.J("poly", _.ta)
                    };
                    _.me = function(a) {
                        le.call(this, a)
                    };
                    _.ne = function(a) {
                        le.call(this, a)
                    };
                    _.qe = function(a, b, c) {
                        function d(a) {
                            if (!a) throw _.vb("not a Feature");
                            if ("Feature" != a.type) throw _.vb('type != "Feature"');
                            var b = a.geometry;
                            try {
                                b = null == b ? null : e(b)
                            } catch (d) {
                                throw _.vb('in property "geometry"', d);
                            }
                            var f = a.properties || {};
                            if (!_.Ta(f)) throw _.vb("properties is not an Object");
                            var g = c.idPropertyName;
                            a = g ? f[g] : a.id;
                            if (null != a && !_.A(a) && !_.Ua(a)) throw _.vb((g || "id") + " is not a string or number");
                            return {
                                id: a,
                                geometry: b,
                                properties: f
                            }
                        }

                        function e(a) {
                            if (null == a) throw _.vb("is null");
                            var b = (a.type +
                                    "").toLowerCase(),
                                c = a.coordinates;
                            try {
                                switch (b) {
                                    case "point":
                                        return new _.$b(h(c));
                                    case "multipoint":
                                        return new _.Wd(n(c));
                                    case "linestring":
                                        return g(c);
                                    case "multilinestring":
                                        return new _.Vd(p(c));
                                    case "polygon":
                                        return f(c);
                                    case "multipolygon":
                                        return new _.ae(r(c))
                                }
                            } catch (d) {
                                throw _.vb('in property "coordinates"', d);
                            }
                            if ("geometrycollection" == b) try {
                                return new _.Rd(x(a.geometries))
                            } catch (d) {
                                throw _.vb('in property "geometries"', d);
                            }
                            throw _.vb("invalid type");
                        }

                        function f(a) {
                            return new _.Zd(q(a))
                        }

                        function g(a) {
                            return new _.Td(n(a))
                        }

                        function h(a) {
                            a = l(a);
                            return _.Zb({
                                lat: a[1],
                                lng: a[0]
                            })
                        }
                        if (!b) return [];
                        c = c || {};
                        var l = _.Bb(_.oc),
                            n = _.Bb(h),
                            p = _.Bb(g),
                            q = _.Bb(function(a) {
                                a = n(a);
                                if (!a.length) throw _.vb("contains no elements");
                                if (!a[0].b(a[a.length - 1])) throw _.vb("first and last positions are not equal");
                                return new _.Xd(a.slice(0, -1))
                            }),
                            r = _.Bb(f),
                            x = _.Bb(e),
                            z = _.Bb(d);
                        if ("FeatureCollection" == b.type) {
                            b = b.features;
                            try {
                                return _.Oa(z(b), function(b) {
                                    return a.add(b)
                                })
                            } catch (w) {
                                throw _.vb('in property "features"', w);
                            }
                        }
                        if ("Feature" == b.type) return [a.add(d(b))];
                        throw _.vb("not a Feature or FeatureCollection");
                    };
                    se = function(a) {
                        var b = this;
                        this.setValues(a || {});
                        this.b = new Ld;
                        _.B.forward(this.b, "addfeature", this);
                        _.B.forward(this.b, "removefeature", this);
                        _.B.forward(this.b, "setgeometry", this);
                        _.B.forward(this.b, "setproperty", this);
                        _.B.forward(this.b, "removeproperty", this);
                        this.f = new Pd(this.b);
                        this.f.bindTo("map", this);
                        this.f.bindTo("style", this);
                        _.G(_.re, function(a) {
                            _.B.forward(b.f, a, b)
                        });
                        this.j = !1
                    };
                    te = function(a) {
                        a.j || (a.j = !0, _.J("drawing_impl", function(b) {
                            b.vm(a)
                        }))
                    };
                    _.ue = function(a) {
                        this.b = a || []
                    };
                    _.ve = function(a) {
                        this.b = a || []
                    };
                    we = function(a) {
                        this.b = a || []
                    };
                    _.xe = function(a) {
                        this.b = a || []
                    };
                    _.ye = function(a) {
                        this.b = a || []
                    };
                    ze = function(a) {
                        if (!a) return null;
                        var b;
                        _.xa(a) ? (b = window.document.createElement("div"), b.style.overflow = "auto", b.innerHTML = a) : a.nodeType == window.Node.TEXT_NODE ? (b = window.document.createElement("div"), b.appendChild(a)) : b = a;
                        return b
                    };
                    Ae = function(a, b) {
                        this.b = a;
                        this.qd = b;
                        a.addListener("map_changed", (0, _.u)(this.vn, this));
                        this.bindTo("map", a);
                        this.bindTo("disableAutoPan", a);
                        this.bindTo("maxWidth", a);
                        this.bindTo("position", a);
                        this.bindTo("zIndex", a);
                        this.bindTo("internalAnchor", a, "anchor");
                        this.bindTo("internalContent", a, "content");
                        this.bindTo("internalPixelOffset", a, "pixelOffset")
                    };
                    Be = function(a, b, c, d) {
                        c ? a.bindTo(b, c, d) : (a.unbind(b), a.set(b, void 0))
                    };
                    _.Ce = function(a) {
                        function b() {
                            e || (e = !0, _.J("infowindow", function(a) {
                                a.Tk(d)
                            }))
                        }
                        window.setTimeout(function() {
                            _.J("infowindow", _.ta)
                        }, 100);
                        a = a || {};
                        var c = !!a.qd;
                        delete a.qd;
                        var d = new Ae(this, c),
                            e = !1;
                        _.B.addListenerOnce(this, "anchor_changed", b);
                        _.B.addListenerOnce(this, "map_changed", b);
                        this.setValues(a)
                    };
                    _.Ee = function(a) {
                        _.De && a && _.De.push(a)
                    };
                    Fe = function(a) {
                        this.setValues(a)
                    };
                    Ge = _.k();
                    He = _.k();
                    Ie = _.k();
                    _.Je = function() {
                        _.J("geocoder", _.ta)
                    };
                    _.Ke = function(a, b, c) {
                        this.J = null;
                        this.set("url", a);
                        this.set("bounds", _.Eb(_.Jd)(b));
                        this.setValues(c)
                    };
                    Le = function(a, b) {
                        _.Ua(a) ? (this.set("url", a), this.setValues(b)) : this.setValues(a)
                    };
                    _.Me = function() {
                        var a = this;
                        _.J("layers", function(b) {
                            b.b(a)
                        })
                    };
                    Ne = function(a) {
                        this.setValues(a);
                        var b = this;
                        _.J("layers", function(a) {
                            a.f(b)
                        })
                    };
                    Oe = function() {
                        var a = this;
                        _.J("layers", function(b) {
                            b.j(a)
                        })
                    };
                    Pe = function(a) {
                        this.b = a || []
                    };
                    Qe = function(a) {
                        this.b = a || []
                    };
                    Re = function(a) {
                        this.b = a || []
                    };
                    Se = function(a) {
                        this.b = a || []
                    };
                    _.Te = function(a) {
                        this.b = a || []
                    };
                    _.Ue = function(a) {
                        this.b = a || []
                    };
                    _.Ve = function(a) {
                        this.b = a || []
                    };
                    _.We = function(a) {
                        this.b = a || []
                    };
                    Xe = function(a) {
                        this.b = a || []
                    };
                    af = function(a) {
                        this.b = a || []
                    };
                    bf = function(a) {
                        this.b = a || []
                    };
                    cf = function(a) {
                        this.b = a || []
                    };
                    df = function(a) {
                        this.b = a || []
                    };
                    _.ef = function(a) {
                        this.b = a || []
                    };
                    _.ff = function(a) {
                        this.b = a || []
                    };
                    _.gf = function(a) {
                        a = a.b[0];
                        return null != a ? a : ""
                    };
                    _.hf = function(a) {
                        a = a.b[1];
                        return null != a ? a : ""
                    };
                    _.kf = function() {
                        var a = _.jf(_.P).b[9];
                        return null != a ? a : ""
                    };
                    lf = function() {
                        var a = _.jf(_.P).b[7];
                        return null != a ? a : ""
                    };
                    mf = function() {
                        var a = _.jf(_.P).b[12];
                        return null != a ? a : ""
                    };
                    nf = function(a) {
                        a = a.b[0];
                        return null != a ? a : ""
                    };
                    _.of = function(a) {
                        a = a.b[1];
                        return null != a ? a : ""
                    };
                    qf = function() {
                        var a = _.P.b[4],
                            a = (a ? new bf(a) : pf).b[0];
                        return null != a ? a : 0
                    };
                    _.rf = function() {
                        var a = _.P.b[0];
                        return null != a ? a : 1
                    };
                    _.sf = function(a) {
                        a = a.b[6];
                        return null != a ? a : ""
                    };
                    tf = function() {
                        var a = _.P.b[11];
                        return null != a ? a : ""
                    };
                    _.uf = function() {
                        var a = _.P.b[16];
                        return null != a ? a : ""
                    };
                    _.jf = function(a) {
                        return (a = a.b[2]) ? new Xe(a) : vf
                    };
                    _.xf = function() {
                        var a = _.P.b[3];
                        return a ? new af(a) : wf
                    };
                    zf = function() {
                        var a = _.P.b[33];
                        return a ? new Pe(a) : yf
                    };
                    Af = function(a) {
                        return _.N(_.P.b, 8)[a]
                    };
                    Cf = function() {
                        var a = _.P.b[36],
                            a = (a ? new df(a) : Bf).b[0];
                        return null != a ? a : ""
                    };
                    Ff = function(a, b) {
                        _.Cc.call(this);
                        _.Ee(a);
                        this.__gm = new _.C;
                        this.j = null;
                        b && b.client && (this.j = _.Df[b.client] || null);
                        var c = this.controls = [];
                        _.Ia(_.Ef, function(a, b) {
                            c[b] = new _.xc
                        });
                        this.m = !0;
                        this.f = a;
                        this.setPov(new _.Bc(0, 0, 1));
                        b && b.zb && !_.A(b.zb.zoom) && (b.zb.zoom = _.A(b.zoom) ? b.zoom : 1);
                        this.setValues(b);
                        void 0 == this.getVisible() && this.setVisible(!0);
                        this.__gm.Hc = b && b.Hc || new _.yc;
                        _.B.addListenerOnce(this, "pano_changed", _.Za(function() {
                            _.J("marker", (0, _.u)(function(a) {
                                a.b(this.__gm.Hc, this)
                            }, this))
                        }))
                    };
                    _.Gf = function() {
                        this.l = [];
                        this.f = this.b = this.j = null
                    };
                    Hf = function(a, b, c) {
                        this.V = b;
                        this.b = new _.bd(new _.Ac([]));
                        this.C = new _.yc;
                        this.K = new _.xc;
                        this.G = new _.yc;
                        this.H = new _.yc;
                        this.l = new _.yc;
                        var d = this.Hc = new _.yc;
                        d.b = function() {
                            delete d.b;
                            _.J("marker", _.Za(function(b) {
                                b.b(d, a)
                            }))
                        };
                        this.j = new Ff(b, {
                            visible: !1,
                            enableCloseButton: !0,
                            Hc: d
                        });
                        this.j.bindTo("reportErrorControl", a);
                        this.j.m = !1;
                        this.f = new _.Gf;
                        this.X = c
                    };
                    _.If = function() {
                        this.T = new Uc
                    };
                    _.Jf = function() {
                        this.b = new _.L(128, 128);
                        this.j = 256 / 360;
                        this.l = 256 / (2 * Math.PI);
                        this.f = !0
                    };
                    _.Kf = function(a) {
                        this.L = this.M = window.Infinity;
                        this.R = this.O = -window.Infinity;
                        _.G(a || [], this.extend, this)
                    };
                    _.Lf = function(a, b, c, d) {
                        var e = new _.Kf;
                        e.M = a;
                        e.L = b;
                        e.O = c;
                        e.R = d;
                        return e
                    };
                    _.Nf = function(a, b, c) {
                        if (a = a.fromLatLngToPoint(b)) c = Math.pow(2, c), a.x *= c, a.y *= c;
                        return a
                    };
                    _.Of = function(a, b) {
                        var c = a.lat() + _.Tb(b);
                        90 < c && (c = 90);
                        var d = a.lat() - _.Tb(b); - 90 > d && (d = -90);
                        b = Math.sin(b);
                        var e = Math.cos(_.Sb(a.lat()));
                        if (90 == c || -90 == d || 1E-6 > e) return new _.Gd(new _.H(d, -180), new _.H(c, 180));
                        b = _.Tb(Math.asin(b / e));
                        return new _.Gd(new _.H(d, a.lng() - b), new _.H(c, a.lng() + b))
                    };
                    _.Pf = function(a) {
                        this.ol = a || 0;
                        _.B.bind(this, "forceredraw", this, this.C)
                    };
                    _.Qf = function(a, b) {
                        a = a.style;
                        a.width = b.width + b.j;
                        a.height = b.height + b.f
                    };
                    _.Rf = function(a) {
                        return new _.M(a.offsetWidth, a.offsetHeight)
                    };
                    Sf = function(a) {
                        this.b = a || []
                    };
                    Tf = function(a) {
                        this.b = a || []
                    };
                    Uf = function(a) {
                        this.b = a || []
                    };
                    Vf = function(a) {
                        this.b = a || []
                    };
                    Wf = function(a) {
                        this.b = a || []
                    };
                    Xf = function(a, b, c, d) {
                        _.Pf.call(this);
                        this.m = b;
                        this.l = new _.Jf;
                        this.D = c + "/maps/api/js/StaticMapService.GetMapImage";
                        this.f = this.b = null;
                        this.j = d;
                        this.set("div", a);
                        this.set("loading", !0)
                    };
                    Zf = function(a) {
                        var b = a.get("tilt") || a.get("mapMaker") || _.y(a.get("styles"));
                        a = a.get("mapTypeId");
                        return b ? null : Yf[a]
                    };
                    $f = function(a) {
                        a.parentNode && a.parentNode.removeChild(a)
                    };
                    ag = function(a, b) {
                        var c = a.f;
                        c.onload = null;
                        c.onerror = null;
                        b && (c.parentNode || a.b.appendChild(c), _.Qf(c, a.get("size")), _.B.trigger(a, "staticmaploaded"), a.j.set(_.Ga()));
                        a.set("loading", !1)
                    };
                    bg = function(a, b) {
                        var c = a.f;
                        b != c.src ? ($f(c), c.onload = function() {
                            ag(a, !0)
                        }, c.onerror = function() {
                            ag(a, !1)
                        }, c.src = b) : !c.parentNode && b && a.b.appendChild(c)
                    };
                    dg = function(a, b, c, d, e) {
                        var f = _.cg[15] ? mf() : lf();
                        this.b = a;
                        this.f = d;
                        this.j = _.sa(e) ? e : _.Ga();
                        var g = f + "/csi?v=2&s=mapsapi3&v3v=" + Cf() + "&action=" + a;
                        _.Ec(c, function(a, b) {
                            g += "&" + (0, window.encodeURIComponent)(b) + "=" + (0, window.encodeURIComponent)(a)
                        });
                        b && (g += "&e=" + b);
                        this.l = g
                    };
                    _.fg = function(a, b) {
                        var c = {};
                        c[b] = void 0;
                        _.eg(a, c)
                    };
                    _.eg = function(a, b) {
                        var c = "";
                        _.Ec(b, function(a, b) {
                            var f = (null != a ? a : _.Ga()) - this.j;
                            c && (c += ",");
                            c += b + "." + Math.round(f);
                            null == a && window.performance && window.performance.mark && window.performance.mark("mapsapi:" + this.b + ":" + b)
                        }, a);
                        b = a.l + "&rt=" + c;
                        a.f.createElement("img").src = b;
                        (a = _.Jc.__gm_captureCSI) && a(b)
                    };
                    _.gg = function(a, b) {
                        b = b || {};
                        var c = b.Sn || {},
                            d = _.N(_.P.b, 12).join(",");
                        d && (c.libraries = d);
                        var d = _.sf(_.P),
                            e = zf(),
                            f = [];
                        d && f.push(d);
                        _.G(e.B(), function(a, b) {
                            a && _.G(a, function(a, c) {
                                null != a && f.push(b + 1 + "_" + (c + 1) + "_" + a)
                            })
                        });
                        b.Pl && (f = f.concat(b.Pl));
                        return new dg(a, f.join(","), c, b.document || window.document, b.startTime)
                    };
                    ig = function() {
                        this.f = _.gg("apiboot2", {
                            startTime: _.hg
                        });
                        _.fg(this.f, "main");
                        this.b = !1
                    };
                    kg = function() {
                        var a = jg;
                        a.b || (a.b = !0, _.fg(a.f, "firstmap"))
                    };
                    _.lg = _.k();
                    _.mg = function() {
                        this.b = ""
                    };
                    _.ng = function(a) {
                        var b = new _.mg;
                        b.b = a;
                        return b
                    };
                    _.pg = function() {
                        this.Pf = "";
                        this.gk = _.og;
                        this.b = null
                    };
                    _.qg = function(a, b) {
                        var c = new _.pg;
                        c.Pf = a;
                        c.b = b;
                        return c
                    };
                    _.rg = function(a, b) {
                        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
                    };
                    _.sg = function(a) {
                        a && a.parentNode && a.parentNode.removeChild(a)
                    };
                    tg = function(a, b, c, d, e) {
                        this.b = !!b;
                        this.node = null;
                        this.f = 0;
                        this.j = !1;
                        this.l = !c;
                        a && this.setPosition(a, d);
                        this.depth = void 0 != e ? e : this.f || 0;
                        this.b && (this.depth *= -1)
                    };
                    ug = function(a, b, c, d) {
                        tg.call(this, a, b, c, null, d)
                    };
                    _.wg = function(a) {
                        for (var b; b = a.firstChild;) _.vg(b), a.removeChild(b)
                    };
                    _.vg = function(a) {
                        a = new ug(a);
                        try {
                            for (;;) _.B.clearInstanceListeners(a.next())
                        } catch (b) {
                            if (b !== _.xg) throw b;
                        }
                    };
                    Ag = function(a, b) {
                        var c = _.Ga();
                        jg && kg();
                        var d = new _.If;
                        _.Kd.call(this, new Hf(this, a, d));
                        var e = b || {};
                        _.Sa(e.mapTypeId) || (e.mapTypeId = "roadmap");
                        this.setValues(e);
                        this.b = _.cg[15] && e.noControlsOrLogging;
                        this.mapTypes = new yd;
                        this.features = new _.C;
                        _.Ee(a);
                        this.notify("streetView");
                        b = _.Rf(a);
                        e.noClear || _.wg(a);
                        var f = null;
                        _.P && yg(e.useStaticMap, b) && (f = new Xf(a, _.zg, _.kf(), new _.bd(null)), _.B.forward(f, "staticmaploaded", this), f.set("size", b), f.bindTo("center", this), f.bindTo("zoom", this), f.bindTo("mapTypeId",
                            this), f.bindTo("styles", this), f.bindTo("mapMaker", this));
                        this.overlayMapTypes = new _.xc;
                        var g = this.controls = [];
                        _.Ia(_.Ef, function(a, b) {
                            g[b] = new _.xc
                        });
                        var h = this,
                            l = !0;
                        _.J("map", function(a) {
                            a.f(h, e, f, l, c, d)
                        });
                        l = !1;
                        this.data = new se({
                            map: this
                        })
                    };
                    yg = function(a, b) {
                        if (_.Sa(a)) return !!a;
                        a = b.width;
                        b = b.height;
                        return 384E3 >= a * b && 800 >= a && 800 >= b
                    };
                    Bg = function() {
                        _.J("maxzoom", _.ta)
                    };
                    Cg = function(a, b) {
                        !a || _.Ua(a) || _.A(a) ? (this.set("tableId", a), this.setValues(b)) : this.setValues(a)
                    };
                    _.Dg = _.k();
                    _.Eg = function(a) {
                        this.setValues(ee(a));
                        _.J("poly", _.ta)
                    };
                    _.Fg = function(a) {
                        this.setValues(ee(a));
                        _.J("poly", _.ta)
                    };
                    Gg = function() {
                        this.b = null
                    };
                    _.Hg = function() {
                        this.b = null
                    };
                    _.Ig = function(a) {
                        this.tileSize = a.tileSize || new _.M(256, 256);
                        this.name = a.name;
                        this.alt = a.alt;
                        this.minZoom = a.minZoom;
                        this.maxZoom = a.maxZoom;
                        this.j = (0, _.u)(a.getTileUrl, a);
                        this.b = new _.yc;
                        this.f = null;
                        this.set("opacity", a.opacity);
                        _.Jc.window && _.B.addDomListener(window, "online", (0, _.u)(this.On, this));
                        var b = this;
                        _.J("map", function(a) {
                            var d = b.f = a.b,
                                e = b.tileSize || new _.M(256, 256);
                            b.b.forEach(function(a) {
                                var c = a.__gmimt,
                                    h = c.$,
                                    l = c.zoom,
                                    n = b.j(h, l);
                                c.Bb = d(h, l, e, a, n, function() {
                                    _.B.trigger(a, "load")
                                })
                            })
                        })
                    };
                    Jg = function(a, b) {
                        null != a.style.opacity ? a.style.opacity = b : a.style.filter = b && "alpha(opacity=" + Math.round(100 * b) + ")"
                    };
                    Kg = function(a) {
                        a = a.get("opacity");
                        return "number" == typeof a ? a : 1
                    };
                    _.Lg = _.k();
                    _.Mg = function(a, b) {
                        this.set("styles", a);
                        a = b || {};
                        this.b = a.baseMapTypeId || "roadmap";
                        this.minZoom = a.minZoom;
                        this.maxZoom = a.maxZoom || 20;
                        this.name = a.name;
                        this.alt = a.alt;
                        this.projection = null;
                        this.tileSize = new _.M(256, 256)
                    };
                    _.Ng = function(a, b) {
                        _.Cb(yb, "container is not a Node")(a);
                        this.setValues(b);
                        _.J("controls", (0, _.u)(function(b) {
                            b.nl(this, a)
                        }, this))
                    };
                    Og = _.ma("b");
                    Pg = function(a, b, c) {
                        for (var d = Array(b.length), e = 0, f = b.length; e < f; ++e) d[e] = b.charCodeAt(e);
                        d.unshift(c);
                        a = a.b;
                        c = b = 0;
                        for (e = d.length; c < e; ++c) b *= 1729, b += d[c], b %= a;
                        return b
                    };
                    Ug = function() {
                        var a = qf(),
                            b = new Og(131071),
                            c = (0, window.unescape)("%26%74%6F%6B%65%6E%3D");
                        return function(d) {
                            d = d.replace(Sg, "%27");
                            var e = d + c;
                            Tg || (Tg = /(?:https?:\/\/[^/]+)?(.*)/);
                            d = Tg.exec(d);
                            return e + Pg(b, d && d[1], a)
                        }
                    };
                    Vg = function() {
                        var a = new Og(2147483647);
                        return function(b) {
                            return Pg(a, b, 0)
                        }
                    };
                    Wg = function(a) {
                        for (var b = a.split("."), c = window, d = window, e = 0; e < b.length; e++)
                            if (d = c, c = c[b[e]], !c) throw _.vb(a + " is not a function");
                        return function() {
                            c.apply(d)
                        }
                    };
                    Xg = function() {
                        for (var a in Object.prototype) window.console && window.console.error("This site adds property <" + a + "> to Object.prototype. Extending Object.prototype breaks JavaScript for..in loops, which are used heavily in Google Maps API v3.")
                    };
                    Yg = function(a) {
                        (a = "version" in a) && window.console && window.console.error("You have included the Google Maps API multiple times on this page. This may cause unexpected errors.");
                        return a
                    };
                    _.pa = [];
                    _.Jc = this;
                    Ba = "closure_uid_" + (1E9 * Math.random() >>> 0);
                    Ca = 0;
                    var kb, lb;
                    _.B = {};
                    kb = "undefined" != typeof window.navigator && -1 != window.navigator.userAgent.toLowerCase().indexOf("msie");
                    lb = {};
                    _.B.addListener = function(a, b, c) {
                        return new mb(a, b, c, 0)
                    };
                    _.B.hasListeners = function(a, b) {
                        b = (a = a.__e3_) && a[b];
                        return !!b && !_.Ka(b)
                    };
                    _.B.removeListener = function(a) {
                        a && a.remove()
                    };
                    _.B.clearListeners = function(a, b) {
                        _.Ia(gb(a, b), function(a, b) {
                            b && b.remove()
                        })
                    };
                    _.B.clearInstanceListeners = function(a) {
                        _.Ia(gb(a), function(a, c) {
                            c && c.remove()
                        })
                    };
                    _.B.trigger = function(a, b, c) {
                        if (_.B.hasListeners(a, b)) {
                            var d = Wa(arguments, 2),
                                e = gb(a, b),
                                f;
                            for (f in e) {
                                var g = e[f];
                                g && g.b.apply(g.Ra, d)
                            }
                        }
                    };
                    _.B.addDomListener = function(a, b, c, d) {
                        if (a.addEventListener) {
                            var e = d ? 4 : 1;
                            a.addEventListener(b, c, d);
                            c = new mb(a, b, c, e)
                        } else a.attachEvent ? (c = new mb(a, b, c, 2), a.attachEvent("on" + b, nb(c))) : (a["on" + b] = c, c = new mb(a, b, c, 3));
                        return c
                    };
                    _.B.addDomListenerOnce = function(a, b, c, d) {
                        var e = _.B.addDomListener(a, b, function() {
                            e.remove();
                            return c.apply(this, arguments)
                        }, d);
                        return e
                    };
                    _.B.W = function(a, b, c, d) {
                        return _.B.addDomListener(a, b, hb(c, d))
                    };
                    _.B.bind = function(a, b, c, d) {
                        return _.B.addListener(a, b, (0, _.u)(d, c))
                    };
                    _.B.addListenerOnce = function(a, b, c) {
                        var d = _.B.addListener(a, b, function() {
                            d.remove();
                            return c.apply(this, arguments)
                        });
                        return d
                    };
                    _.B.forward = function(a, b, c) {
                        return _.B.addListener(a, b, ib(b, c))
                    };
                    _.B.Ha = function(a, b, c, d) {
                        return _.B.addDomListener(a, b, ib(b, c, !d))
                    };
                    _.B.Oi = function() {
                        var a = lb,
                            b;
                        for (b in a) a[b].remove();
                        lb = {};
                        (a = _.Jc.CollectGarbage) && a()
                    };
                    _.B.ko = function() {
                        kb && _.B.addDomListener(window, "unload", _.B.Oi)
                    };
                    var jb = 0;
                    mb.prototype.remove = function() {
                        if (this.Ra) {
                            switch (this.l) {
                                case 1:
                                    this.Ra.removeEventListener(this.f, this.b, !1);
                                    break;
                                case 4:
                                    this.Ra.removeEventListener(this.f, this.b, !0);
                                    break;
                                case 2:
                                    this.Ra.detachEvent("on" + this.f, this.j);
                                    break;
                                case 3:
                                    this.Ra["on" + this.f] = null
                            }
                            delete fb(this.Ra, this.f)[this.id];
                            this.j = this.b = this.Ra = null;
                            delete lb[this.id]
                        }
                    };
                    _.t = _.C.prototype;
                    _.t.get = function(a) {
                        var b = tb(this);
                        a += "";
                        b = $a(b, a);
                        if (_.Sa(b)) {
                            if (b) {
                                a = b.jb;
                                var b = b.Ic,
                                    c = "get" + _.sb(a);
                                return b[c] ? b[c]() : b.get(a)
                            }
                            return this[a]
                        }
                    };
                    _.t.set = function(a, b) {
                        var c = tb(this);
                        a += "";
                        var d = $a(c, a);
                        if (d)
                            if (a = d.jb, d = d.Ic, c = "set" + _.sb(a), d[c]) d[c](b);
                            else d.set(a, b);
                        else this[a] = b, c[a] = null, qb(this, a)
                    };
                    _.t.notify = function(a) {
                        var b = tb(this);
                        a += "";
                        (b = $a(b, a)) ? b.Ic.notify(b.jb): qb(this, a)
                    };
                    _.t.setValues = function(a) {
                        for (var b in a) {
                            var c = a[b],
                                d = "set" + _.sb(b);
                            if (this[d]) this[d](c);
                            else this.set(b, c)
                        }
                    };
                    _.t.setOptions = _.C.prototype.setValues;
                    _.t.changed = _.k();
                    var rb = {};
                    _.C.prototype.bindTo = function(a, b, c, d) {
                        a += "";
                        c = (c || a) + "";
                        this.unbind(a);
                        var e = {
                                Ic: this,
                                jb: a
                            },
                            f = {
                                Ic: b,
                                jb: c,
                                gh: e
                            };
                        tb(this)[a] = f;
                        pb(b, c)[_.ob(e)] = e;
                        d || qb(this, a)
                    };
                    _.C.prototype.unbind = function(a) {
                        var b = tb(this),
                            c = b[a];
                        c && (c.gh && delete pb(c.Ic, c.jb)[_.ob(c.gh)], this[a] = this.get(a), b[a] = null)
                    };
                    _.C.prototype.unbindAll = function() {
                        var a = (0, _.u)(this.unbind, this),
                            b = tb(this),
                            c;
                        for (c in b) a(c)
                    };
                    _.C.prototype.addListener = function(a, b) {
                        return _.B.addListener(this, a, b)
                    };
                    _.Zg = {
                        ROADMAP: "roadmap",
                        SATELLITE: "satellite",
                        HYBRID: "hybrid",
                        TERRAIN: "terrain"
                    };
                    _.Ef = {
                        TOP_LEFT: 1,
                        TOP_CENTER: 2,
                        TOP: 2,
                        TOP_RIGHT: 3,
                        LEFT_CENTER: 4,
                        LEFT_TOP: 5,
                        LEFT: 5,
                        LEFT_BOTTOM: 6,
                        RIGHT_TOP: 7,
                        RIGHT: 7,
                        RIGHT_CENTER: 8,
                        RIGHT_BOTTOM: 9,
                        BOTTOM_LEFT: 10,
                        BOTTOM_CENTER: 11,
                        BOTTOM: 11,
                        BOTTOM_RIGHT: 12,
                        CENTER: 13
                    };
                    var $g = {
                        Kp: "Point",
                        Ip: "LineString",
                        POLYGON: "Polygon"
                    };
                    _.v(ub, Error);
                    var bh;
                    _.oc = _.Cb(_.A, "not a number");
                    _.ah = _.Cb(_.Ua, "not a string");
                    bh = _.Cb(_.Va, "not a boolean");
                    _.ch = _.Eb(_.oc);
                    _.dh = _.Eb(_.ah);
                    _.eh = _.Eb(bh);
                    var Ub = _.xb({
                        lat: _.oc,
                        lng: _.oc
                    }, !0);
                    _.H.prototype.toString = function() {
                        return "(" + this.lat() + ", " + this.lng() + ")"
                    };
                    _.H.prototype.toJSON = function() {
                        return {
                            lat: this.lat(),
                            lng: this.lng()
                        }
                    };
                    _.H.prototype.b = function(a) {
                        return a ? _.Na(this.lat(), a.lat()) && _.Na(this.lng(), a.lng()) : !1
                    };
                    _.H.prototype.equals = _.H.prototype.b;
                    _.H.prototype.toUrlValue = function(a) {
                        a = _.Sa(a) ? a : 6;
                        return Xb(this.lat(), a) + "," + Xb(this.lng(), a)
                    };
                    _.Sd = _.Bb(_.Zb);
                    _.v(_.$b, Yb);
                    _.$b.prototype.getType = _.oa("Point");
                    _.$b.prototype.forEachLatLng = function(a) {
                        a(this.b)
                    };
                    _.$b.prototype.get = _.m("b");
                    var Qd = _.Bb(ac);
                    _.ua(gc);
                    gc.prototype.Pb = function(a, b) {
                        var c = this,
                            d = c.m;
                        hc(c.j, function(e) {
                            for (var f = e.Wh[a] || [], g = e.vo[a] || [], h = d[a] = _.bc(f.length, function() {
                                    delete d[a];
                                    b(e.ul);
                                    for (var f = c.f[a], h = f ? f.length : 0, l = 0; l < h; ++l) f[l](c.b[a]);
                                    delete c.f[a];
                                    l = 0;
                                    for (f = g.length; l < f; ++l) h = g[l], d[h] && d[h]()
                                }), l = 0, n = f.length; l < n; ++l) c.b[f[l]] && h()
                        })
                    };
                    _.t = _.nc.prototype;
                    _.t.getId = _.m("j");
                    _.t.getGeometry = _.m("b");
                    _.t.setGeometry = function(a) {
                        var b = this.b;
                        try {
                            this.b = a ? ac(a) : null
                        } catch (c) {
                            _.wb(c);
                            return
                        }
                        _.B.trigger(this, "setgeometry", {
                            feature: this,
                            newGeometry: this.b,
                            oldGeometry: b
                        })
                    };
                    _.t.getProperty = function(a) {
                        return $a(this.f, a)
                    };
                    _.t.setProperty = function(a, b) {
                        if (void 0 === b) this.removeProperty(a);
                        else {
                            var c = this.getProperty(a);
                            this.f[a] = b;
                            _.B.trigger(this, "setproperty", {
                                feature: this,
                                name: a,
                                newValue: b,
                                oldValue: c
                            })
                        }
                    };
                    _.t.removeProperty = function(a) {
                        var b = this.getProperty(a);
                        delete this.f[a];
                        _.B.trigger(this, "removeproperty", {
                            feature: this,
                            name: a,
                            oldValue: b
                        })
                    };
                    _.t.forEachProperty = function(a) {
                        for (var b in this.f) a(this.getProperty(b), b)
                    };
                    _.t.toGeoJson = function(a) {
                        var b = this;
                        _.J("data", function(c) {
                            c.f(b, a)
                        })
                    };
                    _.fh = new _.L(0, 0);
                    _.L.prototype.toString = function() {
                        return "(" + this.x + ", " + this.y + ")"
                    };
                    _.L.prototype.b = function(a) {
                        return a ? a.x == this.x && a.y == this.y : !1
                    };
                    _.L.prototype.equals = _.L.prototype.b;
                    _.L.prototype.round = function() {
                        this.x = Math.round(this.x);
                        this.y = Math.round(this.y)
                    };
                    _.L.prototype.ze = _.ra(0);
                    _.gh = new _.M(0, 0);
                    _.M.prototype.toString = function() {
                        return "(" + this.width + ", " + this.height + ")"
                    };
                    _.M.prototype.b = function(a) {
                        return a ? a.width == this.width && a.height == this.height : !1
                    };
                    _.M.prototype.equals = _.M.prototype.b;
                    var hh = {
                        CIRCLE: 0,
                        FORWARD_CLOSED_ARROW: 1,
                        FORWARD_OPEN_ARROW: 2,
                        BACKWARD_CLOSED_ARROW: 3,
                        BACKWARD_OPEN_ARROW: 4
                    };
                    _.v(_.xc, _.C);
                    _.t = _.xc.prototype;
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.indexOf = function(a) {
                        for (var b = 0, c = this.b.length; b < c; ++b)
                            if (a === this.b[b]) return b;
                        return -1
                    };
                    _.t.forEach = function(a) {
                        for (var b = 0, c = this.b.length; b < c; ++b) a(this.b[b], b)
                    };
                    _.t.setAt = function(a, b) {
                        var c = this.b[a],
                            d = this.b.length;
                        if (a < d) this.b[a] = b, _.B.trigger(this, "set_at", a, c), this.l && this.l(a, c);
                        else {
                            for (c = d; c < a; ++c) this.insertAt(c, void 0);
                            this.insertAt(a, b)
                        }
                    };
                    _.t.insertAt = function(a, b) {
                        this.b.splice(a, 0, b);
                        wc(this);
                        _.B.trigger(this, "insert_at", a);
                        this.f && this.f(a)
                    };
                    _.t.removeAt = function(a) {
                        var b = this.b[a];
                        this.b.splice(a, 1);
                        wc(this);
                        _.B.trigger(this, "remove_at", a, b);
                        this.j && this.j(a, b);
                        return b
                    };
                    _.t.push = function(a) {
                        this.insertAt(this.b.length, a);
                        return this.b.length
                    };
                    _.t.pop = function() {
                        return this.removeAt(this.b.length - 1)
                    };
                    _.t.getArray = _.m("b");
                    _.t.clear = function() {
                        for (; this.get("length");) this.pop()
                    };
                    _.tc(_.xc.prototype, {
                        length: null
                    });
                    _.yc.prototype.remove = function(a) {
                        var b = this.f,
                            c = this.j(a);
                        b[c] && (delete b[c], _.B.trigger(this, "remove", a), this.onRemove && this.onRemove(a))
                    };
                    _.yc.prototype.contains = function(a) {
                        return !!this.f[this.j(a)]
                    };
                    _.yc.prototype.forEach = function(a) {
                        var b = this.f,
                            c;
                        for (c in b) a.call(this, b[c])
                    };
                    _.Ac.prototype.ab = _.ra(1);
                    _.Ac.prototype.forEach = function(a, b) {
                        _.G(this.b, function(c, d) {
                            a.call(b, c, d)
                        })
                    };
                    var ih = _.xb({
                        zoom: _.ch,
                        heading: _.oc,
                        pitch: _.oc
                    });
                    _.v(_.Cc, _.C);
                    var jh = function(a) {
                        return function() {
                            return a
                        }
                    }(null);
                    a: {
                        var kh = _.Jc.navigator;
                        if (kh) {
                            var lh = kh.userAgent;
                            if (lh) {
                                _.Jb = lh;
                                break a
                            }
                        }
                        _.Jb = ""
                    };
                    var Nc, Mc = _.Dc;
                    Qc.prototype.get = function() {
                        var a;
                        0 < this.f ? (this.f--, a = this.b, this.b = a.next, a.next = null) : a = this.j();
                        return a
                    };
                    var mh = new Qc(function() {
                        return new Sc
                    }, function(a) {
                        a.reset()
                    }, 100);
                    Rc.prototype.add = function(a, b) {
                        var c = mh.get();
                        c.set(a, b);
                        this.f ? this.f.next = c : this.b = c;
                        this.f = c
                    };
                    Rc.prototype.remove = function() {
                        var a = null;
                        this.b && (a = this.b, this.b = this.b.next, this.b || (this.f = null), a.next = null);
                        return a
                    };
                    Sc.prototype.set = function(a, b) {
                        this.Dc = a;
                        this.b = b;
                        this.next = null
                    };
                    Sc.prototype.reset = function() {
                        this.next = this.b = this.Dc = null
                    };
                    _.Lc.m = function() {
                        if (_.Jc.Promise && _.Jc.Promise.resolve) {
                            var a = _.Jc.Promise.resolve(void 0);
                            _.Lc.b = function() {
                                a.then(_.Lc.f)
                            }
                        } else _.Lc.b = function() {
                            Pc()
                        }
                    };
                    _.Lc.C = function(a) {
                        _.Lc.b = function() {
                            Pc();
                            a && a(_.Lc.f)
                        }
                    };
                    _.Lc.j = !1;
                    _.Lc.l = new Rc;
                    _.Lc.f = function() {
                        for (var a; a = _.Lc.l.remove();) {
                            try {
                                a.Dc.call(a.b)
                            } catch (c) {
                                Kc(c)
                            }
                            var b = mh;
                            b.m(a);
                            b.f < b.l && (b.f++, a.next = b.b, b.b = a)
                        }
                        _.Lc.j = !1
                    };
                    Uc.prototype.addListener = function(a, b, c) {
                        c = c ? {
                            jh: !1
                        } : null;
                        var d = !this.T.length,
                            e;
                        e = this.T;
                        var f = Pb(e, Tc(a, b));
                        (e = 0 > f ? null : _.xa(e) ? e.charAt(f) : e[f]) ? e.Bd = e.Bd && c: this.T.push({
                            Dc: a,
                            context: b || null,
                            Bd: c
                        });
                        d && this.f();
                        return a
                    };
                    Uc.prototype.addListenerOnce = function(a, b) {
                        this.addListener(a, b, !0);
                        return a
                    };
                    Uc.prototype.removeListener = function(a, b) {
                        if (this.T.length) {
                            var c = this.T;
                            a = Pb(c, Tc(a, b));
                            0 <= a && _.Qb(c, a);
                            this.T.length || this.b()
                        }
                    };
                    var Vc = _.Lc;
                    _.t = _.Xc.prototype;
                    _.t.Ad = _.k();
                    _.t.yd = _.k();
                    _.t.addListener = function(a, b) {
                        return this.T.addListener(a, b)
                    };
                    _.t.addListenerOnce = function(a, b) {
                        return this.T.addListenerOnce(a, b)
                    };
                    _.t.removeListener = function(a, b) {
                        return this.T.removeListener(a, b)
                    };
                    _.t.notify = function(a) {
                        _.Wc(this.T, function(a) {
                            a(this.get())
                        }, this, a)
                    };
                    _.v(_.ad, _.Xc);
                    _.ad.prototype.set = function(a) {
                        this.yi(a);
                        this.notify()
                    };
                    _.v(_.bd, _.ad);
                    _.bd.prototype.get = _.m("b");
                    _.bd.prototype.yi = _.ma("b");
                    _.v(cd, _.C);
                    _.nh = _.id("d", void 0);
                    _.oh = _.kd("d");
                    _.ph = _.id("f", void 0);
                    _.Q = _.ld();
                    _.qh = _.jd("i", void 0);
                    _.rh = _.kd("i");
                    _.sh = _.kd("j");
                    _.th = _.id("u", void 0);
                    _.uh = _.jd("u", void 0);
                    _.vh = _.kd("u");
                    _.wh = _.md();
                    _.R = _.nd();
                    _.S = _.od();
                    _.xh = _.kd("e");
                    _.T = _.id("s", void 0);
                    _.yh = _.jd("s", void 0);
                    _.zh = _.kd("s");
                    _.Ah = _.id("x", void 0);
                    _.Bh = _.jd("x", void 0);
                    _.Ch = _.kd("x");
                    _.Dh = _.kd("y");
                    var Fh;
                    _.Eh = new pd;
                    Fh = /'/g;
                    pd.prototype.b = function(a, b) {
                        var c = [];
                        rd(a, b, c);
                        return c.join("&").replace(Fh, "%27")
                    };
                    var Sh, ud, Wh;
                    _.Gh = _.Gc("Opera");
                    _.Hh = _.Hc();
                    _.Ih = _.Gc("Edge");
                    _.Jh = _.Gc("Gecko") && !(_.Kb() && !_.Gc("Edge")) && !(_.Gc("Trident") || _.Gc("MSIE")) && !_.Gc("Edge");
                    _.Kh = _.Kb() && !_.Gc("Edge");
                    _.Lh = _.Gc("Macintosh");
                    _.Mh = _.Gc("Windows");
                    _.Nh = _.Gc("Linux") || _.Gc("CrOS");
                    _.Oh = _.Gc("Android");
                    _.Ph = _.sd();
                    _.Qh = _.Gc("iPad");
                    _.Rh = _.Gc("iPod");
                    a: {
                        var Th = "",
                            Uh = function() {
                                var a = _.Jb;
                                if (_.Jh) return /rv\:([^\);]+)(\)|;)/.exec(a);
                                if (_.Ih) return /Edge\/([\d\.]+)/.exec(a);
                                if (_.Hh) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                                if (_.Kh) return /WebKit\/(\S+)/.exec(a);
                                if (_.Gh) return /(?:Version)[ \/]?(\S+)/.exec(a)
                            }();Uh && (Th = Uh ? Uh[1] : "");
                        if (_.Hh) {
                            var Vh = td();
                            if (null != Vh && Vh > (0, window.parseFloat)(Th)) {
                                Sh = String(Vh);
                                break a
                            }
                        }
                        Sh = Th
                    }
                    _.vd = Sh;
                    ud = {};
                    Wh = _.Jc.document;
                    _.Xh = Wh && _.Hh ? td() || ("CSS1Compat" == Wh.compatMode ? (0, window.parseInt)(_.vd, 10) : 5) : void 0;
                    _.Yh = _.Gc("Firefox");
                    _.Zh = _.sd() || _.Gc("iPod");
                    _.$h = _.Gc("iPad");
                    _.ai = _.Gc("Android") && !(Ic() || _.Gc("Firefox") || _.Gc("Opera") || _.Gc("Silk"));
                    _.bi = Ic();
                    _.ci = _.Gc("Safari") && !(Ic() || _.Gc("Coast") || _.Gc("Opera") || _.Gc("Edge") || _.Gc("Silk") || _.Gc("Android")) && !(_.sd() || _.Gc("iPad") || _.Gc("iPod"));
                    _.xd.prototype.heading = _.m("b");
                    _.xd.prototype.Ja = _.ra(2);
                    _.xd.prototype.toString = function() {
                        return this.b + "," + this.f
                    };
                    _.di = new _.xd;
                    _.v(yd, _.C);
                    yd.prototype.set = function(a, b) {
                        if (null != b && !(b && _.A(b.maxZoom) && b.tileSize && b.tileSize.width && b.tileSize.height && b.getTile && b.getTile.apply)) throw Error("Expected value implementing google.maps.MapType");
                        return _.C.prototype.set.apply(this, arguments)
                    };
                    _.t = zd.prototype;
                    _.t.isEmpty = function() {
                        return 360 == this.b - this.f
                    };
                    _.t.intersects = function(a) {
                        var b = this.b,
                            c = this.f;
                        return this.isEmpty() || a.isEmpty() ? !1 : _.Ad(this) ? _.Ad(a) || a.b <= this.f || a.f >= b : _.Ad(a) ? a.b <= c || a.f >= b : a.b <= c && a.f >= b
                    };
                    _.t.contains = function(a) {
                        -180 == a && (a = 180);
                        var b = this.b,
                            c = this.f;
                        return _.Ad(this) ? (a >= b || a <= c) && !this.isEmpty() : a >= b && a <= c
                    };
                    _.t.extend = function(a) {
                        this.contains(a) || (this.isEmpty() ? this.b = this.f = a : _.Dd(a, this.b) < _.Dd(this.f, a) ? this.b = a : this.f = a)
                    };
                    _.t.Hb = function() {
                        var a = (this.b + this.f) / 2;
                        _.Ad(this) && (a = _.Ma(a + 180, -180, 180));
                        return a
                    };
                    _.t = Ed.prototype;
                    _.t.isEmpty = function() {
                        return this.f > this.b
                    };
                    _.t.intersects = function(a) {
                        var b = this.f,
                            c = this.b;
                        return b <= a.f ? a.f <= c && a.f <= a.b : b <= a.b && b <= c
                    };
                    _.t.contains = function(a) {
                        return a >= this.f && a <= this.b
                    };
                    _.t.extend = function(a) {
                        this.isEmpty() ? this.b = this.f = a : a < this.f ? this.f = a : a > this.b && (this.b = a)
                    };
                    _.t.Hb = function() {
                        return (this.b + this.f) / 2
                    };
                    _.t = _.Gd.prototype;
                    _.t.getCenter = function() {
                        return new _.H(this.f.Hb(), this.b.Hb())
                    };
                    _.t.toString = function() {
                        return "(" + this.getSouthWest() + ", " + this.getNorthEast() + ")"
                    };
                    _.t.toJSON = function() {
                        return {
                            south: this.f.f,
                            west: this.b.b,
                            north: this.f.b,
                            east: this.b.f
                        }
                    };
                    _.t.toUrlValue = function(a) {
                        var b = this.getSouthWest(),
                            c = this.getNorthEast();
                        return [b.toUrlValue(a), c.toUrlValue(a)].join()
                    };
                    _.t.Aj = function(a) {
                        if (!a) return !1;
                        a = _.Jd(a);
                        var b = this.f,
                            c = a.f;
                        return (b.isEmpty() ? c.isEmpty() : 1E-9 >= Math.abs(c.f - b.f) + Math.abs(b.b - c.b)) && _.Cd(this.b, a.b)
                    };
                    _.Gd.prototype.equals = _.Gd.prototype.Aj;
                    _.t = _.Gd.prototype;
                    _.t.contains = function(a) {
                        return this.f.contains(a.lat()) && this.b.contains(a.lng())
                    };
                    _.t.intersects = function(a) {
                        a = _.Jd(a);
                        return this.f.intersects(a.f) && this.b.intersects(a.b)
                    };
                    _.t.extend = function(a) {
                        this.f.extend(a.lat());
                        this.b.extend(a.lng());
                        return this
                    };
                    _.t.union = function(a) {
                        a = _.Jd(a);
                        if (!a || a.isEmpty()) return this;
                        this.extend(a.getSouthWest());
                        this.extend(a.getNorthEast());
                        return this
                    };
                    _.t.getSouthWest = function() {
                        return new _.H(this.f.f, this.b.b, !0)
                    };
                    _.t.getNorthEast = function() {
                        return new _.H(this.f.b, this.b.f, !0)
                    };
                    _.t.toSpan = function() {
                        return new _.H(_.Fd(this.f), _.Bd(this.b), !0)
                    };
                    _.t.isEmpty = function() {
                        return this.f.isEmpty() || this.b.isEmpty()
                    };
                    var Id = _.xb({
                        south: _.oc,
                        west: _.oc,
                        north: _.oc,
                        east: _.oc
                    }, !1);
                    _.v(_.Kd, _.C);
                    _.t = Ld.prototype;
                    _.t.contains = function(a) {
                        return this.b.hasOwnProperty(_.ob(a))
                    };
                    _.t.getFeatureById = function(a) {
                        return $a(this.f, a)
                    };
                    _.t.add = function(a) {
                        a = a || {};
                        a = a instanceof _.nc ? a : new _.nc(a);
                        if (!this.contains(a)) {
                            var b = a.getId();
                            if (b) {
                                var c = this.getFeatureById(b);
                                c && this.remove(c)
                            }
                            c = _.ob(a);
                            this.b[c] = a;
                            b && (this.f[b] = a);
                            var d = _.B.forward(a, "setgeometry", this),
                                e = _.B.forward(a, "setproperty", this),
                                f = _.B.forward(a, "removeproperty", this);
                            this.j[c] = function() {
                                _.B.removeListener(d);
                                _.B.removeListener(e);
                                _.B.removeListener(f)
                            };
                            _.B.trigger(this, "addfeature", {
                                feature: a
                            })
                        }
                        return a
                    };
                    _.t.remove = function(a) {
                        var b = _.ob(a),
                            c = a.getId();
                        if (this.b[b]) {
                            delete this.b[b];
                            c && delete this.f[c];
                            if (c = this.j[b]) delete this.j[b], c();
                            _.B.trigger(this, "removefeature", {
                                feature: a
                            })
                        }
                    };
                    _.t.forEach = function(a) {
                        for (var b in this.b) a(this.b[b])
                    };
                    Od.prototype.get = function(a) {
                        return this.b[a]
                    };
                    Od.prototype.set = function(a, b) {
                        var c = this.b;
                        c[a] || (c[a] = {});
                        _.Ja(c[a], b);
                        _.B.trigger(this, "changed", a)
                    };
                    Od.prototype.reset = function(a) {
                        delete this.b[a];
                        _.B.trigger(this, "changed", a)
                    };
                    Od.prototype.forEach = function(a) {
                        _.Ia(this.b, a)
                    };
                    _.v(Pd, _.C);
                    Pd.prototype.overrideStyle = function(a, b) {
                        this.b.set(_.ob(a), b)
                    };
                    Pd.prototype.revertStyle = function(a) {
                        a ? this.b.reset(_.ob(a)) : this.b.forEach((0, _.u)(this.b.reset, this.b))
                    };
                    _.v(_.Rd, Yb);
                    _.t = _.Rd.prototype;
                    _.t.getType = _.oa("GeometryCollection");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(function(b) {
                            b.forEachLatLng(a)
                        })
                    };
                    _.v(_.Td, Yb);
                    _.t = _.Td.prototype;
                    _.t.getType = _.oa("LineString");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(a)
                    };
                    var Ud = _.Bb(_.zb(_.Td, "google.maps.Data.LineString", !0));
                    _.v(_.Vd, Yb);
                    _.t = _.Vd.prototype;
                    _.t.getType = _.oa("MultiLineString");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(function(b) {
                            b.forEachLatLng(a)
                        })
                    };
                    _.v(_.Wd, Yb);
                    _.t = _.Wd.prototype;
                    _.t.getType = _.oa("MultiPoint");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(a)
                    };
                    _.v(_.Xd, Yb);
                    _.t = _.Xd.prototype;
                    _.t.getType = _.oa("LinearRing");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(a)
                    };
                    var Yd = _.Bb(_.zb(_.Xd, "google.maps.Data.LinearRing", !0));
                    _.v(_.Zd, Yb);
                    _.t = _.Zd.prototype;
                    _.t.getType = _.oa("Polygon");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(function(b) {
                            b.forEachLatLng(a)
                        })
                    };
                    var $d = _.Bb(_.zb(_.Zd, "google.maps.Data.Polygon", !0));
                    _.v(_.ae, Yb);
                    _.t = _.ae.prototype;
                    _.t.getType = _.oa("MultiPolygon");
                    _.t.getLength = function() {
                        return this.b.length
                    };
                    _.t.getAt = function(a) {
                        return this.b[a]
                    };
                    _.t.getArray = function() {
                        return this.b.slice()
                    };
                    _.t.forEachLatLng = function(a) {
                        this.b.forEach(function(b) {
                            b.forEachLatLng(a)
                        })
                    };
                    var ei = _.xb({
                        source: _.ah,
                        webUrl: _.dh,
                        iosDeepLinkId: _.dh
                    });
                    var fi = _.Ha(_.xb({
                        placeId: _.dh,
                        query: _.dh,
                        location: _.Zb
                    }), function(a) {
                        if (a.placeId && a.query) throw _.vb("cannot set both placeId and query");
                        if (!a.placeId && !a.query) throw _.vb("must set one of placeId or query");
                        return a
                    });
                    _.v(be, _.C);
                    _.tc(be.prototype, {
                        position: _.Eb(_.Zb),
                        title: _.dh,
                        icon: _.Eb(_.Db(_.ah, {
                            Ag: Hb("url"),
                            then: _.xb({
                                url: _.ah,
                                scaledSize: _.Eb(qc),
                                size: _.Eb(qc),
                                origin: _.Eb(pc),
                                anchor: _.Eb(pc),
                                labelOrigin: _.Eb(pc),
                                path: _.Cb(Ra)
                            }, !0)
                        }, {
                            Ag: Hb("path"),
                            then: _.xb({
                                path: _.Db(_.ah, _.Ab(hh)),
                                anchor: _.Eb(pc),
                                labelOrigin: _.Eb(pc),
                                fillColor: _.dh,
                                fillOpacity: _.ch,
                                rotation: _.ch,
                                scale: _.ch,
                                strokeColor: _.dh,
                                strokeOpacity: _.ch,
                                strokeWeight: _.ch,
                                url: _.Cb(Ra)
                            }, !0)
                        })),
                        label: _.Eb(_.Db(_.ah, {
                            Ag: Hb("text"),
                            then: _.xb({
                                text: _.ah,
                                fontSize: _.dh,
                                fontWeight: _.dh,
                                fontFamily: _.dh
                            }, !0)
                        })),
                        shadow: _.Dc,
                        shape: _.Dc,
                        cursor: _.dh,
                        clickable: _.eh,
                        animation: _.Dc,
                        draggable: _.eh,
                        visible: _.eh,
                        flat: _.Dc,
                        zIndex: _.ch,
                        opacity: _.ch,
                        place: _.Eb(fi),
                        attribution: _.Eb(ei)
                    });
                    var jc = {
                        main: [],
                        common: ["main"],
                        util: ["common"],
                        adsense: ["main"],
                        controls: ["util"],
                        data: ["util"],
                        directions: ["util", "geometry"],
                        distance_matrix: ["util"],
                        drawing: ["main"],
                        drawing_impl: ["controls"],
                        elevation: ["util", "geometry"],
                        geocoder: ["util"],
                        geojson: ["main"],
                        imagery_viewer: ["main"],
                        geometry: ["main"],
                        infowindow: ["util"],
                        kml: ["onion", "util", "map"],
                        layers: ["map"],
                        map: ["common"],
                        marker: ["util"],
                        maxzoom: ["util"],
                        onion: ["util", "map"],
                        overlay: ["common"],
                        panoramio: ["main"],
                        places: ["main"],
                        places_impl: ["controls"],
                        poly: ["util", "map", "geometry"],
                        search: ["main"],
                        search_impl: ["onion"],
                        stats: ["util"],
                        streetview: ["util", "geometry"],
                        usage: ["util"],
                        visualization: ["main"],
                        visualization_impl: ["onion"],
                        weather: ["main"],
                        zombie: ["main"]
                    };
                    var gi = _.Jc.google.maps,
                        hi = gc.Jb(),
                        ii = (0, _.u)(hi.Pb, hi);
                    gi.__gjsload__ = ii;
                    _.Ia(gi.modules, ii);
                    delete gi.modules;
                    _.ji = _.Eb(_.zb(_.Kd, "Map"));
                    var ki = _.Eb(_.zb(_.Cc, "StreetViewPanorama"));
                    _.v(_.de, be);
                    _.de.prototype.map_changed = function() {
                        this.__gm.set && this.__gm.set.remove(this);
                        var a = this.get("map");
                        this.__gm.set = a && a.__gm.Hc;
                        this.__gm.set && _.zc(this.__gm.set, this)
                    };
                    _.de.MAX_ZINDEX = 1E6;
                    _.tc(_.de.prototype, {
                        map: _.Db(_.ji, ki)
                    });
                    var he = je(_.zb(_.H, "LatLng"));
                    _.v(le, _.C);
                    le.prototype.map_changed = le.prototype.visible_changed = function() {
                        var a = this;
                        _.J("poly", function(b) {
                            b.f(a)
                        })
                    };
                    le.prototype.getPath = function() {
                        return this.get("latLngs").getAt(0)
                    };
                    le.prototype.setPath = function(a) {
                        try {
                            this.get("latLngs").setAt(0, ie(a))
                        } catch (b) {
                            _.wb(b)
                        }
                    };
                    _.tc(le.prototype, {
                        draggable: _.eh,
                        editable: _.eh,
                        map: _.ji,
                        visible: _.eh
                    });
                    _.v(_.me, le);
                    _.me.prototype.Aa = !0;
                    _.me.prototype.getPaths = function() {
                        return this.get("latLngs")
                    };
                    _.me.prototype.setPaths = function(a) {
                        this.set("latLngs", ke(a))
                    };
                    _.v(_.ne, le);
                    _.ne.prototype.Aa = !1;
                    _.re = "click dblclick mousedown mousemove mouseout mouseover mouseup rightclick".split(" ");
                    _.v(se, _.C);
                    _.t = se.prototype;
                    _.t.contains = function(a) {
                        return this.b.contains(a)
                    };
                    _.t.getFeatureById = function(a) {
                        return this.b.getFeatureById(a)
                    };
                    _.t.add = function(a) {
                        return this.b.add(a)
                    };
                    _.t.remove = function(a) {
                        this.b.remove(a)
                    };
                    _.t.forEach = function(a) {
                        this.b.forEach(a)
                    };
                    _.t.addGeoJson = function(a, b) {
                        return _.qe(this.b, a, b)
                    };
                    _.t.loadGeoJson = function(a, b, c) {
                        var d = this.b;
                        _.J("data", function(e) {
                            e.Sl(d, a, b, c)
                        })
                    };
                    _.t.toGeoJson = function(a) {
                        var b = this.b;
                        _.J("data", function(c) {
                            c.Ol(b, a)
                        })
                    };
                    _.t.overrideStyle = function(a, b) {
                        this.f.overrideStyle(a, b)
                    };
                    _.t.revertStyle = function(a) {
                        this.f.revertStyle(a)
                    };
                    _.t.controls_changed = function() {
                        this.get("controls") && te(this)
                    };
                    _.t.drawingMode_changed = function() {
                        this.get("drawingMode") && te(this)
                    };
                    _.tc(se.prototype, {
                        map: _.ji,
                        style: _.Dc,
                        controls: _.Eb(_.Bb(_.Ab($g))),
                        controlPosition: _.Eb(_.Ab(_.Ef)),
                        drawingMode: _.Eb(_.Ab($g))
                    });
                    _.ue.prototype.B = _.m("b");
                    _.ve.prototype.B = _.m("b");
                    _.li = new _.ue;
                    _.mi = new _.ue;
                    we.prototype.B = _.m("b");
                    _.ni = new _.xe;
                    _.xe.prototype.B = _.m("b");
                    _.oi = new _.ue;
                    _.pi = new we;
                    _.ye.prototype.B = _.m("b");
                    _.qi = new _.ve;
                    _.ri = new _.ye;
                    _.si = {
                        METRIC: 0,
                        IMPERIAL: 1
                    };
                    _.ti = {
                        DRIVING: "DRIVING",
                        WALKING: "WALKING",
                        BICYCLING: "BICYCLING",
                        TRANSIT: "TRANSIT"
                    };
                    _.ui = {
                        BEST_GUESS: "bestguess",
                        OPTIMISTIC: "optimistic",
                        PESSIMISTIC: "pessimistic"
                    };
                    _.vi = {
                        BUS: "BUS",
                        RAIL: "RAIL",
                        SUBWAY: "SUBWAY",
                        TRAIN: "TRAIN",
                        TRAM: "TRAM"
                    };
                    _.wi = {
                        LESS_WALKING: "LESS_WALKING",
                        FEWER_TRANSFERS: "FEWER_TRANSFERS"
                    };
                    var xi = _.xb({
                        routes: _.Bb(_.Cb(_.Ta))
                    }, !0);
                    _.v(Ae, _.C);
                    _.t = Ae.prototype;
                    _.t.internalAnchor_changed = function() {
                        var a = this.get("internalAnchor");
                        Be(this, "attribution", a);
                        Be(this, "place", a);
                        Be(this, "internalAnchorMap", a, "map");
                        Be(this, "internalAnchorPoint", a, "anchorPoint");
                        a instanceof _.de ? Be(this, "internalAnchorPosition", a, "internalPosition") : Be(this, "internalAnchorPosition", a, "position")
                    };
                    _.t.internalAnchorPoint_changed = Ae.prototype.internalPixelOffset_changed = function() {
                        var a = this.get("internalAnchorPoint") || _.fh,
                            b = this.get("internalPixelOffset") || _.gh;
                        this.set("pixelOffset", new _.M(b.width + Math.round(a.x), b.height + Math.round(a.y)))
                    };
                    _.t.internalAnchorPosition_changed = function() {
                        var a = this.get("internalAnchorPosition");
                        a && this.set("position", a)
                    };
                    _.t.internalAnchorMap_changed = function() {
                        this.get("internalAnchor") && this.b.set("map", this.get("internalAnchorMap"))
                    };
                    _.t.vn = function() {
                        var a = this.get("internalAnchor");
                        !this.b.get("map") && a && a.get("map") && this.set("internalAnchor", null)
                    };
                    _.t.internalContent_changed = function() {
                        this.set("content", ze(this.get("internalContent")))
                    };
                    _.t.trigger = function(a) {
                        _.B.trigger(this.b, a)
                    };
                    _.t.close = function() {
                        this.b.set("map", null)
                    };
                    _.v(_.Ce, _.C);
                    _.tc(_.Ce.prototype, {
                        content: _.Db(_.dh, _.Cb(yb)),
                        position: _.Eb(_.Zb),
                        size: _.Eb(qc),
                        map: _.Db(_.ji, ki),
                        anchor: _.Eb(_.zb(_.C, "MVCObject")),
                        zIndex: _.ch
                    });
                    _.Ce.prototype.open = function(a, b) {
                        this.set("anchor", b);
                        b ? !this.get("map") && a && this.set("map", a) : this.set("map", a)
                    };
                    _.Ce.prototype.close = function() {
                        this.set("map", null)
                    };
                    _.De = [];
                    _.v(Fe, _.C);
                    Fe.prototype.changed = function(a) {
                        if ("map" == a || "panel" == a) {
                            var b = this;
                            _.J("directions", function(c) {
                                c.wm(b, a)
                            })
                        }
                        "panel" == a && _.Ee(this.getPanel())
                    };
                    _.tc(Fe.prototype, {
                        directions: xi,
                        map: _.ji,
                        panel: _.Eb(_.Cb(yb)),
                        routeIndex: _.ch
                    });
                    Ge.prototype.route = function(a, b) {
                        _.J("directions", function(c) {
                            c.vi(a, b, !0)
                        })
                    };
                    He.prototype.getDistanceMatrix = function(a, b) {
                        _.J("distance_matrix", function(c) {
                            c.b(a, b)
                        })
                    };
                    Ie.prototype.getElevationAlongPath = function(a, b) {
                        _.J("elevation", function(c) {
                            c.getElevationAlongPath(a, b)
                        })
                    };
                    Ie.prototype.getElevationForLocations = function(a, b) {
                        _.J("elevation", function(c) {
                            c.getElevationForLocations(a, b)
                        })
                    };
                    _.yi = _.zb(_.Gd, "LatLngBounds");
                    _.Je.prototype.geocode = function(a, b) {
                        _.J("geocoder", function(c) {
                            c.geocode(a, b)
                        })
                    };
                    _.v(_.Ke, _.C);
                    _.Ke.prototype.map_changed = function() {
                        var a = this;
                        _.J("kml", function(b) {
                            b.b(a)
                        })
                    };
                    _.tc(_.Ke.prototype, {
                        map: _.ji,
                        url: null,
                        bounds: null,
                        opacity: _.ch
                    });
                    _.Ai = {
                        UNKNOWN: "UNKNOWN",
                        OK: _.ga,
                        INVALID_REQUEST: _.ba,
                        DOCUMENT_NOT_FOUND: "DOCUMENT_NOT_FOUND",
                        FETCH_ERROR: "FETCH_ERROR",
                        INVALID_DOCUMENT: "INVALID_DOCUMENT",
                        DOCUMENT_TOO_LARGE: "DOCUMENT_TOO_LARGE",
                        LIMITS_EXCEEDED: "LIMITS_EXECEEDED",
                        TIMED_OUT: "TIMED_OUT"
                    };
                    _.v(Le, _.C);
                    _.t = Le.prototype;
                    _.t.Qd = function() {
                        var a = this;
                        _.J("kml", function(b) {
                            b.f(a)
                        })
                    };
                    _.t.url_changed = Le.prototype.Qd;
                    _.t.driveFileId_changed = Le.prototype.Qd;
                    _.t.map_changed = Le.prototype.Qd;
                    _.t.zIndex_changed = Le.prototype.Qd;
                    _.tc(Le.prototype, {
                        map: _.ji,
                        defaultViewport: null,
                        metadata: null,
                        status: null,
                        url: _.dh,
                        screenOverlays: _.eh,
                        zIndex: _.ch
                    });
                    _.v(_.Me, _.C);
                    _.tc(_.Me.prototype, {
                        map: _.ji
                    });
                    _.v(Ne, _.C);
                    _.tc(Ne.prototype, {
                        map: _.ji
                    });
                    _.v(Oe, _.C);
                    _.tc(Oe.prototype, {
                        map: _.ji
                    });
                    _.Df = {
                        japan_prequake: 20,
                        japan_postquake2010: 24
                    };
                    _.Bi = {
                        NEAREST: "nearest",
                        BEST: "best"
                    };
                    _.Ci = {
                        DEFAULT: "default",
                        OUTDOOR: "outdoor"
                    };
                    var Di, Ei, Fi, Gi;
                    Pe.prototype.B = _.m("b");
                    var Hi = new Qe,
                        Ii = new Re,
                        Ji = new Se;
                    Qe.prototype.B = _.m("b");
                    Re.prototype.B = _.m("b");
                    Se.prototype.B = _.m("b");
                    _.Te.prototype.B = _.m("b");
                    _.Ki = new _.Te;
                    _.Li = new _.Te;
                    var vf, wf, pf, yf, Bf;
                    _.Ue.prototype.B = _.m("b");
                    _.Ue.prototype.getUrl = function(a) {
                        return _.N(this.b, 0)[a]
                    };
                    _.Ue.prototype.setUrl = function(a, b) {
                        _.N(this.b, 0)[a] = b
                    };
                    _.Ve.prototype.B = _.m("b");
                    _.We.prototype.B = _.m("b");
                    _.Mi = new _.Ue;
                    _.Ni = new _.Ue;
                    _.Oi = new _.Ue;
                    _.Pi = new _.Ue;
                    _.Qi = new _.Ue;
                    Xe.prototype.B = _.m("b");
                    af.prototype.B = _.m("b");
                    bf.prototype.B = _.m("b");
                    cf.prototype.B = _.m("b");
                    _.Ri = new _.We;
                    _.Si = new _.Ve;
                    vf = new Xe;
                    wf = new af;
                    pf = new bf;
                    _.Ti = new _.ef;
                    _.Ui = new _.ff;
                    yf = new Pe;
                    Bf = new df;
                    df.prototype.B = _.m("b");
                    _.ef.prototype.B = _.m("b");
                    _.ff.prototype.B = _.m("b");
                    _.v(Ff, _.Cc);
                    Ff.prototype.visible_changed = function() {
                        var a = this;
                        !a.C && a.getVisible() && (a.C = !0, _.J("streetview", function(b) {
                            var c;
                            a.j && (c = a.j);
                            b.Pn(a, c)
                        }))
                    };
                    _.tc(Ff.prototype, {
                        visible: _.eh,
                        pano: _.dh,
                        position: _.Eb(_.Zb),
                        pov: _.Eb(ih),
                        photographerPov: null,
                        location: null,
                        links: _.Bb(_.Cb(_.Ta)),
                        status: null,
                        zoom: _.ch,
                        enableCloseButton: _.eh
                    });
                    Ff.prototype.registerPanoProvider = _.sc("panoProvider");
                    _.t = _.Gf.prototype;
                    _.t.Zd = _.ra(3);
                    _.t.sb = _.ra(4);
                    _.t.Kd = _.ra(5);
                    _.t.Jd = _.ra(6);
                    _.t.Id = _.ra(7);
                    _.v(Hf, cd);
                    _.If.prototype.addListener = function(a, b) {
                        this.T.addListener(a, b)
                    };
                    _.If.prototype.addListenerOnce = function(a, b) {
                        this.T.addListenerOnce(a, b)
                    };
                    _.If.prototype.removeListener = function(a, b) {
                        this.T.removeListener(a, b)
                    };
                    _.If.prototype.b = _.ra(8);
                    _.cg = {};
                    _.Jf.prototype.fromLatLngToPoint = function(a, b) {
                        b = b || new _.L(0, 0);
                        var c = this.b;
                        b.x = c.x + a.lng() * this.j;
                        a = _.La(Math.sin(_.Sb(a.lat())), -(1 - 1E-15), 1 - 1E-15);
                        b.y = c.y + .5 * Math.log((1 + a) / (1 - a)) * -this.l;
                        return b
                    };
                    _.Jf.prototype.fromPointToLatLng = function(a, b) {
                        var c = this.b;
                        return new _.H(_.Tb(2 * Math.atan(Math.exp((a.y - c.y) / -this.l)) - Math.PI / 2), (a.x - c.x) / this.j, b)
                    };
                    _.Kf.prototype.isEmpty = function() {
                        return !(this.M < this.O && this.L < this.R)
                    };
                    _.Kf.prototype.extend = function(a) {
                        a && (this.M = Math.min(this.M, a.x), this.O = Math.max(this.O, a.x), this.L = Math.min(this.L, a.y), this.R = Math.max(this.R, a.y))
                    };
                    _.Kf.prototype.getCenter = function() {
                        return new _.L((this.M + this.O) / 2, (this.L + this.R) / 2)
                    };
                    _.Vi = _.Lf(-window.Infinity, -window.Infinity, window.Infinity, window.Infinity);
                    _.Wi = _.Lf(0, 0, 0, 0);
                    _.v(_.Pf, _.C);
                    _.Pf.prototype.N = function() {
                        var a = this;
                        a.G || (a.G = window.setTimeout(function() {
                            a.G = void 0;
                            a.Z()
                        }, a.ol))
                    };
                    _.Pf.prototype.C = function() {
                        this.G && window.clearTimeout(this.G);
                        this.G = void 0;
                        this.Z()
                    };
                    var Xi, ej;
                    Sf.prototype.B = _.m("b");
                    Tf.prototype.B = _.m("b");
                    var fj = new Sf;
                    var gj, hj;
                    Uf.prototype.B = _.m("b");
                    Vf.prototype.B = _.m("b");
                    var ij;
                    Wf.prototype.B = _.m("b");
                    Wf.prototype.getZoom = function() {
                        var a = this.b[2];
                        return null != a ? a : 0
                    };
                    Wf.prototype.setZoom = function(a) {
                        this.b[2] = a
                    };
                    var jj = new Uf,
                        kj = new Vf,
                        lj = new Tf,
                        mj = new Pe;
                    _.v(Xf, _.Pf);
                    var Yf = {
                            roadmap: 0,
                            satellite: 2,
                            hybrid: 3,
                            terrain: 4
                        },
                        nj = {
                            0: 1,
                            2: 2,
                            3: 2,
                            4: 2
                        };
                    _.t = Xf.prototype;
                    _.t.Ah = _.rc("center");
                    _.t.Pg = _.rc("zoom");
                    _.t.changed = function() {
                        var a = this.Ah(),
                            b = this.Pg(),
                            c = Zf(this);
                        if (a && !a.b(this.I) || this.H != b || this.K != c) $f(this.f), this.N(), this.H = b, this.K = c;
                        this.I = a
                    };
                    _.t.Z = function() {
                        var a = "",
                            b = this.Ah(),
                            c = this.Pg(),
                            d = Zf(this),
                            e = this.get("size");
                        if (b && (0, window.isFinite)(b.lat()) && (0, window.isFinite)(b.lng()) && 1 < c && null != d && e && e.width && e.height && this.b) {
                            _.Qf(this.b, e);
                            var f;
                            (b = _.Nf(this.l, b, c)) ? (f = new _.Kf, f.M = Math.round(b.x - e.width / 2), f.O = f.M + e.width, f.L = Math.round(b.y - e.height / 2), f.R = f.L + e.height) : f = null;
                            b = nj[d];
                            if (f) {
                                var a = new Wf,
                                    g;
                                a.b[0] = a.b[0] || [];
                                g = new Uf(a.b[0]);
                                g.b[0] = f.M;
                                g.b[1] = f.L;
                                a.b[1] = b;
                                a.setZoom(c);
                                a.b[3] = a.b[3] || [];
                                c = new Vf(a.b[3]);
                                c.b[0] = f.O - f.M;
                                c.b[1] = f.R - f.L;
                                a.b[4] = a.b[4] || [];
                                c = new Tf(a.b[4]);
                                c.b[0] = d;
                                c.b[4] = _.gf(_.jf(_.P));
                                c.b[5] = _.hf(_.jf(_.P)).toLowerCase();
                                c.b[9] = !0;
                                c.b[11] = !0;
                                d = this.D + (0, window.unescape)("%3F");
                                if (!ij) {
                                    c = ij = {
                                        F: -1,
                                        A: []
                                    };
                                    gj || (gj = {
                                        F: -1,
                                        A: [, _.Q, _.Q]
                                    });
                                    b = _.O(jj, gj);
                                    hj || (hj = {
                                        F: -1,
                                        A: []
                                    }, hj.A = [, _.th, _.th, _.od(1)]);
                                    f = _.O(kj, hj);
                                    ej || (g = [], ej = {
                                        F: -1,
                                        A: g
                                    }, g[1] = _.S, g[2] = _.R, g[3] = _.R, g[5] = _.T, g[6] = _.T, Xi || (Xi = {
                                        F: -1,
                                        A: [, _.xh, _.R]
                                    }), g[9] = _.O(fj, Xi), g[10] = _.R, g[11] = _.R, g[12] = _.R, g[100] = _.R);
                                    g = _.O(lj, ej);
                                    if (!Di) {
                                        var h = Di = {
                                            F: -1,
                                            A: []
                                        };
                                        Ei || (Ei = {
                                            F: -1,
                                            A: [, _.R]
                                        });
                                        var l = _.O(Hi, Ei);
                                        Gi || (Gi = {
                                            F: -1,
                                            A: [, _.R, _.R]
                                        });
                                        var n = _.O(Ji, Gi);
                                        Fi || (Fi = {
                                            F: -1,
                                            A: [, _.R]
                                        });
                                        h.A = [, l, , , , , , , , , n, , _.O(Ii, Fi)]
                                    }
                                    c.A = [, b, _.S, _.th, f, g, _.O(mj, Di)]
                                }
                                a = _.Eh.b(a.b, ij);
                                a = this.m(d + a)
                            }
                        }
                        this.f && e && (_.Qf(this.f, e), bg(this, a))
                    };
                    _.t.div_changed = function() {
                        var a = this.get("div"),
                            b = this.b;
                        if (a)
                            if (b) a.appendChild(b);
                            else {
                                b = this.b = window.document.createElement("div");
                                b.style.overflow = "hidden";
                                var c = this.f = window.document.createElement("img");
                                _.B.addDomListener(b, "contextmenu", function(a) {
                                    _.cb(a);
                                    _.eb(a)
                                });
                                c.ontouchstart = c.ontouchmove = c.ontouchend = c.ontouchcancel = function(a) {
                                    _.db(a);
                                    _.eb(a)
                                };
                                _.Qf(c, _.gh);
                                a.appendChild(b);
                                this.Z()
                            }
                        else b && ($f(b), this.b = null)
                    };
                    var jg;
                    _.xg = "StopIteration" in _.Jc ? _.Jc.StopIteration : {
                        message: "StopIteration",
                        stack: ""
                    };
                    _.lg.prototype.next = function() {
                        throw _.xg;
                    };
                    _.lg.prototype.mf = function() {
                        return this
                    };
                    _.mg.prototype.Rf = !0;
                    _.mg.prototype.Kb = _.ra(10);
                    _.mg.prototype.Nh = !0;
                    _.mg.prototype.oe = _.ra(12);
                    _.ng("about:blank");
                    _.pg.prototype.Nh = !0;
                    _.pg.prototype.oe = _.ra(11);
                    _.pg.prototype.Rf = !0;
                    _.pg.prototype.Kb = _.ra(9);
                    _.og = {};
                    _.qg("<!DOCTYPE html>", 0);
                    _.qg("", 0);
                    _.qg("<br>", 0);
                    !_.Jh && !_.Hh || _.Hh && 9 <= Number(_.Xh) || _.Jh && _.wd("1.9.1");
                    _.Hh && _.wd("9");
                    _.v(tg, _.lg);
                    tg.prototype.setPosition = function(a, b, c) {
                        if (this.node = a) this.f = _.ya(b) ? b : 1 != this.node.nodeType ? 0 : this.b ? -1 : 1;
                        _.ya(c) && (this.depth = c)
                    };
                    tg.prototype.next = function() {
                        var a;
                        if (this.j) {
                            if (!this.node || this.l && 0 == this.depth) throw _.xg;
                            a = this.node;
                            var b = this.b ? -1 : 1;
                            if (this.f == b) {
                                var c = this.b ? a.lastChild : a.firstChild;
                                c ? this.setPosition(c) : this.setPosition(a, -1 * b)
                            } else(c = this.b ? a.previousSibling : a.nextSibling) ? this.setPosition(c) : this.setPosition(a.parentNode, -1 * b);
                            this.depth += this.f * (this.b ? -1 : 1)
                        } else this.j = !0;
                        a = this.node;
                        if (!this.node) throw _.xg;
                        return a
                    };
                    tg.prototype.splice = function(a) {
                        var b = this.node,
                            c = this.b ? 1 : -1;
                        this.f == c && (this.f = -1 * c, this.depth += this.f * (this.b ? -1 : 1));
                        this.b = !this.b;
                        tg.prototype.next.call(this);
                        this.b = !this.b;
                        for (var c = _.wa(arguments[0]) ? arguments[0] : arguments, d = c.length - 1; 0 <= d; d--) _.rg(c[d], b);
                        _.sg(b)
                    };
                    _.v(ug, tg);
                    ug.prototype.next = function() {
                        do ug.Ab.next.call(this); while (-1 == this.f);
                        return this.node
                    };
                    _.pj = _.Jc.document && _.Jc.document.createElement("div");
                    _.v(Ag, _.Kd);
                    _.t = Ag.prototype;
                    _.t.streetView_changed = function() {
                        this.get("streetView") || this.set("streetView", this.__gm.j)
                    };
                    _.t.getDiv = function() {
                        return this.__gm.V
                    };
                    _.t.panBy = function(a, b) {
                        var c = this.__gm;
                        _.J("map", function() {
                            _.B.trigger(c, "panby", a, b)
                        })
                    };
                    _.t.panTo = function(a) {
                        var b = this.__gm;
                        a = _.Zb(a);
                        _.J("map", function() {
                            _.B.trigger(b, "panto", a)
                        })
                    };
                    _.t.panToBounds = function(a) {
                        var b = this.__gm,
                            c = _.Jd(a);
                        _.J("map", function() {
                            _.B.trigger(b, "pantolatlngbounds", c)
                        })
                    };
                    _.t.fitBounds = function(a) {
                        var b = this;
                        a = _.Jd(a);
                        _.J("map", function(c) {
                            c.fitBounds(b, a)
                        })
                    };
                    _.tc(Ag.prototype, {
                        bounds: null,
                        streetView: ki,
                        center: _.Eb(_.Zb),
                        zoom: _.ch,
                        mapTypeId: _.dh,
                        projection: null,
                        heading: _.ch,
                        tilt: _.ch,
                        clickableIcons: bh
                    });
                    Bg.prototype.getMaxZoomAtLatLng = function(a, b) {
                        _.J("maxzoom", function(c) {
                            c.getMaxZoomAtLatLng(a, b)
                        })
                    };
                    _.v(Cg, _.C);
                    Cg.prototype.changed = function(a) {
                        if ("suppressInfoWindows" != a && "clickable" != a) {
                            var b = this;
                            _.J("onion", function(a) {
                                a.b(b)
                            })
                        }
                    };
                    _.tc(Cg.prototype, {
                        map: _.ji,
                        tableId: _.ch,
                        query: _.Eb(_.Db(_.ah, _.Cb(_.Ta, "not an Object")))
                    });
                    _.v(_.Dg, _.C);
                    _.Dg.prototype.map_changed = function() {
                        var a = this;
                        _.J("overlay", function(b) {
                            b.Vk(a)
                        })
                    };
                    _.tc(_.Dg.prototype, {
                        panes: null,
                        projection: null,
                        map: _.Db(_.ji, ki)
                    });
                    _.v(_.Eg, _.C);
                    _.Eg.prototype.map_changed = _.Eg.prototype.visible_changed = function() {
                        var a = this;
                        _.J("poly", function(b) {
                            b.b(a)
                        })
                    };
                    _.Eg.prototype.center_changed = function() {
                        _.B.trigger(this, "bounds_changed")
                    };
                    _.Eg.prototype.radius_changed = _.Eg.prototype.center_changed;
                    _.Eg.prototype.getBounds = function() {
                        var a = this.get("radius"),
                            b = this.get("center");
                        if (b && _.A(a)) {
                            var c = this.get("map"),
                                c = c && c.__gm.get("mapType");
                            return _.Of(b, a / _.fe(c))
                        }
                        return null
                    };
                    _.tc(_.Eg.prototype, {
                        center: _.Eb(_.Zb),
                        draggable: _.eh,
                        editable: _.eh,
                        map: _.ji,
                        radius: _.ch,
                        visible: _.eh
                    });
                    _.v(_.Fg, _.C);
                    _.Fg.prototype.map_changed = _.Fg.prototype.visible_changed = function() {
                        var a = this;
                        _.J("poly", function(b) {
                            b.j(a)
                        })
                    };
                    _.tc(_.Fg.prototype, {
                        draggable: _.eh,
                        editable: _.eh,
                        bounds: _.Eb(_.Jd),
                        map: _.ji,
                        visible: _.eh
                    });
                    _.v(Gg, _.C);
                    Gg.prototype.map_changed = function() {
                        var a = this;
                        _.J("streetview", function(b) {
                            b.Uk(a)
                        })
                    };
                    _.tc(Gg.prototype, {
                        map: _.ji
                    });
                    _.Hg.prototype.getPanorama = function(a, b) {
                        var c = this.b || void 0;
                        _.J("streetview", function(d) {
                            _.J("geometry", function(e) {
                                d.Zl(a, b, e.computeHeading, e.computeOffset, c)
                            })
                        })
                    };
                    _.Hg.prototype.getPanoramaByLocation = function(a, b, c) {
                        this.getPanorama({
                            location: a,
                            radius: b,
                            preference: 50 > (b || 0) ? "best" : "nearest"
                        }, c)
                    };
                    _.Hg.prototype.getPanoramaById = function(a, b) {
                        this.getPanorama({
                            pano: a
                        }, b)
                    };
                    _.v(_.Ig, _.C);
                    _.t = _.Ig.prototype;
                    _.t.getTile = function(a, b, c) {
                        if (!a || !c) return null;
                        var d = c.createElement("div");
                        c = {
                            $: a,
                            zoom: b,
                            Bb: null
                        };
                        d.__gmimt = c;
                        _.zc(this.b, d);
                        var e = Kg(this);
                        1 != e && Jg(d, e);
                        if (this.f) {
                            var e = this.tileSize || new _.M(256, 256),
                                f = this.j(a, b);
                            c.Bb = this.f(a, b, e, d, f, function() {
                                _.B.trigger(d, "load")
                            })
                        }
                        return d
                    };
                    _.t.releaseTile = function(a) {
                        a && this.b.contains(a) && (this.b.remove(a), (a = a.__gmimt.Bb) && a.release())
                    };
                    _.t.If = _.ra(13);
                    _.t.On = function() {
                        this.f && this.b.forEach(function(a) {
                            a.__gmimt.Bb.ib()
                        })
                    };
                    _.t.opacity_changed = function() {
                        var a = Kg(this);
                        this.b.forEach(function(b) {
                            Jg(b, a)
                        })
                    };
                    _.t.Tc = !0;
                    _.tc(_.Ig.prototype, {
                        opacity: _.ch
                    });
                    _.v(_.Lg, _.C);
                    _.Lg.prototype.getTile = jh;
                    _.Lg.prototype.tileSize = new _.M(256, 256);
                    _.Lg.prototype.Tc = !0;
                    _.v(_.Mg, _.Lg);
                    _.v(_.Ng, _.C);
                    _.tc(_.Ng.prototype, {
                        attribution: _.Eb(ei),
                        place: _.Eb(fi)
                    });
                    var qj = {
                        Animation: {
                            BOUNCE: 1,
                            DROP: 2,
                            Lp: 3,
                            Jp: 4
                        },
                        Circle: _.Eg,
                        ControlPosition: _.Ef,
                        Data: se,
                        GroundOverlay: _.Ke,
                        ImageMapType: _.Ig,
                        InfoWindow: _.Ce,
                        LatLng: _.H,
                        LatLngBounds: _.Gd,
                        MVCArray: _.xc,
                        MVCObject: _.C,
                        Map: Ag,
                        MapTypeControlStyle: {
                            DEFAULT: 0,
                            HORIZONTAL_BAR: 1,
                            DROPDOWN_MENU: 2,
                            INSET: 3,
                            INSET_LARGE: 4
                        },
                        MapTypeId: _.Zg,
                        MapTypeRegistry: yd,
                        Marker: _.de,
                        MarkerImage: function(a, b, c, d, e) {
                            this.url = a;
                            this.size = b || e;
                            this.origin = c;
                            this.anchor = d;
                            this.scaledSize = e;
                            this.labelOrigin = null
                        },
                        NavigationControlStyle: {
                            DEFAULT: 0,
                            SMALL: 1,
                            ANDROID: 2,
                            ZOOM_PAN: 3,
                            Mp: 4,
                            Dk: 5
                        },
                        OverlayView: _.Dg,
                        Point: _.L,
                        Polygon: _.me,
                        Polyline: _.ne,
                        Rectangle: _.Fg,
                        ScaleControlStyle: {
                            DEFAULT: 0
                        },
                        Size: _.M,
                        StreetViewPreference: _.Bi,
                        StreetViewSource: _.Ci,
                        StrokePosition: {
                            CENTER: 0,
                            INSIDE: 1,
                            OUTSIDE: 2
                        },
                        SymbolPath: hh,
                        ZoomControlStyle: {
                            DEFAULT: 0,
                            SMALL: 1,
                            LARGE: 2,
                            Dk: 3
                        },
                        event: _.B
                    };
                    _.Ja(qj, {
                        BicyclingLayer: _.Me,
                        DirectionsRenderer: Fe,
                        DirectionsService: Ge,
                        DirectionsStatus: {
                            OK: _.ga,
                            UNKNOWN_ERROR: _.ja,
                            OVER_QUERY_LIMIT: _.ha,
                            REQUEST_DENIED: _.ia,
                            INVALID_REQUEST: _.ba,
                            ZERO_RESULTS: _.ka,
                            MAX_WAYPOINTS_EXCEEDED: _.ea,
                            NOT_FOUND: _.fa
                        },
                        DirectionsTravelMode: _.ti,
                        DirectionsUnitSystem: _.si,
                        DistanceMatrixService: He,
                        DistanceMatrixStatus: {
                            OK: _.ga,
                            INVALID_REQUEST: _.ba,
                            OVER_QUERY_LIMIT: _.ha,
                            REQUEST_DENIED: _.ia,
                            UNKNOWN_ERROR: _.ja,
                            MAX_ELEMENTS_EXCEEDED: _.da,
                            MAX_DIMENSIONS_EXCEEDED: _.ca
                        },
                        DistanceMatrixElementStatus: {
                            OK: _.ga,
                            NOT_FOUND: _.fa,
                            ZERO_RESULTS: _.ka
                        },
                        ElevationService: Ie,
                        ElevationStatus: {
                            OK: _.ga,
                            UNKNOWN_ERROR: _.ja,
                            OVER_QUERY_LIMIT: _.ha,
                            REQUEST_DENIED: _.ia,
                            INVALID_REQUEST: _.ba,
                            Gp: "DATA_NOT_AVAILABLE"
                        },
                        FusionTablesLayer: Cg,
                        Geocoder: _.Je,
                        GeocoderLocationType: {
                            ROOFTOP: "ROOFTOP",
                            RANGE_INTERPOLATED: "RANGE_INTERPOLATED",
                            GEOMETRIC_CENTER: "GEOMETRIC_CENTER",
                            APPROXIMATE: "APPROXIMATE"
                        },
                        GeocoderStatus: {
                            OK: _.ga,
                            UNKNOWN_ERROR: _.ja,
                            OVER_QUERY_LIMIT: _.ha,
                            REQUEST_DENIED: _.ia,
                            INVALID_REQUEST: _.ba,
                            ZERO_RESULTS: _.ka,
                            ERROR: _.aa
                        },
                        KmlLayer: Le,
                        KmlLayerStatus: _.Ai,
                        MaxZoomService: Bg,
                        MaxZoomStatus: {
                            OK: _.ga,
                            ERROR: _.aa
                        },
                        SaveWidget: _.Ng,
                        StreetViewCoverageLayer: Gg,
                        StreetViewPanorama: Ff,
                        StreetViewService: _.Hg,
                        StreetViewStatus: {
                            OK: _.ga,
                            UNKNOWN_ERROR: _.ja,
                            ZERO_RESULTS: _.ka
                        },
                        StyledMapType: _.Mg,
                        TrafficLayer: Ne,
                        TrafficModel: _.ui,
                        TransitLayer: Oe,
                        TransitMode: _.vi,
                        TransitRoutePreference: _.wi,
                        TravelMode: _.ti,
                        UnitSystem: _.si
                    });
                    _.Ja(se, {
                        Feature: _.nc,
                        Geometry: Yb,
                        GeometryCollection: _.Rd,
                        LineString: _.Td,
                        LinearRing: _.Xd,
                        MultiLineString: _.Vd,
                        MultiPoint: _.Wd,
                        MultiPolygon: _.ae,
                        Point: _.$b,
                        Polygon: _.Zd
                    });
                    var Sg = /'/g,
                        Tg;
                    _.lc("main", {});
                    window.google.maps.Load(function(a, b) {
                        var c = window.google.maps;
                        Xg();
                        var d = Yg(c);
                        _.P = new cf(a);
                        _.rj = Math.random() < _.rf();
                        _.sj = Math.round(1E15 * Math.random()).toString(36);
                        _.zg = Ug();
                        _.zi = Vg();
                        _.oj = new _.xc;
                        _.hg = b;
                        for (a = 0; a < _.fd(_.P.b, 8); ++a) _.cg[Af(a)] = !0;
                        a = _.xf();
                        ce(nf(a));
                        _.Ia(qj, function(a, b) {
                            c[a] = b
                        });
                        c.version = _.of(a);
                        window.setTimeout(function() {
                            mc(["util", "stats"], function(a, b) {
                                a.f.b();
                                a.j();
                                d && b.b.b({
                                    ev: "api_alreadyloaded",
                                    client: _.sf(_.P),
                                    key: _.uf()
                                })
                            })
                        }, 5E3);
                        _.B.ko();
                        jg = new ig;
                        (a = tf()) && mc(_.N(_.P.b,
                            12), Wg(a), !0)
                    });
                }).call(this, {});




            }, 0);


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
            controller: 'BlogTextCtrl',
            //  resolve: {
            //    items: function () {
            //      return $scope.items;
            //    }
            //  }
        });
    }

    // $scope.blogtext = [{
    //     img: "img/blog/text/1.png",
    //     date: "12 January 2016",
    //     desc: "Lorem Ipsum is simply dummy text of the printing industry"
    // }, {
    //     img: "img/blog/text/1.png",
    //     date: "12 January 2016",
    //     desc: "Lorem Ipsum is simply dummy text of the printing industry"
    // }, {
    //     img: "img/blog/text/1.png",
    //     date: "12 January 2016",
    //     desc: "Lorem Ipsum is simply dummy text of the printing industry"
    // }];
    // $scope.bgtext = [{
    //     img: "img/blog/text/t1.png",
    //     desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
    // }, {
    //     img: "img/blog/text/t2.png",
    //     desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
    // }, {
    //     img: "img/blog/text/t3.png",
    //     desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
    // }];
    // $scope.commentlist = [{
    //     img: "img/blog/text/p2.png",
    //     name: "Sohan Honekari",
    //     time: "27 minutes",
    //     desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
    // }, {
    //     img: "img/blog/text/p2.png",
    //     name: "Raj Shah",
    //     time: "2 hours",
    //     desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
    // }, {
    //     img: "img/blog/text/p2.png",
    //     name: "pooja thakkare",
    //     time: "20 seconds",
    //     desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
    // }];

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


            }, 0);
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


            }, 0);
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
        $scope.pagedata.pageno = 0;
        $scope.pagedata.id = $stateParams.id;
        var lastpage = 1;

        $scope.miceSubtype = [];

        $scope.getMiceSubtype = function() {
            NavigationService.getMiceInside($scope.pagedata, function(data) {
                lastpage = data.lastpage;
                if (data.queryresult.length > 0) {
                    _.each(data.queryresult, function(n) {
                        $scope.miceSubtype.push(n);
                    })
                    $scope.shouldscroll = false;
                } else {
                    $scope.shouldscroll = true;
                }
                console.log($scope.miceSubtype);
            })
        }

        $scope.addMoreItems = function() {
            // console.log("addMoreItems");
            if (lastpage > $scope.pagedata.pageno) {
                $scope.pagedata.pageno++;
                $scope.shouldscroll = true;
                $scope.getMiceSubtype();
            } else {
                $scope.shouldscroll = true;
            }
        }

        $scope.addMoreItems();

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
            $scope.mediadata = data.data;
            console.log($scope.mediadata);
        })

        $scope.categoryid = $stateParams.id;
        $scope.pagenumber = 1;
        var lastpage = 1;
        $scope.objfilter = {};
        $scope.objfilter.year = $stateParams.year;
        $scope.objfilter.pageno = 1;
        $scope.pages = [1]
        $scope.mediadatadetail = [];
        // $scope.objfilter.subcat = '';


        $scope.getMediayear = function() {
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
            });
        };

        console.log('lastpage: ', lastpage);
        $scope.loadMore = function() {
            if (lastpage > $scope.objfilter.pageno) {
                console.log('lastpageeee: ', lastpage)
                    ++$scope.objfilter.pageno;
                $scope.pages.push($scope.objfilter.pageno);
                console.log('pages:', $scope.pages);
                $scope.getMediayear();
            }
        };

        $scope.getMediayear();




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


            }, 0);
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


            }, 0);
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


            }, 0);
        });

        $scope.weddingSubtype = [{
            content: "JPP Stadium Branding: (Season 1, 2 & 3)",
            date: "May 18th, 2016",
            img: "img/talent/talentinside/w1.png",
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }, {
            content: "JPP Team Management: Season 1",
            date: "May 18th, 2016",
            img: "img/talent/talentinside/w2.png",
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }, {
            content: "JPP Team Management: Season 2",
            date: "May 18th, 2016",
            img: "img/talent/talentinside/w3.png",
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }];

        NavigationService.getBanner($stateParams.id, function(data) {
            $scope.bannerData = data.data;
            $scope.bannerName = data.data.name;

            console.log('$scope.bannerData', $scope.bannerData);
        })
        NavigationService.getTalentInside($stateParams.id, function(data) {
            $scope.talentInsideData = data.queryresult;
            console.log('$scope.talentInsideData', $scope.talentInsideData);
        })
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


            }, 0);
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


            }, 0);
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
    .controller('headerctrl', function($scope, TemplateService, NavigationService, $state, $rootScope) {
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

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                $(window).scrollTop(0);
            });

        NavigationService.getMediacorner(function(data) {
            console.log("dsfasdfasdf");
            $scope.mediadata = data.data.years[0];
        });
    });
