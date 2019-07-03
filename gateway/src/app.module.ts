import { Module } from '@nestjs/common';
import { BackOfficeModule } from './stub/backoffice/app.module';
import { RestaurantModule } from './stub/restaurant/app.module';
import { MenuModule } from './stub/menu/app.module';
import { SearchModule } from './stub/serch/app.module';

@Module({
  imports: [BackOfficeModule, RestaurantModule, MenuModule, SearchModule]
})

export class ApplicationModule { }
