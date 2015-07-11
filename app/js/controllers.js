// Create main controller which handles websocket updates
Healthcare.controller('HealthCtrl',['AppService','$scope',function(AppService,$scope) {
    var self = this;
    $scope.global_promise = AppService.global();
    $scope.app_promise = AppService.app();
    $scope.QSversion = undefined;
    $scope.apptitle = undefined;
    $scope.lastrefresh = undefined;
    $scope.routes = routes;
    $scope.listbox = undefined;
    
    
    $scope.global_promise.then(function(global) {

        // Add websocket event listener that broadcasts changes when they are received
        var socket = global.connection.ws;
        socket.addEventListener('message', function(event) {
            var data = JSON.parse(event.data);
            if(data.hasOwnProperty('change')) {
                $scope.$broadcast('wsUpdate',data.change);
            }
        });

        // Get the QS version #
        /*global.productVersion().then(function(data) {
            $scope.$apply(function() {
                $scope.QSversion = data;
            })
        });*/
        global.qvVersion().then(function(data) {
            $scope.$apply(function() {
                $scope.QSversion = data;
            })
        });
    });


    // App data
    $scope.app_promise.then(function(app) {
        
        // Get the app title and last refresh data
        app.getAppLayout().then(function(data) {
            $scope.$apply(function() {
                $scope.apptitle = data.qTitle;
                $scope.lastrefresh = data.qLastReloadTime;
            });
        });

    });




}]);

//TitleController
Healthcare.controller('TitleCtrl',['$scope',function($scope) {

    $scope.claimDates = undefined;
    
    $scope.app_promise.then(function(app) {

        // Using the Axis API to create a measure
        var prop =  {
            'claimDates':{ qValueExpression: '=Min(CLM_THRU_DT)'},     
            'qInfo': 
                {
                'qType': 'qValueExpr',
                }
        };

        /*
        var measure = axisAPI.object()
                .app(app)
                .prop(prop)
                .init(function(object) {
                    wsSubscribe(object,$scope);
                    object.paintObj();
                })
                .paint(function(object) {
                    $scope.$apply(function() {
                        $scope.claimDates = object.layout().claimDates;
                    });
                })
                .create();
        */
        var measure = axisAPI.object()
                .app(app)
                .prop(prop)
                .on('create',function(object) {
                    wsSubscribe(object,$scope);
                    object.paint();
                })
                .on('paint',function(object) {
                    $scope.$apply(function() {
                        $scope.claimDates = object.layout().claimDates;
                    });
                })
                .create();

        measure = 
        _measure = measure;

    });

}]);






// Example view controllers
Healthcare.controller('View1Ctrl',['$scope',function($scope) {

    $scope.totalSales = undefined;
    
    $scope.app_promise.then(function(app) {

        // Using the Axis API to create a measure
        var prop =  {
            'totalSales':{ qValueExpression: '=sum([Sales Amount])'},     
            'qInfo': 
                {
                'qType': 'qValueExpr',
                }
        };

        /*
        var measure = axisAPI.object()
                .app(app)
                .prop(prop)
                .init(function(object) {
                    wsSubscribe(object,$scope);
                    object.paintObj();
                })
                .paint(function(object) {
                    $scope.$apply(function() {
                        $scope.totalSales = object.layout().totalSales;
                    });
                })
                .create();
        */
        var measure = axisAPI.object()
                .app(app)
                .prop(prop)
                .on('create',function(object) {
                    wsSubscribe(object,$scope);
                    object.paint();
                })
                .on('paint',function(object) {
                    $scope.$apply(function() {
                        $scope.totalSales = object.layout().totalSales;
                    });
                })
                .create();

        _measure = measure;

    });

}]);

// Example view controllers
Healthcare.controller('View2Ctrl',['$scope',function($scope) {

    $scope.regionSales = undefined;

    $scope.app_promise.then(function(app) {

        // Using the Axis API to create a hypercube
        var prop = {
            'qInfo': {
                'qType': 'Chart'
            },
            'qHyperCubeDef': {
                'qDimensions': [
                    {
                        'qDef': {
                            'qFieldDefs': ['Region']
                        }
                    }
                ],
                'qMeasures': [
                    {
                        'qDef': {
                            'qDef': '=sum([Sales Amount])'
                        }
                    }
                ],
                'qInitialDataFetch': [
                    {
                        'qWidth':2,
                        'qHeight':1000
                    }
                ]
            }
        };

        var table = axisAPI.object()
            .app(app)
            .prop(prop)
            .on('create',function(object) {
                wsSubscribe(object,$scope);
                object.paint();
            })
            .on('paint',function(object) {
                $scope.$apply(function() {
                    $scope.regionSales = object.layout().qHyperCube.qDataPages[0].qMatrix;
                });
            })
            .create();
    });

}]);

//Sidebar controller
Healthcare.controller('SidebarCtrl',['$scope',function($scope) {


}]);

// Helper functions
function wsSubscribe(object,scope) {
    scope.$on('wsUpdate',function(event,data) {
        if(data.indexOf(object.sock().handle)>-1) {
            object.update();
        };
    });

    scope.$on('$destroy', function() {
        object.destroy();
    });
}