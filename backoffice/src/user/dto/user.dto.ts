/**
 * @author carlos brito {carlosmcp@gmail.com}
 * @since 2019-06-20
 */

import { Exclude, Expose, Type, classToPlain } from 'class-transformer';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, MinLength, MaxLength, Length } from 'class-validator';
import LOCALE from '../../../config/locales';
import RoleEnum from '../../../util/security/role.enum';

export class UserDto {
    
     @Expose()
    _id: string;

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @MinLength(5, { message: LOCALE.MIN_FIELD_LENGTH })
    name: string;

    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsMongoId({ message: LOCALE.MONGODB_INVALID_ID })
    restaurantId: string

    @Expose()
    @IsEmail({}, { message: LOCALE.INVALID_EMAIL })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    email: string;

    @Expose({ toPlainOnly: true })
    @Length(6, 12, { message: LOCALE.MIN_MAX_FILED_LENGTH })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    password: string;
        
    @Expose()
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    @IsEnum(RoleEnum, {
        message: LOCALE.USER_ROLE, context: {
            [LOCALE.ROLE_TYPE]: Object.values(RoleEnum)
        }
    })
    role: RoleEnum

    @Expose()
    @Exclude({ toPlainOnly: true })
    readonly createdAt: number

    @Expose()
    @Exclude({ toPlainOnly: true })
    readonly updatedAt: number
}

export default UserDto;

