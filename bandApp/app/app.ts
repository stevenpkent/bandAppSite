module app {
    var bandApp = angular.module('bandApp', [
        'bandApp.services',
        'ngRoute',
        'ui.grid', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.resizeColumns',
        'ngMaterial',
        'ngMessages'
    ]);
    bandApp.config(routeConfig);
    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
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
}