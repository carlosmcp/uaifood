/**
 * @author carlos brito {carlosmcp@gmail.com}
 * @since 2019-06-20
 */

import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsMongoId, ValidateNested, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import LOCALE from '../../config/locales';
import { isNumber } from 'util';

@Exclude()
export class MenuDto {

    @Expose()
    _id: string;

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    restaurantId: string;
    
    @Expose()
    @Transform(name => name.toUpperCase())
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    name: string;

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY, each: true})
    @ArrayMinSize(1, { message: LOCALE.MIN_ARRAY_SIZE })
    @IsArray({ message: LOCALE.MANDATORY_ARRAY })
    ingredients: string[];

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsNumber({}, { message: LOCALE.FLOAT_VALUE })
    price: number
    
    @Expose()
    @Exclude({ toPlainOnly: true })
    readonly createdAt: number;

    @Expose()
    @Exclude({ toPlainOnly: true })
    readonly updatedAt: number;
}

export default MenuDto;

