/**
 * @author carlos brito {carlosmcp@gmail.com}
 */

import LOCALE from 'src/../config/locales';
import { IsEmail, IsNotEmpty, IsEmpty, Length, MinLength, MaxLength, IsOptional, Max, IsEnum, Min, ArrayMaxSize, ArrayMinSize, ValidateNested, IsMongoId } from 'class-validator';
import { Exclude, Transform, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import FoodEnum from '../enum/restaurant.food';
import { RestaurantLocation } from './restaurant.location.dto';

export class RestaurantDTO {

    @Expose()
    @ValidateNested({ each: true })
    @Type(() => RestaurantLocation)
    readonly location: RestaurantLocation;

    @IsOptional()
    @Expose({ name: "id", toClassOnly: true })
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    @Type(() => ObjectId)
    _id: string;

    @Expose()
    @Transform(name => name.toUpperCase())
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MinLength(5, { message: LOCALE.MIN_FIELD_LENGTH })
    name: string;

    @Expose()
    @Transform(name => name.toLowerCase())
    @IsEmail({}, { message: LOCALE.INVALID_EMAIL })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    email: string;

    @Expose()
    @Transform(address => address.toUpperCase())
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MaxLength(30, { message: LOCALE.MAX_FIELD_LENGTH })
    address: string;

    @Expose()
    @Transform(country => country.toUpperCase())
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MaxLength(10, { message: LOCALE.MAX_FIELD_LENGTH })
    country: string;

    @Expose()
    @Transform(state => state.toUpperCase())
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MaxLength(15, { message: LOCALE.MAX_FIELD_LENGTH })
    state: string

    @Expose()
    @Transform(city => city.toUpperCase())
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MaxLength(15, { message: LOCALE.MAX_FIELD_LENGTH })
    city: string

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @Max(99999, { message: LOCALE.MAX_FIELD_LENGTH })
    number: number;

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MaxLength(15, { message: LOCALE.MAX_FIELD_LENGTH })
    cellphone: string;

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @Length(8, 8, { message: LOCALE.MIN_MAX_FILED_LENGTH })
    postalCode: string

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsEnum(FoodEnum, {
        message: LOCALE.FOOD_TYPE, context: {
            [LOCALE.ALLOW_FOOD_TYPE]: Object.values(FoodEnum)
        }
    })
    food: FoodEnum

    @Expose()
    readonly createdAt: number

    @Expose()
    readonly updatedAt: number
}

export default RestaurantDTO;

