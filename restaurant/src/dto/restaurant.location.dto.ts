import LOCALE from 'src/../config/locales';
import { min } from "rxjs/operators";
import { Min, Max } from "class-validator";
import { Expose, Exclude } from "class-transformer";

export class RestaurantLocation {

    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }
    
    @Expose()
    @Min(-90, { message: LOCALE.MIN_FIELD_LENGTH })
    @Max(90, { message: LOCALE.MAX_FIELD_LENGTH })
    lat: number;

    @Expose()
    @Min(-90, { message: LOCALE.MIN_FIELD_LENGTH })
    @Max(90, { message: LOCALE.MAX_FIELD_LENGTH })
    lng: number;    
}

export default RestaurantLocation;