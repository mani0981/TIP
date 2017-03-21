movieBookingApp.controller('adminController', function($scope, $http) {

    $scope.tagline = 'Welcome to Admin!';   
    $scope.errorMessage = false;
    $scope.successMessage = false;
    


    var refresh = function() {

        //Movie
        $http.get('/movie/getMovie').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.moviList = response;
            $scope.movi = "";
        });

        //City
        $http.get('/city/getCity').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
        });

        //Theatre
        $http.get('/theatre/getTheatre').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            $scope.theatre = "";
        });

        //Showtiming 
         $http.get('/showtiming/getShowtime').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.showtimeList = response;
            $scope.showtimes = "";
        });

        //Assign Movie
        $http.get('/assignmovie/getAssignmovi').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.asnmoviesList = response;
            $scope.asnmovies = "";
        });

        


    };

    refresh();

//Movie
   
    $scope.addMovie = function(movi) {
        $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function(response) {
            console.log(response);
            var movieObj = {};
            for (var key in response) {
                if (key == 'Title' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors' || key == 'Plot') {
                    movieObj[key] = response[key];

                }
            }
           // $http.defaults.headers.post["Content-Type"] = "application/json";

            $http({
                    method: 'POST',
                    url: '/movie/addMovie',
                     headers: {'Content-Type': 'application/json'},    
                    data: movieObj
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    $scope.smsg = response.data.moviTitle + " added successfully.";
                    $scope.successMessage = true;
                    refresh();
                },function(err){
                    console.log($scope.msg);
                    $scope.msg = err.data.op.moviTitle + " already in the list";
                    $scope.errorMessage = true;
                    //$scope.$apply();
                    
                
                });


            

        });
       
    };
    
    $scope.clearErrorMessage = function () {
    console.log('Inside method');
    $scope.errorMessage = false;
    $scope.successMessage = false;
    };
    


    $scope.removeMovie = function(movie) {
        //console.log(id);
        $http.delete('/movie/deleteMovie/' + movie._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editMovie = function(movie) {
        $http.get('/movie/getMovie/' + movie._id).success(function(response) {
            $scope.movi = response[0];
        });
    };

    $scope.updateMovie = function() {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updateMovie/' + $scope.movi._id, $scope.movi).success(function(response) {
            console.log(response);
            refresh();
        })
    }

  
    //city
     $scope.addCity = function (city) {
                         
                            $http.post('/city/addCity', city).success(function (response) {
                                
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeCity = function (city) {
       
        $http.delete('/city/deleteCity/' + city._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
      
    };

    $scope.editCity = function (city) {
         $http.get('/city/getCity/' + city._id).success(function (response) {
            $scope.city = response[0];
        });
    };

    $scope.updateCity = function () {
        console.log("REACHED UPDATE");
        
        $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function (response) {
            console.log(response);
            refresh();
        })
    }
    
    //theatre
    $scope.addTheatre = function (theatre) {
                         
                            $http.post('/theatre/addTheatre', theatre).success(function (response) {
                                
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeTheatre = function (theatre) {
       var confm = confirm("Are you sure you want to delete this theater?");
      if (confm == true) {
        $http.delete('/theatre/deleteTheatre/' + theatre._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
      }
    };

    $scope.editTheatre = function (theatre) {
         $http.get('/theatre/getTheatre/' + theatre._id).success(function (response) {
            $scope.theatre = response[0];
        });
    };

    $scope.updateTheatre = function () {
        console.log("REACHED UPDATE");
        $http.put('/theatre/updateTheatre/' + $scope.theatre._id, $scope.theatre).success(function (response) {
            console.log(response);
            refresh();
        })
    };

//showTiming
     $scope.addShow = function (showtimes) {
         
                            $http.post('/showtiming/addShow', showtimes).success(function (response) {
                                
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeShowtime = function (showtimes) {
       var confm = confirm("Are you sure you want to delete this Show Time?");
      if (confm == true) {
        $http.delete('/showtiming/deleteShowtime/' + showtimes._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
      }
    };

    $scope.editShowtime = function (showtimes) {
         $http.get('/showtiming/getShowtime/' + showtimes._id).success(function (response) {
            $scope.showtimes = response[0];
        });
    };

    $scope.updateShowtime = function () {
        console.log("REACHED UPDATE");

        $http.put('/showtiming/updateShowtime/' + $scope.showtimes._id, $scope.showtimes).success(function (response) {
            console.log(response);
            refresh();
        })
    };
    


  

    
     //assign movie

     
     $scope.addAsnmovi = function (asnmovies) {
         
         var ft = $('#fromdate').val();
         var tt = $('#todate').val();
         
         ft=moment(ft).format('L');
         tt=moment(tt).format('L');
         
         $scope.asnmovies.fromdate=ft;
         $scope.asnmovies.todate=tt;
         
                 $http.post('/assignmovie/addAsnmovi', asnmovies).success(function (response) {
                                
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeAsnmovi = function (asnmovies) {
       var r = confirm("Are you sure you want to delete this Assign Movie?");
      if (r == true) {
        $http.delete('/assignmovie/removeAsnmovi/' + asnmovies._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
      }
    };

    $scope.editAsnmovi = function (asnmovies) {
        
         $http.get('/assignmovie/editAsnmovi/' + asnmovies._id).success(function (response) {
            $scope.asnmovies = response[0];
        });
    };

    $scope.updateAsnmovi = function () {
        console.log("REACHED UPDATE");

        $http.put('/assignmovie/updateAsnmovi/' + $scope.asnmovies._id, $scope.asnmovies).success(function (response) {
            console.log(response);
            refresh();
        })
    };
    
    
    $scope.getTheatreDetail = function () {
        
         $http.get('/theatre/getByCity/' + $scope.asnmovies.asnmovicity).success(function (response) {
             console.log(response);
             $scope.atheatreList = response;

        });
    };
    

});