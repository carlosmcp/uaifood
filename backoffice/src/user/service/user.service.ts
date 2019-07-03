import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { classToClass, plainToClass, classToClassFromExist, plainToClassFromExist, classToPlain } from 'class-transformer';
import { Model } from 'mongoose';
import Security from 'src/../util/security/security';
import UserDto from '../dto/user.dto';
import UserQueryDTO from '../dto/user.query.dto';
import ResultPaginated from '../../../util/helper/result.paginated';
import { UserInterface } from '../schema/user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>) { }

    async create(user: UserDto): Promise<Object> {
        const newUser = new this.userModel(user);
        newUser.updatedAt = new Date().getTime()
        newUser.createdAt = new Date().getTime()
        const crypPassword = await Security.toHashPassword(user.password);
        newUser.password = crypPassword.toString();
        newUser.restaurantId = new ObjectID(user.restaurantId); 
        const result = await newUser.save();
        return { id: result._id };
    }

    async retrieveByEmail(email: string): Promise<UserDto | null> {
        const result = await this.userModel.findOne({ email: email });
        return (result !== null) ? plainToClassFromExist(new UserDto, JSON.parse(JSON.stringify(result)), { excludeExtraneousValues: true }) : undefined;
    }

    async retrieve(id: string): Promise<UserDto | null> {
        const result = await this.userModel.findOne({ "_id": new ObjectID(id) });
        return result ? plainToClassFromExist(new UserDto, JSON.parse(JSON.stringify(result)), { excludeExtraneousValues:true})  : null;
    }

    async findByEmailAndPassword(email: string, password: string): Promise<UserDto | null> {
        const crypPassword = await Security.toHashPassword(password);
        const result = await this.userModel.findOne({ "email": email, "password": crypPassword.toString() }).lean();
        return result ? plainToClassFromExist(new UserDto, JSON.parse(JSON.stringify(result)), { excludeExtraneousValues:true}) : null;
    }

    async findAllAndPaginate(userQueryDTO: UserQueryDTO): Promise<ResultPaginated<UserDto>> {
        const query = userQueryDTO.format();
        const dataResult = await this.userModel.find(query)
            .sort({ createdAt: 1 })
            .skip(query.page * query.limit)
            .limit(query.limit).lean();
          
        const dataResultTransform = dataResult
            .map(item => JSON.parse(JSON.stringify(item)))
            .map(item => plainToClassFromExist(new UserDto, item, {excludeExtraneousValues:true}));

        const countResult = await this.userModel.countDocuments(query);
        const paginateResult = new ResultPaginated<UserDto>(dataResultTransform, countResult);
       
        return paginateResult;
    }

    async update(id: string, user: UserDto): Promise<Boolean> {
        const updateUser = new this.userModel(user);
        updateUser.updatedAt = new Date().getTime();
        const crypPassword = await Security.toHashPassword(user.password);
        delete updateUser.createdAt;
        updateUser.password = crypPassword.toString();
        const result = await this.userModel.updateOne({ _id: new ObjectID(id) }, updateUser);
        return result.n > 0;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.userModel.deleteOne({ _id: new ObjectID(id) })
        return result.n > 0;
    }
}
