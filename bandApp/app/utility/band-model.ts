module app.domain {

    export interface IBand {
        id: number;
        name: string;
        rating: number;
        albums: IAlbum[];
    }

    export class Band implements IBand {
        id: number;
        name: string;
        rating: number;
        albums: IAlbum[];
    }

}