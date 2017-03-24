movieBookingApp.controller('BookController', function($scope, $http, $log, $location, $rootScope)
{

    $scope.tagline = 'All bookings on this page';
    $scope.movi = $rootScope.movieData;
    console.log("______________________movieData")
    console.log($scope.movi);

     $scope.bookTime = $rootScope.timeData;
     $scope.selectCity;
     $scope.selectTheater;
   

      //Assign Movie
        // $http.get('/assignmovie/getAssignmovi').success(function (response) {
        //     console.log('READ IS SUCCESSFUL');
        //     $scope.asnmoviesList = response;
        //     $scope.asnmovies = "";
        //      console.log("_______________________________________________________Assign");
        //     console.log(response);
        // });

$scope.getAsnDataForMovie = function () {
        console.log("RESULT");
        console.log($scope.movi.moviTitle);
        $http.get('/assignmovie/getAssignmoviData/' +  $scope.movi.moviTitle).success(function (response) {

             $scope.selectList = response;
             $scope.selectCity = $scope.selectList[0].asnmovicity;
             $scope.selectTheater = $scope.selectList[0].asnmovitheatre;
             



            console.log("Assign movie get RESULT");
            console.log(response);
            console.log($scope.selectCityList);
            //refresh();
        })
    };
      $scope.getAsnDataForMovie();
});
