import { Module } from '@nestjs/common';
import { UserModule } from './modules/client/user/user.module';
import { AuthModule } from './modules/client/auth/auth.module';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
