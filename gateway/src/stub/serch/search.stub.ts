import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, SetMetadata, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MENU_MICROSERVICE } from '../../../config/microservices/menu.microservice';
import { ExceptionFilterMicroservice } from '../../../util/filter/rpc.filter.exception';
import RoleEnum from '../../../util/security/role.enum';
import { RESTAURANT_MICROSERVICE } from 'config/microservices/restaurant.microservice';

@Controller('restaurants')
export class SearchStub {
  readonly restaurantList = { cmd: RESTAURANT_MICROSERVICE.commands.find };
  readonly menuList = { cmd: RESTAURANT_MICROSERVICE.commands.find };
  
  constructor(
    @Inject(RESTAURANT_MICROSERVICE.name) private readonly clientRestaurant: ClientProxy,
    @Inject(MENU_MICROSERVICE.name) private readonly clientMenu: ClientProxy
    ) {  }

    @Get()
    @UseFilters(new ExceptionFilterMicroservice())
    listUser(@Query() query): Observable<any> {
      if (!query.plate) {
        return this.clientRestaurant.send<any>(this.restaurantList, query);
      } else {
        return this.clientMenu.send<any>(this.menuList, query);
      }      
    } 
}
