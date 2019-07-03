import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { classToClass, plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import ResultPaginated from '../../util/helper/result.paginated';
import RestaurantDTO from '../dto/restaurant.dto';
import RestaurantQueryDTO from '../dto/restaurant.input.query.dto';
import { RestaurantInterface } from '../dto/restaurant.interface';
import * as Schema from '../schema/restaurant.schema';

@Injectable()
export class RestaurantService {

    constructor(@InjectModel(Schema.name) private readonly model: Model<RestaurantInterface>) { }
    
    async create(user: RestaurantDTO): Promise<Object> {
        const newUser = new this.model(user);
        newUser.location.coordinates = [user.location.lng, user.location.lat];//Note that longitude comes first in a GeoJSON coordinate array, not latitude.@see mongoose DOC
        newUser.location.type = 'Point';
        newUser.updatedAt = new Date().getTime()
        newUser.createdAt = new Date().getTime()
        const result = await newUser.save();
        return { id: result._id };
    }

    async retrieveByName(name: string): Promise<RestaurantDTO | null> {
        const result = await this.model.findOne({ "name": name });
        return (result !== null) ? plainToClass(RestaurantDTO, result, { excludeExtraneousValues: true }) : undefined;
    }

    async retrieve(id: string): Promise<RestaurantDTO | null> {
        const result:RestaurantInterface = await this.model.findOne({ "_id": new ObjectID(id) });
        
        if (result !== null) {
            const obj = plainToClass(RestaurantDTO, result, { excludeExtraneousValues: true })
            obj.location.lat = result.location.coordinates[1] as number;
            obj.location.lng = result.location.coordinates[0] as number;
            return classToClass(obj);
        } else {
            return  null;
        }        
    }

    async findAndPaginate(query: RestaurantQueryDTO): Promise<ResultPaginated<RestaurantDTO>> {
        const formatedQuery = query.format();
        const dataResult = await this.model.find(formatedQuery)
            .sort({ createdAt: 1 })
            .skip(query.page * query.limit)
            .limit(query.limit);

        const dataResultTransform = dataResult
            .map(item => {
                const obj = plainToClass(RestaurantDTO, item, { excludeExtraneousValues: true });
                obj.location.lat = item.location.coordinates[1] as number;
                obj.location.lng = item.location.coordinates[0] as number;
                return obj;
                
            })

            .map(item => classToClass(item));

        const countResult = await this.model.countDocuments(formatedQuery);
        const paginateResult = new ResultPaginated<RestaurantDTO>(dataResultTransform, countResult);

        return paginateResult;
    }

    async update(id: string, restaurantDTO: RestaurantDTO): Promise<Boolean> {
        const updateUser = new this.model(restaurantDTO);
        updateUser.location.coordinates = [restaurantDTO.location.lng, restaurantDTO.location.lat];//Note that longitude comes first in a GeoJSON coordinate array, not latitude.@see mongoose DOC
        updateUser.location.type = 'Point';
        const result = await this.model.updateOne({ _id: new ObjectID(id) }, updateUser);
        return result.n > 0;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.deleteOne({ _id: new ObjectID(id) })
        return result.n > 0;
    }
}