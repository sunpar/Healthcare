//Create the app module
var spikesApp = angular.module('spikesApp', ['ngRoute']);

// Create the routes for your views
spikesApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: routes[0].templateUrl,
        controller: routes[0].controller
    });

    for (var i = 0; i<routes.length; i++) {
        $routeProvider.when('/' + routes[i].suffix, {
            templateUrl: routes[i].templateUrl,
            caseInsensitiveMatch: true,
            controller: routes[i].controller
        });
    }

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);