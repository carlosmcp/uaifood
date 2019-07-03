import { Module } from '@nestjs/common';
import { RestaurantStub } from './restaurant.stub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RESTAURANT_MICROSERVICE } from '../../../config/microservices/restaurant.microservice';

@Module({
  imports: [ 
    ClientsModule.register([{
       name: RESTAURANT_MICROSERVICE.name,
       transport: Transport.TCP,
       options: {
         host: RESTAURANT_MICROSERVICE.host,
          port: RESTAURANT_MICROSERVICE.port 
        }}]),
  ],
  providers: [],
  controllers: [RestaurantStub]
})

export class RestaurantModule { }