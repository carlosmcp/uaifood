import LOCALE from '../../../config/locales';
import { Expose, Type } from 'class-transformer';
import { ObjectID } from 'bson';
import { IsEmail, IsInt, IsMongoId, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class UserParamDTO {
    
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    id: string
}