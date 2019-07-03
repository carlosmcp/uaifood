import { Body, Controller, Headers, Inject, Post, UseFilters, HttpCode, Get, Query, Param, SetMetadata, Put, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BACKOFFICE_MICROSERVICE } from '../../../config/microservices/backoffice.microservice';
import { ExceptionFilterMicroservice } from 'util/filter/rpc.filter.exception'
import RoleEnum from 'util/security/role.enum';

@Controller('users')
export class BackOfficeStub {
  readonly patternLogin = { cmd: BACKOFFICE_MICROSERVICE.commands.login };
  readonly patternListUser = { cmd: BACKOFFICE_MICROSERVICE.commands.list };
  readonly patternCreateUser = { cmd: BACKOFFICE_MICROSERVICE.commands.create };
  readonly patternFindUser = { cmd: BACKOFFICE_MICROSERVICE.commands.find };
  readonly patternUpdateUser = { cmd: BACKOFFICE_MICROSERVICE.commands.update };
  readonly patternDeleteUser = { cmd: BACKOFFICE_MICROSERVICE.commands.delete };

  constructor(@Inject(BACKOFFICE_MICROSERVICE.name) private readonly client: ClientProxy) { }

  @HttpCode(200)
  @Post("login")
  @UseFilters(new ExceptionFilterMicroservice())
  execute(@Body() body): Observable<any> {
    return this.client.send<any>(this.patternLogin, body);
  }

  @Post()
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  createUser(@Body() body): Observable<any> {
    return this.client.send<any>(this.patternCreateUser, body);
  }

  @Get()
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  listUser(@Query() query, @Headers() header: any): Observable<any> {
    return this.client.send<any>(this.patternListUser, query);
  }

  @Get(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  find(@Param() param): Observable<any> {
    return this.client.send<any>(this.patternFindUser, param);
  }

  @Put(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  updateUser(@Body() body, @Param('id') id): Observable<any> {
    body._id = id;
    return this.client.send<any>(this.patternUpdateUser, body);
  }

  @Delete(":id")
  @SetMetadata('roles', [RoleEnum.ADMIN])
  @UseFilters(new ExceptionFilterMicroservice())
  deleteUser(@Param() id): Observable<any> {
    return this.client.send<any>(this.patternDeleteUser, id);
  }
  
}
