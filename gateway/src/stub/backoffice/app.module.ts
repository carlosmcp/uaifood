import { Module } from '@nestjs/common';
import { BackOfficeStub } from './backoffice.stub';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BACKOFFICE_MICROSERVICE } from '../../../config/microservices/backoffice.microservice';

@Module({
  imports: [ 
    ClientsModule.register([{
      name: BACKOFFICE_MICROSERVICE.name, 
      transport: Transport.TCP,
      options: {
         host: BACKOFFICE_MICROSERVICE.host,
          port: BACKOFFICE_MICROSERVICE.port 
        } }]),
  ],
  providers: [],
  controllers: [BackOfficeStub]
})

export class BackOfficeModule { }