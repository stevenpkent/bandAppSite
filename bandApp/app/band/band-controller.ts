module app.band {

    interface IBandController {
        band: app.domain.IBand;   
        getBand(id: number): void;
        submit(): void;
        delete(): void;
    }

    interface IBandRouteParams extends ng.route.IRouteParamsService {
        id: number;
    }
    
    class BandController implements IBandController {
        band: app.domain.IBand;
            
        static $inject = ['$routeParams', 'app.services.DataService', '$location'];
        constructor(private $routeParams: IBandRouteParams, private DataService: app.services.IDataService, private $location: ng.ILocationService) {
            if ($routeParams.id) this.getBand($routeParams.id);
        }

        getBand(id: number): void {
            this.DataService.getArtist(id)
                .then((band: app.domain.IBand): void => {
                    this.band = band;
                },
                (error: any): void => {
                    alert(error);
                });
        }

        submit(): void {           
            if (this.$routeParams.id) {
                this.DataService.putArtist(this.band);                 
            }
            else {
                this.DataService.postArtist(this.band)
                    .then((response: any): void => {
                        
                    });
            }
        }

        delete(): void {
            this.DataService.deleteArtist(this.band.id)
                .then((): void => {
                    this.$location.path("/dashboard");
                });             
        }

        removeAlbumFromCarousel = function (album) {
            var index = this.band.albums.indexOf(album);
            this.band.albums.splice(index, 1);
        };
    }

    angular.module('bandApp').controller('BandController', BandController);
}