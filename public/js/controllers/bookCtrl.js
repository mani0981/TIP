movieBookingApp.controller('BookController', function($scope, $http, $log, $location)
{

    $scope.tagline = 'All bookings on this page';

    var refresh = function() {
      
        $http.get('/book/getBooking').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.bookList = response;
            console.log($scope.bookList);
            $scope.booking = "";
        });
        $scope.adminCity = true;
            $scope.adminTheatre = true;
            $scope.adminAssign = true;
            $scope.adminMovies = true;
            $scope.adminShowtime = true;
            $scope.adminBooking = true;
        
    };


    refresh();

    $scope.deleteBooking = function(booking) {
        console.log($scope.booking);
        $http.delete('/book/deleteBooking/' + booking._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

});
