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