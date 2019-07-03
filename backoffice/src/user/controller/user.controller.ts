/**
 * User controller UiaFood
 * @author Carlos Brito {carlosmcp@gmail.com}
 */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, ValidationPipe, UseFilters, UseGuards } from '@nestjs/common';
import LOCALE from '../../../config/locales';
import { Paginator } from '../../../util/helper/paginator';
import { UserDto } from '../dto/user.dto';
import { UserParamDTO } from '../dto/user.param';
import UserQueryDTO from '../dto/user.query.dto';
import { UserService } from '../service/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { HttpToRpcExceptionFilter } from 'util/filter/rpc.filter.exception';

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) { }

    @MessagePattern({ cmd: 'create_user' })
    @UseFilters(HttpToRpcExceptionFilter)
    async create(@Body() userDto: UserDto): Promise<Object> {
        const findUser = await this.userService.retrieveByEmail(userDto.email);

        if (findUser == null) {
            return this.userService.create(userDto);
        } else {
            throw new HttpException(LOCALE.USER_ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'find_user' })
    async retrieve(@Param() param: UserParamDTO): Promise<UserDto> {
        const result = await this.userService.retrieve(param.id);

        if (result == null) {
            throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
        } else {
            return result;
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'list_user' })
    async retrieveAll(@Query() query: UserQueryDTO): Promise<Paginator<UserDto>> {
        const result = await this.userService.findAllAndPaginate(query);
        return new Paginator<UserDto>(result, query.page, query.limit);
    }

    
    @MessagePattern({ cmd: 'update_user' })
    @UseFilters(HttpToRpcExceptionFilter)
    async update(@Body() userDto: UserDto): Promise<Object> {
        const findUser: UserDto = await this.userService.retrieveByEmail(userDto.email);
        
        if (findUser == null || (findUser._id == userDto._id)) {
            const isSaved = await this.userService.update(userDto._id, userDto);
            if (isSaved) {
                return { success: true }
            } else {
                throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
        } else {
            throw new HttpException(LOCALE.CHANGE_USER_TO_USER_ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    @MessagePattern({ cmd: 'delete_user' })
    @UseFilters(HttpToRpcExceptionFilter)
    async delete(@Param() param:UserParamDTO): Promise<Object> {
        console.log("param:", param);
        const isDeleted = await this.userService.delete(param.id);
        if (isDeleted) {
            return { success: true };
        } else {
            throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }
}
