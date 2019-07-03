import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './controller/menu.controller';
import * as Schema from './schema/menu.schema';
import MONGODB_CONF from '../config/mongodb';
import { MenuService } from './service/menu.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schema.name, schema: Schema.schema }]),
    MongooseModule.forRoot(MONGODB_CONF.url, MONGODB_CONF.opts)
  ],
  providers: [MenuService],
  controllers: [MenuController]  
})

export class ApplicationModule { }
