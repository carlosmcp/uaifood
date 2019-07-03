import { Body, Controller, HttpCode, HttpException, HttpStatus, UseFilters, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import UserDto from 'src/user/dto/user.dto';
import { UserService } from 'src/user/service/user.service';
import LOCALE from '../../../config/locales';
import SECURITY_CONFIG from '../../../config/security';
import { HttpToRpcExceptionFilter } from '../../../util/filter/rpc.filter.exception';
import { Security } from '../../../util/security/security';
import { LoginDTO } from '../dto/login.dto';


@Controller()
export class LoginController {
    constructor(private readonly userService: UserService) { }
    
    @HttpCode(200)
    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'login' })
    async login(@Body() loginDTO: LoginDTO) {
        const userFound: UserDto = await this.userService.findByEmailAndPassword(loginDTO.email, loginDTO.password);

        if (userFound == null) {
            throw new HttpException(LOCALE.INVALID_LOGIN_PASSWORD, HttpStatus.UNPROCESSABLE_ENTITY)
        } else {
            let token = Security.toJwtToken({
                restaurant: userFound.restaurantId,
                role: userFound.role
            },
                SECURITY_CONFIG.jwt.password,
                SECURITY_CONFIG.jwt.timeExpiration,
            );

            return {token: token};
        }
    } 
}
