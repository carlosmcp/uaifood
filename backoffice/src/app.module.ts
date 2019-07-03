import MONGODB_CONF from '../config/mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule, LoginModule, MongooseModule.forRoot(MONGODB_CONF.url, MONGODB_CONF.opts)]
})

export class ApplicationModule { }
