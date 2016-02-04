var app;
(function (app) {
    var service;
    (function (service) {
        var DashboardService = (function () {
            function DashboardService($resource) {
                this.$resource = $resource;
                this.serviceUrlBase = 'http://testspkapi.azurewebsites.net/api/';
            }
            DashboardService.prototype.getBandResource = function () {
                return this.$resource(this.serviceUrlBase + "artists/:id");
            };
            DashboardService.$inject = ['$resource'];
            return DashboardService;
        })();
        service.DashboardService = DashboardService;
        angular.module('bandApp').service('DashboardService', DashboardService);
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
//# sourceMappingURL=dashboard-service.js.map