import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import  * as UserSchema  from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserSchema.name, schema: UserSchema.schema }])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})

export class UserModule { }
