import { Module } from '@nestjs/common';
import { MenuStub } from './menu.stub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MENU_MICROSERVICE as MENU_MICROSERVICE } from '../../../config/microservices/menu.microservice';

@Module({
  imports: [ 
    ClientsModule.register([{
       name: MENU_MICROSERVICE.name,
       transport: Transport.TCP,
       options: {
         host: MENU_MICROSERVICE.host,
          port: MENU_MICROSERVICE.port 
        }}]),
  ],
  providers: [],
  controllers: [MenuStub]
})

export class MenuModule { }