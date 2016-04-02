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
          }
        } else {
          $scope.subscribeEmail = true;
          $scope.checkEmail = false;
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
  })
  //
  .controller('MoviesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("movies");
    $scope.menutitle = NavigationService.makeactive("Movies");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.formData = {};
    $scope.moviesSubmitForm = function(formValid, formData) {
      if (formValid.$valid && $scope.formData) {
        // NavigationService.userCreateSubmit($scope.userForm, function(data) {
        //   console.log('userform', $scope.userForm);
        $state.go("movies");
        // });

      }
    };
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
          }
        } else {
          $scope.subscribeEmail = true;
          $scope.checkEmail = false;
        }
        //console.log(email);
        $scope.subscribe.email = "";
      });

      // $scope.subscribeEmail = data;
    };
    $scope.moviereleased = [{
      img: "img/movies/released/released1.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released2.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released3.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released5.jpg",
      date: "12 January 2016",
    }];
    $scope.movieupcoming = [{
      img: "img/movies/released/released1.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released4.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released2.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released3.jpg",
      date: "12 January 2016",
    }, {
      img: "img/movies/released/released4.jpg",
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
      img: "img/moviedetail/wallpapers/wallpaper5.jpg"
    }, {
      img: "img/moviedetail/wallpapers/wallpaper6.jpg"
    }];
    $scope.wallpapers = _.chunk($scope.wallpapers, 6);
    for (var i = 0; i < $scope.wallpapers.length; i++) {
      $scope.wallpapers[i] = _.chunk($scope.wallpapers[i], 3);
    }
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
  .controller('TalentsCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("talents");
    $scope.menutitle = NavigationService.makeactive("Talents");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.formData = {};
    $scope.talentSubmitForm = function(formValid, formData) {
      if (formValid.$valid && $scope.formData) {
        // NavigationService.userCreateSubmit($scope.userForm, function(data) {
        //   console.log('userform', $scope.userForm);
        $state.go("talent");
        // });

      }
    };
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
          }
        } else {
          $scope.subscribeEmail = true;
          $scope.checkEmail = false;
        }
        //console.log(email);
        $scope.subscribe.email = "";
      });

      // $scope.subscribeEmail = data;
    };
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
  .controller('WeddingCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("wedding");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.oneAtATime = true;
    $scope.formData = {};
    $scope.weddingSubmitForm = function(formValid, formData) {
      if (formValid.$valid && $scope.formData) {
        // NavigationService.userCreateSubmit($scope.userForm, function(data) {
        //   console.log('userform', $scope.userForm);
        $state.go("wedding");
        // });

      }
    };

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
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Wedding Design and Production",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Destination Management",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Entertainment & Talent",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Photography & Videography",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Catering Liasion",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "RSVP, Hospitality & Transport",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "VENUE SELECTION",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "THEMED EVENTS",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "TRAVEL & STAY",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "DECOR",
      content: "Décor is like a crown of jewels…special attention is paid to colours of drapes, flower arrangements, backdrops, props, lighting, seating, etc. for a tasteful presentation. We execute all these minute details with perfection. We understand how important it is to match the colour of the flowers of the centre piece with that of the bow of the chair…we understand the scheme of colours, the fall of the fabrics."
    }, {
      title: "ENTERTAINMENT",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "CATERING",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Styling",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Security & Licenses",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "Website and Social Media",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
    }, {
      title: "E-invites and Social-Media Presence",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel a at atque ipsum mollitia officia veniam. Maxime, ab. Alias facilis voluptatum nobis, praesentium porro quis. Harum inventore magnam a delectus."
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
  .controller('WeddingInsideCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("weddinginside");
    $scope.menutitle = NavigationService.makeactive("Wedding");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.weddingdetail = [{
      img: "img/weddings/w1.png",
      name: "Choksi-Talera Wedding Setup",
      detail: "The beautiful #choksitalerawedding took place at Mohini Mahal on 16th April, 2014. The entire #event was organized and managed by GS Worldwide Entertainment. #gswedding "
    }, {
      img: "img/weddings/w1.png",
      name: "Jhosi Wedding",
      detail: "The beautiful #choksitalerawedding took place at Mohini Mahal on 16th April, 2014. The entire #event was organized and managed by GS Worldwide Entertainment. #gswedding"
    }];
  })

