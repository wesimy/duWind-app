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