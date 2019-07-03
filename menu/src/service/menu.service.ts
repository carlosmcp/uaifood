import LOCALE from '../../config/locales';
import MenuDto from '../domain/menu.dto';
import * as MenuSchema from '../schema/menu.schema';
import { Injectable, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { MenuInterface } from '../schema/menu.interface'
import { Model } from 'mongoose';
import { ObjectID, ObjectId } from 'bson';
import { plainToClass, classToClass, classToPlain, plainToClassFromExist } from 'class-transformer';
import ResultPaginated from '../../util/helper/result.paginated'
import MenuQueryDTO from '../domain/menu.input.query.dto';
import { MessagePattern } from '@nestjs/microservices';
import { HttpToRpcExceptionFilter } from 'util/filter/rpc.filter.exception';

@Injectable()
export class MenuService {

    constructor(@InjectModel(MenuSchema.name) private readonly modelSchema: Model<MenuInterface>) { }

    async create(restaurantId: string, model: MenuDto): Promise<Object> {
        const newModel = new this.modelSchema(model);
        newModel.restaurantId = new ObjectID(restaurantId);
        newModel.updatedAt = new Date().getTime()
        newModel.createdAt = new Date().getTime()
        const result = await newModel.save();
        return { id: result._id };
    }

    async retrieve(id: string, restaurantId: string): Promise<any | null> {
        const result: MenuInterface = await this.modelSchema.findOne({ "_id": new ObjectID(id), "restaurantId":  new ObjectID(restaurantId) }).lean();
        return plainToClassFromExist(new MenuDto, JSON.parse(JSON.stringify(result)), {excludeExtraneousValues:true});        
    }

    @UseFilters(HttpToRpcExceptionFilter)
    @MessagePattern({ cmd: 'list_menu' })
    async findAndPaginate(restaurantId: string, menuQueryDTO:MenuQueryDTO): Promise<ResultPaginated<MenuDto>> {
        const query = menuQueryDTO.format();
        Object.assign(query, { "restaurantId": new ObjectID(restaurantId)});
       
        const dataResult = await this.modelSchema.find(query)
            .sort({ createdAt: 1 })
            .skip(menuQueryDTO.page * menuQueryDTO.limit)
            .limit(menuQueryDTO.limit);

        const dataResultTransform = dataResult
        .map(item => JSON.parse(JSON.stringify(item)))
        .map(item => plainToClassFromExist(new MenuDto, item, {excludeExtraneousValues:true}));

        const countResult = await this.modelSchema.countDocuments(query);
        const paginateResult = new ResultPaginated<MenuDto>(dataResultTransform, countResult);

        return paginateResult;
    }

    async update(id: string, model: MenuDto): Promise<Boolean> {
        const newModel = this.modelSchema.hydrate(classToPlain(model));
        newModel.updatedAt = new Date().getTime();
        delete newModel.createdAt;
        const result = await this.modelSchema.updateOne({ _id: new ObjectID(id) }, newModel);
        return result.n > 0;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.modelSchema.deleteOne({ _id: new ObjectID(id) })
        return result.n > 0;
    }
}
