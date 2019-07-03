import { Module } from '@nestjs/common';
import MONGODB_CONF from '../config/mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './controller/restaurant.controller';
import * as Schema from './schema/restaurant.schema';
import { RestaurantService } from './service/restaurant.service';

@Module({
  
  imports: [
    MongooseModule.forFeature([{ name: Schema.name, schema: Schema.schema }]),
    MongooseModule.forRoot(MONGODB_CONF.url, MONGODB_CONF.opts)
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController]  
})

export class ApplicationModule { }
