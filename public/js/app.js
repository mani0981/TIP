//angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'BookingCtrl', 'NerdService', 'MoviesCtrl', 'GeekService', 'TheaterCtrl']);

var movieBookingApp = angular.module('movieBookingApp',
                             ['ngRoute',
                              'appRoutes']
                             );




movieBookingApp.filter('unique', function() {
   return function(collection, keyname) {
   	keyname = 'moviTitle';
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
});
