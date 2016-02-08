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