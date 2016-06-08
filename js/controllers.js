angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'infinite-scroll', 'angular-loading-bar'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
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
  $scope.clientspeak = {
    category: "Client Speak",
    text: "Extra Efficient",
    name: "Amitabh Bachchan",
    img: "img/home/amitabh.jpg"
  };
  $scope.diaries = [{
    title: "WEDDINGS",
    img: "img/home/diaries/diary1.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }, {
    title: "SPORTS",
    img: "img/home/diaries/diary2.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }, {
    title: "EVENTS",
    img: "img/home/diaries/diary3.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }, {
    title: "WEDDINGS",
    img: "img/home/diaries/diary2.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }, {
    title: "SPORTS",
    img: "img/home/diaries/diary3.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }, {
    title: "EVENTS",
    img: "img/home/diaries/diary2.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }, {
    title: "WEDDINGS",
    img: "img/home/diaries/diary3.png",
    date: "12 January 2016",
    desc: "Lorem Ipsum is simply dummy text of the printing industry"
  }];
  $scope.homedata = "";
  NavigationService.getHome(function(data) {
    $scope.homedata = data.data;
    console.log($scope.homedata);
  })
})


.controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("movies");
  $scope.menutitle = NavigationService.makeactive("Movies");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
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
})

.controller('WeddingCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("wedding");
  $scope.menutitle = NavigationService.makeactive("Wedding");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
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
  $scope.clientimage = [{
    img: "img/client/1.png",
    alt: ""
  }, {
    img: "img/client/2.png",
    alt: ""
  }, {
    img: "img/client/3.png",
    alt: ""
  }, {
    img: "img/client/4.png",
    alt: ""
  }, {
    img: "img/client/5.png",
    alt: ""
  }, {
    img: "img/client/6.png",
    alt: ""
  }, {
    img: "img/client/7.png",
    alt: ""
  }, {
    img: "img/client/8.png",
    alt: ""
  }];

  $scope.strip = [{
      img: "img/client/jpp1.jpg",
      name: "Jaipur Pink Panthers"
    }, {
      img: "img/client/jpp2.jpg",
      name: "Kings XI Panjab"
    }, {
      img: "img/client/jpp3.jpg",
      name: "CHENNAYIN F.C."
    }, {
      img: "img/client/jpp4.jpg",
      name: "KOTAK"
    },

  ];
})

.controller('AsfcCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("asfc");
  $scope.menutitle = NavigationService.makeactive("Sports");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
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
  var id = '2';
  NavigationService.getSportInsidedataByid(id, function(data) {
    $scope.asfcInsidedatadetail = data.queryresult;
    console.log($scope.asfcInsidedatadetail);
  })
  NavigationService.getasfcSeasonData(id, function(data) {
    $scope.asfcInsidedata = data.data;
    console.log("testt", $scope.asfcInsidedata);
  })

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
  var id = '1';
  NavigationService.getSportdataByid(id, function(data) {
    $scope.jppdata = data.data;
    console.log($scope.jppdata);
  })
  NavigationService.getSportInsidedataByid(id, function(data) {
    $scope.jppInsidedata = data.queryresult;
    console.log($scope.jppInsidedata);
  })


  $scope.jppdetail = [{
    content: "JPP Stadium Branding: (Season 1, 2 & 3)",
    img: "img/ASFC/w2.jpg",
    detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }, {
    content: "JPP Team Management: Season 1",
    img: "img/ASFC/w2.jpg",
    detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }, {
    content: "JPP Team Management: Season 2",
    img: "img/ASFC/w2.jpg",
    detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }];
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
  }];
  $scope.clientspeak = {
    category: "Players Speak",
    text: "Awesome teamwork and planning",
    name: "Sunil Joshi",
    img: "img/movies/ranbir.jpg"
  };
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
  .controller('DiariesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
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
  })
  .controller('SportCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("sport");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
  .controller('PfhCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("pfh");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    var id = '3';
    NavigationService.getSportInsidedataByid(id, function(data) {
      $scope.pfhInsidedatadetail = data.queryresult;
      console.log($scope.pfhInsidedatadetail);
    })
    NavigationService.getpfhSeasonData(id, function(data) {
      $scope.pfhInsidedata = data.data;
      console.log($scope.pfhInsidedata);
    })
  })
  .controller('PfhDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $stateParams) {
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
  .controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contact");
    $scope.menutitle = NavigationService.makeactive("Contact US");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('BlogTextCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogtext");
    $scope.menutitle = NavigationService.makeactive("Blog-Text");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.blogtext = [{
      img: "img/blog/text/1.png",
      date: "12 January 2016",
      desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/blog/text/1.png",
      date: "12 January 2016",
      desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/blog/text/1.png",
      date: "12 January 2016",
      desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }];
    $scope.bgtext = [{
      img: "img/blog/text/t1.png",
      desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
    }, {
      img: "img/blog/text/t2.png",
      desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet."
    }, {
      img: "img/blog/text/t3.png",
      desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
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
      name: "pooja thakkare",
      time: "20 seconds",
      desc: "Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro.Lorem ipsum dolor sit amet, no saepe argumentum pro."
    }];
  })
  .controller('BlogImageCtrl', function($scope, TemplateService, NavigationService, $timeout) {
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
  })
  .controller('BlogVideoCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogvideo");
    $scope.menutitle = NavigationService.makeactive("Blog-Video");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
  })
  .controller('CareerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("career");
    $scope.menutitle = NavigationService.makeactive("Careers");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('CareerFormCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("careerform");
    $scope.menutitle = NavigationService.makeactive("Job Application");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('MiceCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("mice");
    $scope.menutitle = NavigationService.makeactive("Mice");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
    NavigationService.getMiceInsideBanner($stateParams.id, function(data) {
      console.log(data);
      if (data.value != false) {
        $scope.miceBanner = data.data;
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
  .controller('MediaCornerCtrl', function($scope, TemplateService, NavigationService, $timeout) {
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
    $scope.objfilter = {};
    $scope.objfilter.id = $stateParams.id;
    $scope.getMediayear = function(year) {
      NavigationService.getMediaByYear(function(data) {

        $scope.mediadata = data.data;
        $scope.mediadata.year = year;
        console.log($scope.mediadata);
      })
    }


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
    NavigationService.getEventInsideBanner($stateParams.id, function(data) {
      console.log(data);
      if (data.value != false) {
        $scope.eventBanner = data.data;
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
  .controller('TalentInsideCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("talentinside");
    $scope.menutitle = NavigationService.makeactive("Talents");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
  })
  .controller('TalentInsideDetailCtrl', function($scope, TemplateService, NavigationService, $timeout) {
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

    $scope.wallpaper = _.chunk($scope.wallpaper, 6);
    for (var i = 0; i < $scope.wallpaper.length; i++) {
      $scope.wallpaper[i] = _.chunk($scope.wallpaper[i], 3);
    }
  })
  .controller('WorldTourCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("worldtour");
    $scope.menutitle = NavigationService.makeactive("World Tours");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
  .controller('headerctrl', function($scope, TemplateService) {
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
  });
