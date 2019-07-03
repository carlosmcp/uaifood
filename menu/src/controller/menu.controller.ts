/**
 * Menu controller UiaFood
 * @author Carlos Brito {carlosmcp@gmail.com}
 * @since 2019-06-24
 */

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import LOCALE from '../../config/locales';
import { Paginator } from '../../util/helper/paginator';
import { MenuDto } from '../domain/menu.dto';
import MenuParamDTO from '../domain/menu.input.param.dto';
import MenuQueryDTO from '../domain/menu.input.query.dto';
import { MenuService } from '../service/menu.service';
import { HttpToRpcExceptionFilter } from 'util/filter/rpc.filter.exception';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MenuController {

    constructor(private readonly modelService: MenuService) { }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'create_menu' })
    async create(@Body() model: MenuDto): Promise<Object> {
        return this.modelService.create(model.restaurantId, model);
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'find_menu' })
    async retrieve(@Param() params: MenuParamDTO): Promise<any> {
        const result = await this.modelService.retrieve(params._id, params.restaurantId);
        
        if (result == null) {
            throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            return result;
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'list_menu' })
    async retrieveAll(@Query() query: MenuQueryDTO): Promise<Paginator<MenuDto>> {
        const result = await this.modelService.findAndPaginate(query.restaurantId, query);
        return new Paginator<MenuDto>(result, query.page, query.limit);
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'update_menu' })
    async update(@Body() model: MenuDto): Promise<Object> {
        const findModel: MenuDto = await this.modelService.retrieve(model._id, model.restaurantId);

        if (findModel == null || (findModel.restaurantId == model.restaurantId)) {
            const isSaved = await this.modelService.update(model._id, model);
            if (isSaved) {
                return { success: true }
            } else {
                throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
        } else {
            throw new HttpException(LOCALE.MENU_ID_COMPANY_NOT_BELONG, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'delete_menu' })    
    async delete(@Body() input: MenuParamDTO): Promise<Object> {
        const findModel: MenuDto = await this.modelService.retrieve(input._id, input.restaurantId);
        if (findModel == null || (findModel.restaurantId == input.restaurantId)) {
            const isDeleted = await this.modelService.delete(input._id);
            if (isDeleted) {
                return { success: true };
            } else {
                throw new HttpException(LOCALE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
      } else {
        throw new HttpException(LOCALE.MENU_ID_COMPANY_NOT_BELONG, HttpStatus.UNPROCESSABLE_ENTITY)
      }
    }
}
