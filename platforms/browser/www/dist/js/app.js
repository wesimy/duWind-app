'use strict';
var app = angular.module('duwind', [
  'ngSanitize',
    'ngRoute',
  'ngSanitize',
    'ngAnimate',
    'ui.bootstrap'
]);
/**
 * @ngdoc object
 * @name App Config
 * @description Application Routing Provider
 **/

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'dev/meter/template.html',
            controller: 'MeterController',
            controllerAs: 'meterCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.value('settings', {
    offset: 90, //135
    refreshRate: 30000,
    wind: 'knot',
    temp: 'c'
})
app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {})
});
'use strict';

/**
 * @ngdoc controller
 * @name app.Controller:MeterController
 * @description
 * 
 * load the wind data and display it then in stage it will push it to the server.
 **/


app.controller('MeterController', ['$scope', '$location', '$interval', 'settings', 'MeterService', function ($scope, $location, $interval, settings, MeterService) {

    // Default Variables
    $scope.windData = {};
    $scope.settings = settings;




    /**
     * @ngdoc method
     * @name Load
     * @methodOf app.Controller:MeterController
     * @description
     * Gets new wind data and display it to the view.
     */
    $scope.loadWindData = function () {
        console.log('loading..');
        MeterService.GetWindData().then(function (d) {
                $scope.windData = d;
                $scope.windData.wind_direction_string = MeterService.GetWindDirectionString(d.wind_direction);
                console.log($scope.windData.wind_direction_string);
            },
            function (d) {
                console.log(d);
            });
    }


    /**
     * @ngdoc method
     * @name init
     * @methodOf app.Controller:MeterController
     * @description
     * Initialize meter controller
     */
    $scope.init = function () {
        // Setup Timer to Call Load Data
        $scope.loadWindData();
        $interval($scope.loadWindData, settings.refreshRate);
    }





    // Call init method
    $scope.init();



}]);
app.directive('rotate', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.degrees, function (rotateDegrees) {
                console.log(rotateDegrees);
                var r = 'rotate(' + rotateDegrees + 'deg)';
                element.css({
                    '-moz-transform': r,
                    '-webkit-transform': r,
                    '-o-transform': r,
                    '-ms-transform': r
                });
            });
        }
    }
});
/**
 * @ngdoc service
 * @name app.Service:MeterService
 * @description
 * this service contains all the login services.
 **/
app.service("MeterService", ['$http', '$q', function ($http, $q)
    {

        /**
         * @ngdoc method
         * @name GetWindData
         * @methodOf app.Service:MeterService
         * @returns {json} wind data json object
         */
        this.GetWindData = function () {
            var def = $q.defer();
            $http.get('https://www.windguru.cz/int/iapi.php?q=station_data_current&id_station=297')
                .success(function (data) {
                    def.resolve(data);
                })
                .error(function (data) {
                    def.reject('Wind Data Not Available');
                });

            return def.promise;
        };


        /**
         * @ngdoc method
         * @name GetWindDirectionString
         * @methodOf app.Service:MeterService
         * @param {int} direction value string
         * @returns {string} wind direction string
         */
        this.GetWindDirectionString = function (dir) {
            console.log(dir);
            switch (true) {

            case (dir > 348.75 && dir <= 11.25):
                return 'N';
                break;

            case (dir > 11.25 && dir <= 33.75):
                return 'NNE';
                break;

            case (dir > 33.75 && dir <= 56.25):
                return 'NE';
                break;

            case (dir > 56.25 && dir <= 78.75):
                return 'ENE';
                break;

            case (dir > 78.75 && dir <= 101.25):
                return 'E';
                break;

            case (dir > 101.25 && dir <= 123.75):
                return 'ESE';
                break;

            case (dir > 123.75 && dir <= 146.25):
                return 'SE';
                break;

            case (dir > 146.25 && dir <= 168.75):
                return 'SSE';
                break;

            case (dir > 168.75 && dir <= 191.25):
                return 'S';
                break;

            case (dir > 191.25 && dir <= 213.75):
                return 'SSW';
                break;

            case (dir > 213.75 && dir <= 236.25):
                return 'SW';
                break;

            case (dir > 236.25 && dir <= 258.75):
                return 'WSW';
                break;

            case (dir > 258.75 && dir <= 283.25):
                return 'W';
                break;

            case (dir > 283.25 && dir <= 303.25):
                return 'WNW';
                break;

            case (dir > 303.25 && dir <= 326.25):
                return 'NW';
                break;

            case (dir > 326.25 && dir <= 348.75):
                return 'NNW';
                break;

            default:
                return 'N';
                break;

            }



        };




                             }]);