import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, serialize, classToPlain, plainToClassFromExist, classToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import UserDto from '../dto/user.dto';


@Injectable()
export class FilterTransformUser implements NestInterceptor<UserDto>{

    intercept(context: ExecutionContext, next: CallHandler): Observable<UserDto> {
        return next.handle().pipe(map(data => {
            let user = data as UserDto;
            delete user.password;
            return user;
        }));
    }
}