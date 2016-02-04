module app.domain {

    export interface IAlbum {
        id: number;
        name: string;
        year: number;
        rating: number;
    }

    export class Album implements IAlbum {
        id: number;
        name: string;
        year: number;
        rating: number;
    }
}