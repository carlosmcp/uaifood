import { Type, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import LOCALE from 'src/../config/locales';
import FoodEnum from '../enum/restaurant.food';

export class RestaurantQueryDTO {
    private readonly EARTH_MEAN = 6378137;
    private readonly MILES = 1.609344 ;

    @IsOptional()
    @Transform(city => city.toUpperCase())
    @MinLength(3, { message: LOCALE.MIN_FIELD_LENGTH })
    @MaxLength(20, { message: LOCALE.MIN_FIELD_LENGTH })
    city: string;

    @IsOptional()
    @IsEnum(FoodEnum, {
        message: LOCALE.FOOD_TYPE, context: {
            [LOCALE.ALLOW_FOOD_TYPE]: Object.values(FoodEnum)
        }
    })
    food: FoodEnum;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0, { message: LOCALE.MIN_FIELD_LENGTH })
    readonly page: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(10)
    readonly limit: number = 10;
    
    @IsOptional()
    @Min(-90, { message: LOCALE.MIN_FIELD_LENGTH })
    @Max(90, { message: LOCALE.MAX_FIELD_LENGTH })
    @Type(() => Number)
    lat: number;

    @IsOptional()
    @Min(-90, { message: LOCALE.MIN_NUMBER })
    @Max(90, { message: LOCALE.MAX_NUMBER })
    @Type(() => Number)
    lng: number;
    
    @IsOptional()
    @Min(1, { message: LOCALE.MIN_NUMBER })
    @Max(10000, { message: LOCALE.MAX_NUMBER })
    @Type(() => Number)
    radius: number;

    format() {
        const query = {
            location: undefined,
            city: this.city,
            food: this.food
        }

        if (this.lat && this.lng && this.radius) {
            query.location = {
                $geoWithin: {
                    $centerSphere: [[this.lng, this.lat], (this.radius/this.MILES) / 3963.2]//Note that longitude comes first in a GeoJSON coordinate array, not latitude.
                    
                }
            };
        }
        return JSON.parse(JSON.stringify(query));
    }
}

export default RestaurantQueryDTO;