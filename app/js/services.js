// The Qlik Sense App Service
spikesApp.service('AppService',['$http','$q', function($http, $q) {
    // Variables
    var global_promise,
        app_promise;

    // Accessor functions
    this.app = function() {
        return app_promise;
    };

    this.global = function() {
        return global_promise;
    };
    
    // Connect to get global promise
    global_promise = qsocks.Connect(config);

    // Execute function to get the app promise
    app_promise = function() {
        var defer = $q.defer();

        global_promise.then(function(global) {

            // Try to open the app; if it works, return the object.
            // If it doesn't work, try getting the active doc instead.
            global.openDoc(appid).then(function(app) {
                defer.resolve(app);
            },
            function(error) {
                if(error.code == '1002') {
                    global.getActiveDoc().then(function(app) {
                        defer.resolve(app);
                    }, function(error) {
                        defer.reject('Error loading apps');
                    });
                }
            });
        });
        return defer.promise;
    }();
}]);