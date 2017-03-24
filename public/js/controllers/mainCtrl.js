movieBookingApp.controller('mainController', function($scope, $http) {

	
	
	$scope.moviList = [];
    
    $http.get('/movie/getMovie').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.moviList_ = response;
            $scope.movi = "";
			
			//Assign Movie
			$http.get('/assignmovie/getAssignmovi').success(function (response) {
				console.log('READ IS SUCCESSFUL');
				$scope.asnmoviesList = response;
				$scope.asnmovies = "";
				
				for(var i=0; i < $scope.asnmoviesList.length; i++){
					for(var j=0; j < $scope.moviList_.length; j++){
						if($scope.moviList_[j].moviTitle == $scope.asnmoviesList[i].asnmovi){
							$scope.moviList.push($scope.moviList_[j]);
							break;
							$scope.movieList = true;
							$scope.bookingWindow = true;
						}
					}
				}
				
	
			});
        });
		
		

});