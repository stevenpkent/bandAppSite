module app.services {
    'use strict';

    angular
        .module('bandApp.services', ['ngResource']);
        /*DOES NOT WORK COMPLETELY .constant('serviceSettings', {
            serviceUrl: 'http://testspkapi.azurewebsites.net/api/'
        });*/

    export interface IDataService {
        artistServiceUrl: string;
        getArtist(id: number): ng.IPromise<app.domain.IBand>;
        getArtists(): ng.IPromise<app.domain.IBand[]>;
        putArtist(artist: app.domain.IBand): void;
        postArtist(artist: app.domain.IBand): ng.IPromise<any>;
        deleteArtist(id: number): ng.IPromise<any>;
    }

    class DataService implements IDataService {
        //artistServiceUrl: string = 'http://localhost:49677/api/artists/';
        artistServiceUrl = 'http://testspkapi.azurewebsites.net/api/artists/'; 
        //artistServiceUrl = `${serviceSettings.serviceUrl}artists/`;

        static $inject = ['$http', '$q'/*, 'serviceSettings'*/];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService/*, serviceSettings: ng.IModule*/) {
            
        }

        getArtist(id: number): ng.IPromise<app.domain.IBand> {
            var deferred = this.$q.defer();

            this.$http.get(`${this.artistServiceUrl}${id}`)
                .success((response: ng.IHttpPromiseCallbackArg<app.domain.IBand>): void => {
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallbackArg<any>): void => {
                    deferred.reject(response);
                });

            return deferred.promise;              
        }

        getArtists(): ng.IPromise<app.domain.IBand[]> {
            var deferred = this.$q.defer();

            this.$http.get(this.artistServiceUrl)
                .success((response: ng.IHttpPromiseCallbackArg<app.domain.IBand[]>): void => {
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallbackArg<any>): void => {
                    deferred.reject(response);
                });

            return deferred.promise; 
        }

        putArtist(artist: app.domain.IBand): void {
            this.$http.put(this.artistServiceUrl + artist.id, artist); 
        }

        postArtist(artist: app.domain.IBand): ng.IPromise<any> {
            var deferred = this.$q.defer();

            this.$http.post(this.artistServiceUrl, artist)
                .success((response: ng.IHttpPromiseCallbackArg<any>): void => {
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallbackArg<any>): void => {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        deleteArtist(id: number): ng.IPromise<any> {
            var deferred = this.$q.defer();

            this.$http.delete(this.artistServiceUrl + id)
                .success((response: ng.IHttpPromiseCallbackArg<any>): void => {
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallbackArg<any>): void => {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }

    angular.module('bandApp.services').service('app.services.DataService', DataService);
}