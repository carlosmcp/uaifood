import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ApplicationModule } from './app.module';
import { ExceptionFilterMicroservice } from 'util/filter/rpc.filter.exception';
import SERVICE_CONFIG from 'config/service';
import { RolesGuard } from 'util/security/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const reflector = app.get( Reflector );

  app.useGlobalPipes(new ValidationPipe({ validationError: { target:false, value:false, },  transform: true }));
  app.useGlobalFilters(new ExceptionFilterMicroservice());
  app.useGlobalGuards(new RolesGuard(reflector));
  await app.listen(SERVICE_CONFIG.port);
}
bootstrap();
