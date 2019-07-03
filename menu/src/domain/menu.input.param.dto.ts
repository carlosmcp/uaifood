import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import LOCALE from '../../config/locales';

export class MenuParamDTO {

    @IsOptional()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    _id: string
    
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    restaurantId: string

    
}

export default MenuParamDTO;