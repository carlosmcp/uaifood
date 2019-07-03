import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, SetMetadata, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MENU_MICROSERVICE } from '../../../config/microservices/menu.microservice';
import { ExceptionFilterMicroservice } from '../../../util/filter/rpc.filter.exception';
import RoleEnum from '../../../util/security/role.enum';

@Controller('restaurants/:restaurant_id/menus/')
export class MenuStub {
  readonly patternList = { cmd: MENU_MICROSERVICE.commands.list };
  readonly patternCreate = { cmd: MENU_MICROSERVICE.commands.create };
  readonly patternFind = { cmd: MENU_MICROSERVICE.commands.find };
  readonly patternUpdate = { cmd: MENU_MICROSERVICE.commands.update };
  readonly patternDelete = { cmd: MENU_MICROSERVICE.commands.delete };

  constructor(@Inject(MENU_MICROSERVICE.name) private readonly client: ClientProxy) { }

  @Post()
  @SetMetadata('roles', [RoleEnum.COMPANY])
  @UseFilters(new ExceptionFilterMicroservice())
  createUser(@Param('restaurant_id') param, @Body() body): Observable<any> {
    body.restaurantId = param;
    return this.client.send<any>(this.patternCreate, body);
  }

  @Get(":id")
  @UseFilters(new ExceptionFilterMicroservice())
  find(@Param('id') id, @Param('restaurant_id') restaurantId): Observable<any> {
    let payload = {_id: id, restaurantId: restaurantId};
    return this.client.send<any>(this.patternFind, payload);
  }

  @Get()
  @UseFilters(new ExceptionFilterMicroservice())
  listUser(@Query() query, @Param("restaurant_id") param): Observable<any> {
    query.restaurantId = param;
    return this.client.send<any>(this.patternList, query);
  }

  @Put(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN, RoleEnum.COMPANY])
  @UseFilters(new ExceptionFilterMicroservice())
  updateUser(@Body() body, @Param('id') id, @Param("restaurant_id") restaurantId): Observable<any> {
    body._id = id;
    body.restaurantId = restaurantId;
    return this.client.send<any>(this.patternUpdate, body);
  }

  @Delete(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  deleteUser(@Param('id') id, @Param('restaurant_id') restaurantId): Observable<any> {
    let payload = {_id: id, restaurantId: restaurantId};
    return this.client.send<any>(this.patternDelete, payload);
  }

}
