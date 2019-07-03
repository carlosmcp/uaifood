import LOCALE from 'src/../config/locales';
import { Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';


export class RestaurantParamDTO {

    @Expose({ name: "id" })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    id: string
}

export default RestaurantParamDTO;