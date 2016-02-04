var app;
(function (app) {
    var bandApp = angular.module('bandApp', [
        'bandApp.services',
        'ngRoute',
        'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.resizeColumns',
        'ngMaterial',
        'ngMessages'
    ]);
    bandApp.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/dashboard', {
            templateUrl: '/app/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'ctrl'
        })
            .when('/band/:id?', {
            templateUrl: '/app/band/band.html',
            controller: 'BandController',
            controllerAs: 'ctrl'
        })
            .otherwise('/dashboard');
    }
})(app || (app = {}));
var app;
(function (app) {
    var band;
    (function (band_1) {
        var BandController = (function () {
            function BandController($routeParams, DataService, $location) {
                this.$routeParams = $routeParams;
                this.DataService = DataService;
                this.$location = $location;
                this.removeAlbumFromCarousel = function (album) {
                    var index = this.band.albums.indexOf(album);
                    this.band.albums.splice(index, 1);
                };
                if ($routeParams.id)
                    this.getBand($routeParams.id);
            }
            BandController.prototype.getBand = function (id) {
                var _this = this;
                this.DataService.getArtist(id)
                    .then(function (band) {
                    _this.band = band;
                }, function (error) {
                    alert(error);
                });
            };
            BandController.prototype.submit = function () {
                if (this.$routeParams.id) {
                    this.DataService.putArtist(this.band);
                }
                else {
                    this.DataService.postArtist(this.band)
                        .then(function (response) {
                    });
                }
            };
            BandController.prototype.delete = function () {
                var _this = this;
                this.DataService.deleteArtist(this.band.id)
                    .then(function () {
                    _this.$location.path("/dashboard");
                });
            };
            BandController.$inject = ['$routeParams', 'app.services.DataService', '$location'];
            return BandController;
        })();
        angular.module('bandApp').controller('BandController', BandController);
    })(band = app.band || (app.band = {}));
})(app || (app = {}));
var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var DashboardController = (function () {
            function DashboardController(DataService) {
                this.DataService = DataService;
                this.initGridOptions();
                this.getBands();
            }
            DashboardController.prototype.initGridOptions = function () {
                this.bandGridOptions = {
                    columnDefs: [
                        { field: 'id', cellTemplate: '<div class="ui-grid-cell-contents"><a ng-href="#band/{{COL_FIELD}}">{{COL_FIELD}}</a></div>' },
                        { field: 'name', displayName: 'Band' },
                        { field: 'rating' }
                    ]
                };
            };
            DashboardController.prototype.getBands = function () {
                var _this = this;
                this.DataService.getArtists()
                    .then(function (bands) {
                    _this.bands = bands;
                    _this.bandGridOptions.data = _this.bands; //PROBLEM: should not have to set this here. it is set above
                }, function (error) {
                    alert(error);
                });
            };
            DashboardController.$inject = ['app.services.DataService'];
            return DashboardController;
        })();
        angular.module('bandApp').controller('DashboardController', DashboardController);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        angular
            .module('bandApp.services', ['ngResource']);
        var DataService = (function () {
            function DataService($http, $q /*, serviceSettings: ng.IModule*/) {
                this.$http = $http;
                this.$q = $q;
                //artistServiceUrl: string = 'http://localhost:49677/api/artists/';
                this.artistServiceUrl = 'http://testspkapi.azurewebsites.net/api/artists/';
            }
            DataService.prototype.getArtist = function (id) {
                var deferred = this.$q.defer();
                this.$http.get("" + this.artistServiceUrl + id)
                    .success(function (response) {
                    deferred.resolve(response);
                })
                    .error(function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            DataService.prototype.getArtists = function () {
                var deferred = this.$q.defer();
                this.$http.get(this.artistServiceUrl)
                    .success(function (response) {
                    deferred.resolve(response);
                })
                    .error(function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            DataService.prototype.putArtist = function (artist) {
                this.$http.put(this.artistServiceUrl + artist.id, artist);
            };
            DataService.prototype.postArtist = function (artist) {
                var deferred = this.$q.defer();
                this.$http.post(this.artistServiceUrl, artist)
                    .success(function (response) {
                    deferred.resolve(response);
                })
                    .error(function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            DataService.prototype.deleteArtist = function (id) {
                var deferred = this.$q.defer();
                this.$http.delete(this.artistServiceUrl + id)
                    .success(function (response) {
                    deferred.resolve(response);
                })
                    .error(function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            //artistServiceUrl = `${serviceSettings.serviceUrl}artists/`;
            DataService.$inject = ['$http', '$q' /*, 'serviceSettings'*/];
            return DataService;
        })();
        angular.module('bandApp.services').service('app.services.DataService', DataService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Album = (function () {
            function Album() {
            }
            return Album;
        })();
        domain.Album = Album;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Band = (function () {
            function Band() {
            }
            return Band;
        })();
        domain.Band = Band;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=dist.js.map