import LOCALE from 'src/../config/locales';
import { Expose, Type } from 'class-transformer';
import { ObjectID } from 'bson';
import { IsEmail, IsInt, IsMongoId, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class UserQueryDTO {
    
    @Expose()
    @IsOptional()
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    restaurantId: string

    @Expose()
    @IsOptional()
    @IsEmail({}, { message: LOCALE.INVALID_EMAIL })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    email: string;
    
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
    
    format() {
        const query = {
            restaurantId: this.restaurantId ? new ObjectID(this.restaurantId) : this.restaurantId,
            email: this.email
        }
        return JSON.parse(JSON.stringify(query));
    }
}

export default UserQueryDTO;