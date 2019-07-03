import LOCALE from '../../../config/locales';
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDTO {

    @Expose()
    @IsEmail({}, { message: LOCALE.INVALID_EMAIL })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    email: string;

    @Expose({ toPlainOnly: true })
    @Length(6, 12, { message: LOCALE.MIN_MAX_FILED_LENGTH })
    @IsNotEmpty({ message: LOCALE.FIELD_MANDATORY })
    password: string;

    format(){
        return {
            email: this.email,
            password: this.password
        }
    }

}