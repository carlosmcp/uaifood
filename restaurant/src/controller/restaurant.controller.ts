/**
 * Restaurant controller UiaFood
 * @author Carlos Brito {carlosmcp@gmail.com}
 */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseInterceptors, ClassSerializerInterceptor, UseFilters } from '@nestjs/common';
import LOCALE from '../../config/locales';
import { RestaurantDTO } from '../dto/restaurant.dto';
import RestaurantQueryDTO from '../dto/restaurant.input.query.dto';
import { RestaurantService } from '../service/restaurant.service';
import RestaurantParamDTO from '../dto/restaurant.input.param.dto';
import ResultPaginated from 'util/helper/result.paginated';
import Paginator from 'util/helper/paginator';
import { MessagePattern } from '@nestjs/microservices';
import { HttpToRpcExceptionFilter } from '../../util/filter/rpc.filter.exception';

@Controller()
export class RestaurantController {

    constructor(private readonly modelService: RestaurantService) { }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'create_restaurant' })
    async create(@Body() userDto: RestaurantDTO): Promise<Object> {
        const findUser = await this.modelService.retrieveByName(userDto.name);

        if (findUser == null) {
            return this.modelService.create(userDto);
        } else {
            throw new HttpException(LOCALE.COMPANY_ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'list_restaurant' })
    async retrieveAll(@Query() query: RestaurantQueryDTO): Promise<Paginator<any>> {
        const result = await this.modelService.findAndPaginate(query);   
        return new Paginator<RestaurantDTO>(result, query.page, query.limit);
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'find_restaurant' })
    async retrieve(@Param() param: RestaurantParamDTO): Promise<RestaurantDTO> {
        const result = await this.modelService.retrieve(param.id);

        if (result == null) {
            throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
        } else {
            return result;
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'update_restaurant' })
    async update(@Body() restaurantDTO: RestaurantDTO): Promise<Object> {
        const findModel: RestaurantDTO = await this.modelService.retrieveByName(restaurantDTO.name);

        if (findModel == null || (findModel._id == restaurantDTO._id)) {
            const isSaved = await this.modelService.update(restaurantDTO._id, restaurantDTO);
            if (isSaved) {
                return { success: true }
            } else {
                throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
        } else {
            throw new HttpException(LOCALE.COMPANY_ALREADY_EXIST, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'delete_restaurant' })
    async delete(@Param() param: RestaurantParamDTO): Promise<Object> {
        console.log("#param:", param);

        const isDeleted = await this.modelService.delete(param.id);
        if (isDeleted) {
            return { success: true };
        } else {
            throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }
}