.controller('asfcCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("asfc");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.asfcdetail = [{
      img: "img/ASFC/w1.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
      img: "img/ASFC/w2.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
      img: "img/ASFC/w3.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
      img: "img/ASFC/w4.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }];
    $scope.asfcplayer = [{
      img: "img/ASFC/player1.jpg",
      name: "Abhisek Bachchan",
    }, {
      img: "img/ASFC/player2.jpg",
      name: "Ranbir Kapoor",
    }, {
      img: "img/ASFC/player3.jpg",
      name: "Aditya Roy Kapoor",
    }, {
      img: "img/ASFC/player4.jpg",
      name: "Arjun Kapoor",
    }, {
      img: "img/ASFC/player5.jpg",
      name: "Dino Morea",
    }];
    $scope.clientspeak = {
      category: "Players Speak",
      text: "Awesome teamwork and planning",
      name: "Sunil Joshi",
      img: "img/movies/ranbir.jpg"
    };
  })
  .controller('asfcCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("asfc");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.asfcSubmitForm = function(formValid, formData) {
      if (formValid.$valid && $scope.formData) {
        // NavigationService.userCreateSubmit($scope.userForm, function(data) {
        //   console.log('userform', $scope.userForm);
        $state.go("asfc");
        // });

      }
    };
    $scope.asfcdetail = [{
      img: "img/ASFC/w1.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
      img: "img/ASFC/w2.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
      img: "img/ASFC/w3.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }, {
      img: "img/ASFC/w4.jpg",
      team1: "AHFC",
      team2: "AHFC",
      date: "15 Sep 2015",
      location: "Bangalore",
      detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }];
    $scope.asfcplayer = [{
      img: "img/ASFC/player1.jpg",
      name: "Abhisek Bachchan",
    }, {
      img: "img/ASFC/player2.jpg",
      name: "Ranbir Kapoor",
    }, {
      img: "img/ASFC/player3.jpg",
      name: "Aditya Roy Kapoor",
    }, {
      img: "img/ASFC/player4.jpg",
      name: "Arjun Kapoor",
    }, {
      img: "img/ASFC/player5.jpg",
      name: "Dino Morea",
    }];
    $scope.clientspeak = {
      category: "Players Speak",
      text: "Awesome teamwork and planning",
      name: "Sunil Joshi",
      img: "img/movies/ranbir.jpg"
    };
  })
  .controller('jppCtrl', function($scope, TemplateService, NavigationService, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("jpp");
    $scope.menutitle = NavigationService.makeactive("Sports");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.jppdetail = [{
      team1: "img/jpp/jpp-logo.png",
      team2: "img/jpp/jpp-logo.png",
      date: "15 Sep 2015",
      venu: "IndoorStadium, Hyderabad",
      time: "10:30"
    }, {
      team1: "img/jpp/jpp-logo.png",
      team2: "img/jpp/jpp-logo.png",
      date: "30th Jan, 2016",
      venu: "IndoorStadium, Hyderabad",
      time: "10:30"
    }, {
      team1: "img/jpp/jpp-logo.png",
      team2: "img/jpp/jpp-logo.png",
      date: "15 Sep 2015",
      venu: "IndoorStadium, Hyderabad",
      time: "10:30"
    }, {
      team1: "img/jpp/jpp-logo.png",
      team2: "img/jpp/jpp-logo.png",
      date: "15 Sep 2015",
      venu: "IndoorStadium, Hyderabad",
      time: "10:30"
    }, {
      team1: "img/jpp/jpp-logo.png",
      team2: "img/jpp/jpp-logo.png",
      date: "15 Sep 2015",
      venu: "IndoorStadium, Hyderabad",
      time: "10:30"
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
      $scope.bgwhite = "";
    } else {
      $scope.getslide = "menu-in";
      $scope.onebar = "firstbar";
      $scope.secondbar = "secondbar";
      $scope.thirdbar = "thirdbar";
      $scope.bgwhite = "bg-white";
    }
  }
});
