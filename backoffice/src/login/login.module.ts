import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { LoginController } from './controller/login.controller';

@Module({
  imports: [UserModule],
  controllers: [LoginController]
})

export class LoginModule { }
