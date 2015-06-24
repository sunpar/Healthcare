// Example listbox directive
spikesApp.directive('listbox',function() {

    function link(scope, element, attr) {
        _scope = scope;

        scope.listbox = undefined;

        scope.select = function(d) {
            scope.listbox.sock().selectListObjectValues('/qListObjectDef',[d[0].qElemNumber],true,false);
        }

        scope.appPr.then(function(app) {
             // Get listbox data using Axis API
            var prop = {
                        "qInfo": {
                            "qType": "ListObject"
                        },
                        "qListObjectDef": {
                            "qLibraryId": "",
                            "qDef": {
                                "qFieldDefs": [
                                    scope.field
                                ],
                                "qSortCriterias": [{
                                    "qSortByAsci": 1
                                }]
                            },
                            "qInitialDataFetch": [{
                                "qTop": 0,
                                "qHeight": 5000,
                                "qLeft": 0,
                                "qWidth": 1
                            }]
                        }
                    };

            scope.listbox = axisAPI.object()
                .app(app)
                .prop(prop)
                .on('create',function(object) {
                    wsSubscribe(object,scope);
                    object.paint();
                })
                .on('paint',function(object) {
                    scope.$apply(function() {
                        scope.listbox = object;
                    });
                })
                .create();
        });

    }

    return {
        link: link,
        restrict: 'E',
        templateUrl:'app/partials/listbox.html',
        scope: {
            field: '=',
            appPr: '='
        }
    }
});