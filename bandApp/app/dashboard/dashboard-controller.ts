module app.dashboard {

    interface IDashboardController {
        bands: app.domain.IBand[];       
        bandGridOptions: any;
        initGridOptions(): void;
        getBands(): void;
    }

    class DashboardController implements IDashboardController {
        bands: app.domain.IBand[];
        bandGridOptions: any;

        static $inject = ['app.services.DataService'];
        constructor(private DataService: app.services.IDataService) {
            this.initGridOptions();         
            this.getBands();          
        }

        initGridOptions(): void {          
            this.bandGridOptions = {            
                columnDefs: [
                    { field: 'id', cellTemplate: '<div class="ui-grid-cell-contents"><a ng-href="#band/{{COL_FIELD}}">{{COL_FIELD}}</a></div>' },
                    { field: 'name', displayName: 'Band' },
                    { field: 'rating' }
                ]
                //PROBLEM: setting this here is not working ,data: this.bands
            };                   
        }

        getBands(): void {          
            this.DataService.getArtists()
                .then((bands: app.domain.IBand[]): void => {
                    this.bands = bands;
                    this.bandGridOptions.data = this.bands; //PROBLEM: should not have to set this here. it is set above
                }, (error: any): void => {
                    alert(error);
                });           
        }
    }

    angular.module('bandApp').controller('DashboardController', DashboardController);
}
