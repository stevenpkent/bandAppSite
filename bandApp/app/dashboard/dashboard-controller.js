var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var DashboardController = (function () {
            function DashboardController(DashboadService) {
                this.DashboadService = DashboadService;
                this.getBands();
            }
            DashboardController.prototype.getBands = function () {
                var _this = this;
                this.DashboadService.getBandResource()
                    .query(function (response) {
                    _this.bands = response;
                });
            };
            DashboardController.prototype.getBand = function (id) {
                var params = { id: id };
                this.DashboadService.getBandResource()
                    .get(params, function (response) {
                    alert(response.name);
                });
            };
            DashboardController.$inject = ['DashboardService'];
            return DashboardController;
        })();
        angular.module('bandApp').controller('DashboardController', DashboardController);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=dashboard-controller.js.map