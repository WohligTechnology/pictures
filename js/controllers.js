angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    // $scope.mySlides = [
    //   'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
    //   'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
    //   'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
    //   'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
    // ];
    $scope.clientspeak = {
      category: "Client Speak",
      text: "Extra Efficient",
      name: "Amitabh Bachchan",
      img: "../img/home/amitabh.jpg"
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
  })
  //
  .controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("movies");
    $scope.menutitle = NavigationService.makeactive("Movies");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.moviereleased = [{
      img: "img/movies/released/released1.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released2.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released3.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released5.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }];
    $scope.movieupcoming = [{
      img: "img/movies/released/released1.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released2.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released3.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
    }, {
      img: "img/movies/released/released5.jpg",
      date: "12 January 2016",
      // desc: "Lorem Ipsum is simply dummy text of the printing industry"
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
      img: "../img/movies/ranbir.jpg"
    };
  })
  .controller('MoviesInsideCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("moviesinside");
    $scope.menutitle = NavigationService.makeactive("Movies");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.clientspeak = {
      category: "Client Speak",
      text: "Extra Efficient",
      name: "Amitabh Bachchan",
      img: "../img/home/amitabh.jpg"
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
      img: "../img/moviedetail/wallpapers/wallpaper1.jpg"
    }, {
      img: "../img/moviedetail/wallpapers/wallpaper2.jpg"
    }, {
      img: "../img/moviedetail/wallpapers/wallpaper3.jpg"
    }, {
      img: "../img/moviedetail/wallpapers/wallpaper4.jpg"
    }, {
      img: "../img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
      img: "../img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
      img: "../img/moviedetail/wallpapers/wallpaper6.jpg"
    }];
    $scope.wallpapers = _.chunk($scope.wallpapers, 6);
    for (var i = 0; i < $scope.wallpapers.length; i++) {
      $scope.wallpapers[i] = _.chunk($scope.wallpapers[i], 3);
    }
  })
  .controller('TalentsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("talents");
    $scope.menutitle = NavigationService.makeactive("Talents");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.wedding = [{
      img: "img/talent/talents/talent1.jpg",
      name: "BRAND AMBASSAORS"
    }, {
      img: "img/talent/talents/talent2.jpg",
      name: "Appearances"
    }, {
      img: "img/talent/talents/talent3.jpg",
      name: "TALENT REPRESENTATION"
    }, {
      img: "img/talent/talents/talent4.jpg",
      name: "CELEBRITY ENDORSEMENTS"
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

  })
  .controller('WeddingCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("wedding");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;

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
  })
  .controller('WeddingInsideCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("weddinginside");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
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
    } else {
      $scope.getslide = "menu-in";
      $scope.onebar = "firstbar";
      $scope.secondbar = "secondbar";
      $scope.thirdbar = "thirdbar";
    }
  }
});
