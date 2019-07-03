import { Module } from '@nestjs/common';
import { MenuModule } from '../menu/app.module';
import { SearchStub } from './search.stub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MENU_MICROSERVICE as MENU_MICROSERVICE } from '../../../config/microservices/menu.microservice';
import { RESTAURANT_MICROSERVICE } from 'config/microservices/restaurant.microservice';

@Module({
  imports: [ 
    ClientsModule.register([{
       name: RESTAURANT_MICROSERVICE.name,
       transport: Transport.TCP,
       options: {
         host: RESTAURANT_MICROSERVICE.host,
          port: RESTAURANT_MICROSERVICE.port 
        }}]),
        ClientsModule.register([{
          name: MENU_MICROSERVICE.name,
          transport: Transport.TCP,
          options: {
            host: MENU_MICROSERVICE.host,
             port: MENU_MICROSERVICE.port 
           }}])  
      ],
  providers: [],
  controllers: [SearchStub]  
})

export class SearchModule { }