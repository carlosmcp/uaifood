import LOCALE from '../../config/locales';
import { IsEmail, IsNotEmpty, IsEmpty, Length, MinLength, MaxLength, IsOptional, Max, IsEnum, IsInt, Min, IsMongoId } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { format } from 'util';

export class MenuQueryDTO {
    @Expose()
    _id: string;
    
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    restaurantId: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(10)
    readonly page: number = 0

    @IsOptional()
    @MaxLength(100, {message: LOCALE.MIN_MAX_FILED_LENGTH})
    name: string;

    @IsOptional()
    @Type(() => Number)
    @Min(0, {message: LOCALE.MIN_NUMBER})
    @Max(99999999.00, {message: LOCALE.MAX_NUMBER})
    price: Number;

    @IsOptional()
    @Type(() => Number)
    @Min(0, {message: LOCALE.MIN_NUMBER})
    @Max(99999999.00, {message: LOCALE.MAX_NUMBER})
    maxPrice: Number;

    @IsOptional()
    @Type(() => Number)
    @Min(0, {message: LOCALE.MIN_NUMBER})
    @Max(99999999.00, {message: LOCALE.MAX_NUMBER})
    minPrice: Number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(10)
    readonly limit: number = 10

    format() {
         var query = {
            name: this.name,
            price: {
                $gte:this.price,
                $lte:this.price
            }
         }
         
         if (this.minPrice) {
             query.price.$gte = this.minPrice;
         }

         if (this.maxPrice) {
           query.price.$lte = this.maxPrice;
         }
         if (this.price === undefined) {
            delete query.price;
        }
         
         return JSON.parse(JSON.stringify(query));         
    }
}

export default MenuQueryDTO;