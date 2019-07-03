import { Body, Controller, Headers, Inject, Post, UseFilters, HttpCode, Get, Query, Param, SetMetadata, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RESTAURANT_MICROSERVICE } from '../../../config/microservices/restaurant.microservice';
import { ExceptionFilterMicroservice } from '../../../util/filter/rpc.filter.exception'
import RoleEnum from '../../../util/security/role.enum';

@Controller('restaurants')
export class RestaurantStub {
  readonly patternList = { cmd: RESTAURANT_MICROSERVICE.commands.list };
  readonly patternCreate = { cmd: RESTAURANT_MICROSERVICE.commands.create };
  readonly patternFind = { cmd: RESTAURANT_MICROSERVICE.commands.find };
  readonly patternUpdate = { cmd: RESTAURANT_MICROSERVICE.commands.update };
  readonly patternDelete = { cmd: RESTAURANT_MICROSERVICE.commands.delete };

  constructor(
    @Inject(RESTAURANT_MICROSERVICE.name) private readonly client: ClientProxy) { }

  @Post()
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  createUser(@Body() body): Observable<any> {
    return this.client.send<any>(this.patternCreate, body);
  }

  @Get(":id")
  @UseFilters(new ExceptionFilterMicroservice())
  find(@Param() param): Observable<any> {
    return this.client.send<any>(this.patternFind, param);
  }

  @Put(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN, RoleEnum.COMPANY])
  @UseFilters(new ExceptionFilterMicroservice())
  updateUser(@Body() body, @Param('id') id): Observable<any> {
    body._id = id;
    return this.client.send<any>(this.patternUpdate, body);
  }

  @Delete(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  deleteUser(@Param() id): Observable<any> {
    return this.client.send<any>(this.patternDelete, id);
  }

}
